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
  JobPosition,
  Application,
} from '../models';
import {JobPositionRepository} from '../repositories';

export class JobPositionApplicationController {
  constructor(
    @repository(JobPositionRepository) protected jobPositionRepository: JobPositionRepository,
  ) { }

  @get('/job-positions/{id}/applications', {
    responses: {
      '200': {
        description: 'Array of JobPosition has many Application',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Application)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Application>,
  ): Promise<Application[]> {
    return this.jobPositionRepository.applications(id).find(filter);
  }

  @post('/job-positions/{id}/applications', {
    responses: {
      '200': {
        description: 'JobPosition model instance',
        content: {'application/json': {schema: getModelSchemaRef(Application)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof JobPosition.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Application, {
            title: 'NewApplicationInJobPosition',
            exclude: ['id'],
            optional: ['jobPositionId']
          }),
        },
      },
    }) application: Omit<Application, 'id'>,
  ): Promise<Application> {
    return this.jobPositionRepository.applications(id).create(application);
  }

  @patch('/job-positions/{id}/applications', {
    responses: {
      '200': {
        description: 'JobPosition.Application PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Application, {partial: true}),
        },
      },
    })
    application: Partial<Application>,
    @param.query.object('where', getWhereSchemaFor(Application)) where?: Where<Application>,
  ): Promise<Count> {
    return this.jobPositionRepository.applications(id).patch(application, where);
  }

  @del('/job-positions/{id}/applications', {
    responses: {
      '200': {
        description: 'JobPosition.Application DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Application)) where?: Where<Application>,
  ): Promise<Count> {
    return this.jobPositionRepository.applications(id).delete(where);
  }
}
