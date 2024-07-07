import {authenticate} from '@loopback/authentication';
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
import {WorkResult} from '../models';
import {WorkResultRepository} from '../repositories';

export class WorkResultController {
  constructor(
    @repository(WorkResultRepository)
    public workResultRepository: WorkResultRepository,
  ) { }

  @post('/work-results')
  @authenticate('jwt')
  @response(200, {
    description: 'WorkResult model instance',
    content: {'application/json': {schema: getModelSchemaRef(WorkResult)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(WorkResult, {
            title: 'NewWorkResult',
            exclude: ['id'],
          }),
        },
      },
    })
    workResult: Omit<WorkResult, 'id'>,
  ): Promise<WorkResult> {
    return this.workResultRepository.create(workResult);
  }

  @get('/work-results/count')
  @authenticate('jwt')
  @response(200, {
    description: 'WorkResult model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(WorkResult) where?: Where<WorkResult>,
  ): Promise<Count> {
    return this.workResultRepository.count(where);
  }

  @get('/work-results')
  @authenticate('jwt')
  @response(200, {
    description: 'Array of WorkResult model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(WorkResult, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(WorkResult) filter?: Filter<WorkResult>,
  ): Promise<WorkResult[]> {
    return this.workResultRepository.find(filter);
  }

  @patch('/work-results')
  @authenticate('jwt')
  @response(200, {
    description: 'WorkResult PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(WorkResult, {partial: true}),
        },
      },
    })
    workResult: WorkResult,
    @param.where(WorkResult) where?: Where<WorkResult>,
  ): Promise<Count> {
    return this.workResultRepository.updateAll(workResult, where);
  }

  @get('/work-results/{id}')
  @authenticate('jwt')
  @response(200, {
    description: 'WorkResult model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(WorkResult, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(WorkResult, {exclude: 'where'}) filter?: FilterExcludingWhere<WorkResult>
  ): Promise<WorkResult> {
    return this.workResultRepository.findById(id, filter);
  }

  @patch('/work-results/{id}')
  @authenticate('jwt')
  @response(204, {
    description: 'WorkResult PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(WorkResult, {partial: true}),
        },
      },
    })
    workResult: WorkResult,
  ): Promise<void> {
    await this.workResultRepository.updateById(id, workResult);
  }

  @put('/work-results/{id}')
  @authenticate('jwt')
  @response(204, {
    description: 'WorkResult PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() workResult: WorkResult,
  ): Promise<void> {
    await this.workResultRepository.replaceById(id, workResult);
  }

  @del('/work-results/{id}')
  @authenticate('jwt')
  @response(204, {
    description: 'WorkResult DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.workResultRepository.deleteById(id);
  }
}
