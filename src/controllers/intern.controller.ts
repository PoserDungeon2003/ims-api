import {service} from '@loopback/core';
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
import {CreateInternRQ} from '../common/models/request';
import {Intern} from '../models';
import {InternRepository} from '../repositories';
import {InternService} from '../services';

export class InternController {
  constructor(
    @repository(InternRepository)
    public internRepository: InternRepository,
    @service(InternService)
    private internService: InternService,
  ) { }

  @post('/intern')
  @response(200, {
    description: 'Intern model instance',
    content: {'application/json': {schema: getModelSchemaRef(CreateInternRQ)}},
  })
  async create(
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
  @response(200, {
    description: 'Intern model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Intern) where?: Where<Intern>,
  ): Promise<Count> {
    return this.internRepository.count(where);
  }

  @get('/intern')
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
  async find(
    @param.filter(Intern) filter?: Filter<Intern>,
  ): Promise<Intern[]> {
    return this.internRepository.find(filter);
  }

  @patch('/intern')
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
    return this.internRepository.updateAll(intern, where);
  }

  @get('/intern/{id}')
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
    return this.internRepository.findById(id, filter);
  }

  @patch('/intern/{id}')
  @response(204, {
    description: 'Intern PATCH success',
  })
  async updateById(
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
    await this.internRepository.updateById(id, intern);
  }

  @put('/intern/{id}')
  @response(204, {
    description: 'Intern PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() intern: Intern,
  ): Promise<void> {
    await this.internRepository.replaceById(id, intern);
  }

  @del('/intern/{id}')
  @response(204, {
    description: 'Intern DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.internRepository.deleteById(id);
  }
}
