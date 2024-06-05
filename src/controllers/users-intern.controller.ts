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
  Intern,
} from '../models';
import {UsersRepository} from '../repositories';

export class UsersInternController {
  constructor(
    @repository(UsersRepository) protected usersRepository: UsersRepository,
  ) { }

  @get('/users/{id}/interns', {
    responses: {
      '200': {
        description: 'Array of Users has many Intern',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Intern)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Intern>,
  ): Promise<Intern[]> {
    return this.usersRepository.interns(id).find(filter);
  }

  @post('/users/{id}/interns', {
    responses: {
      '200': {
        description: 'Users model instance',
        content: {'application/json': {schema: getModelSchemaRef(Intern)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Users.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Intern, {
            title: 'NewInternInUsers',
            exclude: ['id'],
            optional: ['mentorId']
          }),
        },
      },
    }) intern: Omit<Intern, 'id'>,
  ): Promise<Intern> {
    return this.usersRepository.interns(id).create(intern);
  }

  @patch('/users/{id}/interns', {
    responses: {
      '200': {
        description: 'Users.Intern PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Intern, {partial: true}),
        },
      },
    })
    intern: Partial<Intern>,
    @param.query.object('where', getWhereSchemaFor(Intern)) where?: Where<Intern>,
  ): Promise<Count> {
    return this.usersRepository.interns(id).patch(intern, where);
  }

  @del('/users/{id}/interns', {
    responses: {
      '200': {
        description: 'Users.Intern DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Intern)) where?: Where<Intern>,
  ): Promise<Count> {
    return this.usersRepository.interns(id).delete(where);
  }
}
