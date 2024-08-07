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
import {Feedback} from '../models';
import {FeedbackService} from '../services';

export class FeedbackController {
  constructor(
    @service(FeedbackService)
    private feedbackService: FeedbackService,
  ) { }

  @post('/feedbacks')
  @authenticate('jwt')
  @response(200, {
    description: 'Feedback model instance',
    content: {'application/json': {schema: getModelSchemaRef(Feedback)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Feedback, {
            title: 'NewFeedback',
            exclude: ['id'],
          }),
        },
      },
    })
    feedback: Omit<Feedback, 'id'>,
  ): Promise<Feedback> {
    return this.feedbackService.create(feedback);
  }

  @get('/feedbacks/count')
  @authenticate('jwt')
  @response(200, {
    description: 'Feedback model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Feedback) where?: Where<Feedback>,
  ): Promise<Count> {
    return this.feedbackService.count(where);
  }

  @get('/feedbacks')
  @authenticate('jwt')
  @response(200, {
    description: 'Array of Feedback model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Feedback, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Feedback) filter?: Filter<Feedback>,
  ): Promise<Feedback[]> {
    return this.feedbackService.find(filter);
  }

  @patch('/feedbacks')
  @authenticate('jwt')
  @response(200, {
    description: 'Feedback PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Feedback, {partial: true}),
        },
      },
    })
    feedback: Feedback,
    @param.where(Feedback) where?: Where<Feedback>,
  ): Promise<Count> {
    return this.feedbackService.updateAll(feedback, where);
  }

  @get('/feedbacks/{id}')
  @authenticate('jwt')
  @response(200, {
    description: 'Feedback model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Feedback, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Feedback, {exclude: 'where'}) filter?: FilterExcludingWhere<Feedback>
  ): Promise<Feedback> {
    return this.feedbackService.findById(id, filter);
  }

  @patch('/feedbacks/{id}')
  @authenticate('jwt')
  @response(204, {
    description: 'Feedback PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Feedback, {partial: true}),
        },
      },
    })
    feedback: Feedback,
  ): Promise<void> {
    await this.feedbackService.updateById(id, feedback);
  }

  @put('/feedbacks/{id}')
  @authenticate('jwt')
  @response(204, {
    description: 'Feedback PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() feedback: Feedback,
  ): Promise<void> {
    await this.feedbackService.replaceById(id, feedback);
  }

  @del('/feedbacks/{id}')
  @authenticate('jwt')
  @response(204, {
    description: 'Feedback DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.feedbackService.deleteById(id);
  }
}
