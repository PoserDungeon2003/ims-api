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
  JobPosition,
} from '../models';
import {UsersRepository} from '../repositories';

export class UsersJobPositionController {
  constructor(
    @repository(UsersRepository) protected usersRepository: UsersRepository,
  ) { }

  @get('/users/{id}/job-positions', {
    responses: {
      '200': {
        description: 'Array of Users has many JobPosition',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(JobPosition)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<JobPosition>,
  ): Promise<JobPosition[]> {
    return this.usersRepository.jobPositions(id).find(filter);
  }

  @post('/users/{id}/job-positions', {
    responses: {
      '200': {
        description: 'Users model instance',
        content: {'application/json': {schema: getModelSchemaRef(JobPosition)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Users.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(JobPosition, {
            title: 'NewJobPositionInUsers',
            exclude: ['id'],
            optional: ['hrId']
          }),
        },
      },
    }) jobPosition: Omit<JobPosition, 'id'>,
  ): Promise<JobPosition> {
    return this.usersRepository.jobPositions(id).create(jobPosition);
  }

  @patch('/users/{id}/job-positions', {
    responses: {
      '200': {
        description: 'Users.JobPosition PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(JobPosition, {partial: true}),
        },
      },
    })
    jobPosition: Partial<JobPosition>,
    @param.query.object('where', getWhereSchemaFor(JobPosition)) where?: Where<JobPosition>,
  ): Promise<Count> {
    return this.usersRepository.jobPositions(id).patch(jobPosition, where);
  }

  @del('/users/{id}/job-positions', {
    responses: {
      '200': {
        description: 'Users.JobPosition DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(JobPosition)) where?: Where<JobPosition>,
  ): Promise<Count> {
    return this.usersRepository.jobPositions(id).delete(where);
  }
}
