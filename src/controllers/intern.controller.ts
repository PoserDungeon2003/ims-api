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
import {CreateInternRQ} from '../common/models/request';
import {Intern} from '../models';
import {InternService} from '../services';

export class InternController {
  constructor(
    @service(InternService)
    private internService: InternService,
  ) { }

  @post('/intern')
  @authenticate('jwt')
  @response(200, {
    description: 'Intern model instance',
    content: {'application/json': {schema: getModelSchemaRef(CreateInternRQ)}},
  })
  async createIntern(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CreateInternRQ, {
            title: 'NewIntern',
          }),
        },
      },
    })
    intern: Omit<CreateInternRQ, 'id'>,
  ) {
    return this.internService.createIntern(intern);
  }

  @get('/intern/count')
  @authenticate('jwt')
  @response(200, {
    description: 'Intern model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Intern) where?: Where<Intern>,
  ): Promise<Count> {
    return this.internService.count(where);
  }

  @get('/intern')
  @authenticate('jwt')
  @response(200, {
    description: 'Array of Intern model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Intern, {includeRelations: true}),
        },
      },
    },
  })
  async getInternByFilter(
    @param.filter(Intern) filter?: Filter<Intern>,
  ): Promise<Intern[]> {
    return this.internService.getInternByFilter(filter);
  }

  @patch('/intern')
  @authenticate('jwt')
  @response(200, {
    description: 'Intern PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Intern, {partial: true}),
        },
      },
    })
    intern: Intern,
    @param.where(Intern) where?: Where<Intern>,
  ): Promise<Count> {
    return this.internService.updateAll(intern, where);
  }

  @get('/intern/{id}')
  @authenticate('jwt')
  @response(200, {
    description: 'Intern model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Intern, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Intern, {exclude: 'where'}) filter?: FilterExcludingWhere<Intern>
  ): Promise<Intern> {
    return this.internService.findById(id, filter);
  }

  @patch('/intern/{id}')
  @authenticate('jwt')
  @response(204, {
    description: 'Intern PATCH success',
  })
  async updateInternById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Intern, {partial: true}),
        },
      },
    })
    intern: Intern,
  ): Promise<void> {
    await this.internService.updateInternById(id, intern);
  }

  @put('/intern/{id}')
  @authenticate('jwt')
  @response(204, {
    description: 'Intern PUT success',
  })
  async removeIntern(
    @param.path.number('id') id: number,
    @requestBody() intern: Intern,
  ): Promise<void> {
    await this.internService.replaceById(id, intern);
  }

  @del('/intern/{id}')
  @authenticate('jwt')
  @response(204, {
    description: 'Intern DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.internService.removeIntern(id);
  }
}
