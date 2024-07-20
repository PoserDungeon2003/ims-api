import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {JobPosition} from '../models';
import {JobPositionRepository} from '../repositories';

export class JobPositionController {
  constructor(
    @repository(JobPositionRepository)
    public jobPositionRepository : JobPositionRepository,
  ) {}

  @post('/job-positions')
  @response(200, {
    description: 'JobPosition model instance',
    content: {'application/json': {schema: getModelSchemaRef(JobPosition)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(JobPosition, {
            title: 'NewJobPosition',
            exclude: ['id'],
          }),
        },
      },
    })
    jobPosition: Omit<JobPosition, 'id'>,
  ): Promise<JobPosition> {
    return this.jobPositionRepository.create(jobPosition);
  }

  @get('/job-positions/count')
  @response(200, {
    description: 'JobPosition model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(JobPosition) where?: Where<JobPosition>,
  ): Promise<Count> {
    return this.jobPositionRepository.count(where);
  }

  @get('/job-positions')
  @response(200, {
    description: 'Array of JobPosition model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(JobPosition, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(JobPosition) filter?: Filter<JobPosition>,
  ): Promise<JobPosition[]> {
    return this.jobPositionRepository.find(filter);
  }

  @patch('/job-positions')
  @response(200, {
    description: 'JobPosition PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(JobPosition, {partial: true}),
        },
      },
    })
    jobPosition: JobPosition,
    @param.where(JobPosition) where?: Where<JobPosition>,
  ): Promise<Count> {
    return this.jobPositionRepository.updateAll(jobPosition, where);
  }

  @get('/job-positions/{id}')
  @response(200, {
    description: 'JobPosition model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(JobPosition, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(JobPosition, {exclude: 'where'}) filter?: FilterExcludingWhere<JobPosition>
  ): Promise<JobPosition> {
    return this.jobPositionRepository.findById(id, filter);
  }

  @patch('/job-positions/{id}')
  @response(204, {
    description: 'JobPosition PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(JobPosition, {partial: true}),
        },
      },
    })
    jobPosition: JobPosition,
  ): Promise<void> {
    await this.jobPositionRepository.updateById(id, jobPosition);
  }

  @put('/job-positions/{id}')
  @response(204, {
    description: 'JobPosition PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() jobPosition: JobPosition,
  ): Promise<void> {
    await this.jobPositionRepository.replaceById(id, jobPosition);
  }

  @del('/job-positions/{id}')
  @response(204, {
    description: 'JobPosition DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.jobPositionRepository.deleteById(id);
  }
}
