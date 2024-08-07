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
import {InternTask} from '../models';
import {InternTaskService, TaskService} from '../services';

export class TaskManagementController {
  constructor(
    @service(InternTaskService)
    private internTaskService: InternTaskService,
    @service(TaskService)
    private taskService: TaskService,
  ) { }

  @post('/tasks-management')
  @authenticate('jwt')
  @response(200, {
    description: 'InternTask model instance',
    content: {'application/json': {schema: getModelSchemaRef(InternTask)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InternTask, {
            title: 'NewInternTask',
            exclude: ['id'],
          }),
        },
      },
    })
    tasks: InternTask,
  ) {
    return await this.internTaskService.assignTask(tasks);
  }

  @get('/tasks-management/count')
  @authenticate('jwt')
  @response(200, {
    description: 'InternTask model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(InternTask) where?: Where<InternTask>,
  ): Promise<Count> {
    return this.internTaskService.count(where);
  }

  @get('/tasks-management')
  @authenticate('jwt')
  @response(200, {
    description: 'Array of InternTask model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(InternTask, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(InternTask) filter?: Filter<InternTask>,
  ): Promise<InternTask[]> {
    return this.internTaskService.find(filter);
  }

  @patch('/tasks-management')
  @authenticate('jwt')
  @response(200, {
    description: 'InternTask PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InternTask, {partial: true}),
        },
      },
    })
    internTask: InternTask,
    @param.where(InternTask) where?: Where<InternTask>,
  ): Promise<Count> {
    return this.internTaskService.updateAll(internTask, where);
  }

  @get('/tasks-management/{id}')
  @authenticate('jwt')
  @response(200, {
    description: 'InternTask model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(InternTask, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(InternTask, {exclude: 'where'}) filter?: FilterExcludingWhere<InternTask>
  ): Promise<InternTask> {
    return this.internTaskService.findById(id, filter);
  }

  @patch('/tasks-management/{id}')
  @authenticate('jwt')
  @response(204, {
    description: 'InternTask PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InternTask, {partial: true}),
        },
      },
    })
    internTask: InternTask,
  ): Promise<void> {
    await this.internTaskService.updateById(id, internTask);
  }

  @put('/tasks-management/{id}')
  @authenticate('jwt')
  @response(204, {
    description: 'InternTask PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() internTask: InternTask,
  ): Promise<void> {
    await this.internTaskService.replaceById(id, internTask);
  }

  @del('/tasks-management/{id}')
  @authenticate('jwt')
  @response(204, {
    description: 'InternTask DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.internTaskService.deleteById(id);
  }

  @get('/tasks-management/completion-rate')
  @authenticate('jwt')
  @response(200, {
    description: 'Completion rate of tasks',
    content: {'application/json': {schema: {type: 'number'}}},
  })
  async getCompletionRate(): Promise<number> {
    return this.taskService.getCompletionRated();
  }
}
