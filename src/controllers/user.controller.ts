import {authenticate} from '@loopback/authentication';
import {Credentials, TokenServiceBindings, UserServiceBindings} from '@loopback/authentication-jwt';
import {inject} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
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
import {CredentialsRequestBody} from '../common/models/request';
import {BaseReponse, LoginRS} from '../common/models/response';
import {Users} from '../models';
import {UsersRepository} from '../repositories';
import {JwtService, UserService} from '../services';

export class UserController {
  constructor(
    @repository(UsersRepository)
    public usersRepository: UsersRepository,
    @inject(UserServiceBindings.USER_SERVICE)
    private userService: UserService,
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    private jwtService: JwtService
  ) { }

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
  ): Promise<BaseReponse> {
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
    return this.usersRepository.count(where);
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
    return this.usersRepository.find(filter);
  }

  @get('/users/info')
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
  async getUserInfo(
  ): Promise<Users[]> {
    return this.usersRepository.find({
      fields: {
        password: false,
        username: false,
        email: false,
      }
    });
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
    return this.usersRepository.updateAll(users, where);
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
    @param.path.number('id') id: string,
    @param.filter(Users, {exclude: 'where'}) filter?: FilterExcludingWhere<Users>
  ): Promise<Users> {
    return this.usersRepository.findById(id, filter);
  }

  @patch('/users/{id}')
  @authenticate('jwt')
  @response(204, {
    description: 'Users PATCH success',
  })
  async updateById(
    @param.path.number('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Users, {partial: true}),
        },
      },
    })
    users: Users,
  ): Promise<void> {
    await this.usersRepository.updateById(id, users);
  }

  @put('/users/{id}')
  @authenticate('jwt')
  @response(204, {
    description: 'Users PUT success',
  })
  async replaceById(
    @param.path.number('id') id: string,
    @requestBody() users: Users,
  ): Promise<void> {
    await this.usersRepository.replaceById(id, users);
  }

  @del('/users/{id}')
  @authenticate('jwt')
  @response(204, {
    description: 'Users DELETE success',
  })
  async deleteById(@param.path.number('id') id: string): Promise<void> {
    await this.usersRepository.deleteById(id);
  }
}
