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
  Interview,
} from '../models';
import {UsersRepository} from '../repositories';

export class UsersInterviewController {
  constructor(
    @repository(UsersRepository) protected usersRepository: UsersRepository,
  ) { }

  @get('/users/{id}/interviews', {
    responses: {
      '200': {
        description: 'Array of Users has many Interview',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Interview)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Interview>,
  ): Promise<Interview[]> {
    return this.usersRepository.interviews(id).find(filter);
  }

  @post('/users/{id}/interviews', {
    responses: {
      '200': {
        description: 'Users model instance',
        content: {'application/json': {schema: getModelSchemaRef(Interview)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Users.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Interview, {
            title: 'NewInterviewInUsers',
            exclude: ['id'],
            optional: ['HrId']
          }),
        },
      },
    }) interview: Omit<Interview, 'id'>,
  ): Promise<Interview> {
    return this.usersRepository.interviews(id).create(interview);
  }

  @patch('/users/{id}/interviews', {
    responses: {
      '200': {
        description: 'Users.Interview PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Interview, {partial: true}),
        },
      },
    })
    interview: Partial<Interview>,
    @param.query.object('where', getWhereSchemaFor(Interview)) where?: Where<Interview>,
  ): Promise<Count> {
    return this.usersRepository.interviews(id).patch(interview, where);
  }

  @del('/users/{id}/interviews', {
    responses: {
      '200': {
        description: 'Users.Interview DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Interview)) where?: Where<Interview>,
  ): Promise<Count> {
    return this.usersRepository.interviews(id).delete(where);
  }
}
