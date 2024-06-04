import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
  import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
Users,
UserRoles,
Roles,
} from '../models';
import {UsersRepository} from '../repositories';

export class UsersRolesController {
  constructor(
    @repository(UsersRepository) protected usersRepository: UsersRepository,
  ) { }

  @get('/users/{id}/roles', {
    responses: {
      '200': {
        description: 'Array of Users has many Roles through UserRoles',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Roles)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Roles>,
  ): Promise<Roles[]> {
    return this.usersRepository.roles(id).find(filter);
  }

  @post('/users/{id}/roles', {
    responses: {
      '200': {
        description: 'create a Roles model instance',
        content: {'application/json': {schema: getModelSchemaRef(Roles)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Users.prototype.usersId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Roles, {
            title: 'NewRolesInUsers',
            exclude: ['rolesId'],
          }),
        },
      },
    }) roles: Omit<Roles, 'rolesId'>,
  ): Promise<Roles> {
    return this.usersRepository.roles(id).create(roles);
  }

  @patch('/users/{id}/roles', {
    responses: {
      '200': {
        description: 'Users.Roles PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Roles, {partial: true}),
        },
      },
    })
    roles: Partial<Roles>,
    @param.query.object('where', getWhereSchemaFor(Roles)) where?: Where<Roles>,
  ): Promise<Count> {
    return this.usersRepository.roles(id).patch(roles, where);
  }

  @del('/users/{id}/roles', {
    responses: {
      '200': {
        description: 'Users.Roles DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Roles)) where?: Where<Roles>,
  ): Promise<Count> {
    return this.usersRepository.roles(id).delete(where);
  }
}
