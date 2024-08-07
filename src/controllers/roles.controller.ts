import {authenticate} from '@loopback/authentication';
import {service} from '@loopback/core';
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
import {Roles} from '../models';
import {RoleService} from '../services';

export class RolesController {
  constructor(
    @service(RoleService)
    private roleService: RoleService,
  ) { }

  @post('/roles')
  @authenticate('jwt')
  @response(200, {
    description: 'Roles model instance',
    content: {'application/json': {schema: getModelSchemaRef(Roles)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Roles, {
            title: 'NewRoles',
            exclude: ['id'],
          }),
        },
      },
    })
    roles: Omit<Roles, 'id'>,
  ): Promise<Roles> {
    return this.roleService.create(roles);
  }

  @get('/roles/count')
  @authenticate('jwt')
  @response(200, {
    description: 'Roles model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Roles) where?: Where<Roles>,
  ): Promise<Count> {
    return this.roleService.count(where);
  }

  @get('/roles')
  @authenticate('jwt')
  @response(200, {
    description: 'Array of Roles model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Roles, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Roles) filter?: Filter<Roles>,
  ): Promise<Roles[]> {
    return this.roleService.find(filter);
  }

  @patch('/roles')
  @authenticate('jwt')
  @response(200, {
    description: 'Roles PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Roles, {partial: true}),
        },
      },
    })
    roles: Roles,
    @param.where(Roles) where?: Where<Roles>,
  ): Promise<Count> {
    return this.roleService.updateAll(roles, where);
  }

  @get('/roles/{id}')
  @authenticate('jwt')
  @response(200, {
    description: 'Roles model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Roles, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Roles, {exclude: 'where'}) filter?: FilterExcludingWhere<Roles>
  ): Promise<Roles> {
    return this.roleService.findById(id, filter);
  }

  @patch('/roles/{id}')
  @authenticate('jwt')
  @response(204, {
    description: 'Roles PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Roles, {partial: true}),
        },
      },
    })
    roles: Roles,
  ): Promise<void> {
    await this.roleService.updateById(id, roles);
  }

  @put('/roles/{id}')
  @authenticate('jwt')
  @response(204, {
    description: 'Roles PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() roles: Roles,
  ): Promise<void> {
    await this.roleService.replaceById(id, roles);
  }

  @del('/roles/{id}')
  @authenticate('jwt')
  @response(204, {
    description: 'Roles DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.roleService.deleteById(id);
  }
}
