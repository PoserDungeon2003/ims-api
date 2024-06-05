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
Intern,
InternTask,
Tasks,
} from '../models';
import {InternRepository} from '../repositories';

export class InternTasksController {
  constructor(
    @repository(InternRepository) protected internRepository: InternRepository,
  ) { }

  @get('/interns/{id}/tasks', {
    responses: {
      '200': {
        description: 'Array of Intern has many Tasks through InternTask',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Tasks)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Tasks>,
  ): Promise<Tasks[]> {
    return this.internRepository.tasks(id).find(filter);
  }

  @post('/interns/{id}/tasks', {
    responses: {
      '200': {
        description: 'create a Tasks model instance',
        content: {'application/json': {schema: getModelSchemaRef(Tasks)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Intern.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tasks, {
            title: 'NewTasksInIntern',
            exclude: ['id'],
          }),
        },
      },
    }) tasks: Omit<Tasks, 'id'>,
  ): Promise<Tasks> {
    return this.internRepository.tasks(id).create(tasks);
  }

  @patch('/interns/{id}/tasks', {
    responses: {
      '200': {
        description: 'Intern.Tasks PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tasks, {partial: true}),
        },
      },
    })
    tasks: Partial<Tasks>,
    @param.query.object('where', getWhereSchemaFor(Tasks)) where?: Where<Tasks>,
  ): Promise<Count> {
    return this.internRepository.tasks(id).patch(tasks, where);
  }

  @del('/interns/{id}/tasks', {
    responses: {
      '200': {
        description: 'Intern.Tasks DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Tasks)) where?: Where<Tasks>,
  ): Promise<Count> {
    return this.internRepository.tasks(id).delete(where);
  }
}
