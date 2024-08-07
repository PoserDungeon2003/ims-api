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
import {CreateTasksRQ} from '../common/models/request';
import {InternTask, Tasks} from '../models';
import {InternTaskService, TaskService} from '../services';

export class TaskController {
  constructor(
    @service(TaskService)
    private taskService: TaskService,
    @service(InternTaskService)
    private internTaskService: InternTaskService,
  ) { }

  @post('/tasks')
  @authenticate('jwt')
  @response(200, {
    description: 'Tasks model instance',
    content: {'application/json': {schema: getModelSchemaRef(Tasks)}},
  })
  async createTask(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CreateTasksRQ, {
            title: 'NewTasks',
          }),
        },
      },
    })
    tasks: Omit<CreateTasksRQ, 'y'>,
  ) {
    return this.taskService.createTasks(tasks);
  }

  @post('/tasks/assign')
  @authenticate('jwt')
  @response(200, {
    description: 'Assign task to intern',
    content: {'application/json': {schema: getModelSchemaRef(InternTask)}},
  })
  async assignTask(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InternTask, {
            title: 'AssignTask',
          }),
        },
      },
    })
    tasks: InternTask,
  ) {
    return await this.internTaskService.assignTask(tasks);
  }

  @get('/tasks/count')
  @authenticate('jwt')
  @response(200, {
    description: 'Tasks model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Tasks) where?: Where<Tasks>,
  ): Promise<Count> {
    return this.taskService.count(where);
  }

  @get('/tasks')
  @authenticate('jwt')
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
    return this.taskService.findTask(filter);
  }

  @patch('/tasks')
  @authenticate('jwt')
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
    return this.taskService.updateAll(tasks, where);
  }

  @get('/tasks/{id}')
  @authenticate('jwt')
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
    return this.taskService.findTaskById(id, filter);
  }

  @patch('/tasks/{id}')
  @authenticate('jwt')
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
    await this.taskService.updateTaskById(id, tasks);
  }

  @put('/tasks/{id}')
  @authenticate('jwt')
  @response(204, {
    description: 'Tasks PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tasks: Tasks,
  ): Promise<void> {
    await this.taskService.replaceById(id, tasks);
  }

  @del('/tasks/{id}')
  @authenticate('jwt')
  @response(204, {
    description: 'Tasks DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.taskService.deleteTaskById(id);
  }
}
