import {authenticate} from '@loopback/authentication';
import {Credentials, TokenServiceBindings, User, UserServiceBindings} from '@loopback/authentication-jwt';
import {inject} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {SecurityBindings, UserProfile} from '@loopback/security';
import {CredentialsRequestBody} from '../common/models/request';
import {LoginRS} from '../common/models/response';
import {Users} from '../models';
import {JwtService, UserService} from '../services';

export class UserController {
  constructor(
    @inject(UserServiceBindings.USER_SERVICE)
    private userService: UserService,
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    private jwtService: JwtService,
    @inject(SecurityBindings.USER, {optional: true})
    private user: UserProfile,
  ) { }

  @get('me')
  @authenticate('jwt')
  @response(200, {
    description: 'User model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(User),
      },
    },
  })
  async me(
  ): Promise<UserProfile> {
    return this.user!;
  }

  @post('/users')
  @authenticate('jwt')
  @response(200, {
    description: 'Users model instance',
    content: {'application/json': {schema: getModelSchemaRef(Users)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Users, {
            title: 'NewUsers',
            exclude: ['id'],
          }),
        },
      },
    }) users: Users,
  ) {
    try {
      return await this.userService.createUser(users);
    } catch (error) {
      throw error;
    }
  }

  @post('/users/login')
  @response(200, {
    responses: {
      '200': {
        description: 'Login request',
        content: {
          'application/json': {
            schema: getModelSchemaRef(LoginRS),
          },
        },
      },
    },
  })
  async login(
    @requestBody(CredentialsRequestBody) credentials: Credentials,
  ): Promise<LoginRS> {
    const user = await this.userService.verifyCredentials(credentials);

    const userProfile = this.userService.convertToUserProfile(user);
    console.log('===userProfile', JSON.stringify(userProfile))

    const token = await this.jwtService.generateToken(userProfile as any);
    return {
      token,
      id: String(user.id),
      name: user.fullName,
      email: user.email,
      roles: userProfile.roles,
    }
  }

  @get('/users/count')
  @authenticate('jwt')
  @response(200, {
    description: 'Users model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Users) where?: Where<Users>,
  ): Promise<Count> {
    return this.userService.count(where);
  }

  @get('/users')
  @authenticate('jwt')
  @response(200, {
    description: 'Array of Users model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Users, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Users) filter?: Filter<Users>,
  ): Promise<Users[]> {
    return this.userService.findUser(filter);
  }

  @patch('/users')
  @authenticate('jwt')
  @response(200, {
    description: 'Users PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Users, {partial: true}),
        },
      },
    })
    users: Users,
    @param.where(Users) where?: Where<Users>,
  ): Promise<Count> {
    return this.userService.updateAll(users, where);
  }

  @get('/users/{id}')
  @authenticate('jwt')
  @response(200, {
    description: 'Users model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Users, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Users, {exclude: 'where'}) filter?: FilterExcludingWhere<Users>
  ): Promise<Users> {
    return this.userService.findUserById(id, filter);
  }

  @patch('/users/{id}')
  @authenticate('jwt')
  @response(204, {
    description: 'Users PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Users, {partial: true}),
        },
      },
    })
    users: Users,
  ): Promise<void> {
    await this.userService.updateUserById(id, users);
  }

  @put('/users/{id}')
  @authenticate('jwt')
  @response(204, {
    description: 'Users PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() users: Users,
  ): Promise<void> {
    await this.userService.replaceById(id, users);
  }

  @del('/users/{id}')
  @authenticate('jwt')
  @response(204, {
    description: 'Users DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.userService.deleteUserById(id);
  }
}
