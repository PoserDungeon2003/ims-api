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
import {Tasks} from '../models';
import {TasksRepository} from '../repositories';

export class TaskController {
  constructor(
    @repository(TasksRepository)
    public tasksRepository : TasksRepository,
  ) {}

  @post('/tasks')
  @response(200, {
    description: 'Tasks model instance',
    content: {'application/json': {schema: getModelSchemaRef(Tasks)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tasks, {
            title: 'NewTasks',
            exclude: ['y'],
          }),
        },
      },
    })
    tasks: Omit<Tasks, 'y'>,
  ): Promise<Tasks> {
    return this.tasksRepository.create(tasks);
  }

  @get('/tasks/count')
  @response(200, {
    description: 'Tasks model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Tasks) where?: Where<Tasks>,
  ): Promise<Count> {
    return this.tasksRepository.count(where);
  }

  @get('/tasks')
  @response(200, {
    description: 'Array of Tasks model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Tasks, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Tasks) filter?: Filter<Tasks>,
  ): Promise<Tasks[]> {
    return this.tasksRepository.find(filter);
  }

  @patch('/tasks')
  @response(200, {
    description: 'Tasks PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tasks, {partial: true}),
        },
      },
    })
    tasks: Tasks,
    @param.where(Tasks) where?: Where<Tasks>,
  ): Promise<Count> {
    return this.tasksRepository.updateAll(tasks, where);
  }

  @get('/tasks/{id}')
  @response(200, {
    description: 'Tasks model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Tasks, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Tasks, {exclude: 'where'}) filter?: FilterExcludingWhere<Tasks>
  ): Promise<Tasks> {
    return this.tasksRepository.findById(id, filter);
  }

  @patch('/tasks/{id}')
  @response(204, {
    description: 'Tasks PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tasks, {partial: true}),
        },
      },
    })
    tasks: Tasks,
  ): Promise<void> {
    await this.tasksRepository.updateById(id, tasks);
  }

  @put('/tasks/{id}')
  @response(204, {
    description: 'Tasks PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tasks: Tasks,
  ): Promise<void> {
    await this.tasksRepository.replaceById(id, tasks);
  }

  @del('/tasks/{id}')
  @response(204, {
    description: 'Tasks DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tasksRepository.deleteById(id);
  }
}
