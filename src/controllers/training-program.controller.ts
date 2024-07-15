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
import {CreateTrainingProgramRQ} from '../common/models/request';
import {TrainingProgram} from '../models';
import {TrainingProgramService} from '../services';

export class TrainingProgramController {
  constructor(
    @service(TrainingProgramService)
    private trainingProgramService: TrainingProgramService
  ) { }

  @post('/training-programs')
  @authenticate('jwt')
  @response(200, {
    description: 'TrainingProgram model instance',
    content: {'application/json': {schema: getModelSchemaRef(CreateTrainingProgramRQ)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CreateTrainingProgramRQ, {
            title: 'NewTrainingProgram',
          }),
        },
      },
    })
    trainingProgram: CreateTrainingProgramRQ,
  ) {
    return this.trainingProgramService.createTrainingProgram(trainingProgram);
  }

  @get('/training-programs/count')
  @authenticate('jwt')
  @response(200, {
    description: 'TrainingProgram model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TrainingProgram) where?: Where<TrainingProgram>,
  ): Promise<Count> {
    return this.trainingProgramService.count(where);
  }

  @get('/training-programs')
  @authenticate('jwt')
  @response(200, {
    description: 'Array of TrainingProgram model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TrainingProgram, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(TrainingProgram) filter?: Filter<TrainingProgram>,
  ): Promise<TrainingProgram[]> {
    return this.trainingProgramService.findByFilter(filter);
  }

  @patch('/training-programs')
  @authenticate('jwt')
  @response(200, {
    description: 'TrainingProgram PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TrainingProgram, {partial: true}),
        },
      },
    })
    trainingProgram: TrainingProgram,
    @param.where(TrainingProgram) where?: Where<TrainingProgram>,
  ): Promise<Count> {
    return this.trainingProgramService.updateAll(trainingProgram, where);
  }

  @get('/training-programs/{id}')
  @authenticate('jwt')
  @response(200, {
    description: 'TrainingProgram model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TrainingProgram, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TrainingProgram, {exclude: 'where'}) filter?: FilterExcludingWhere<TrainingProgram>
  ): Promise<TrainingProgram> {
    return this.trainingProgramService.findById(id, filter);
  }

  @patch('/training-programs/{id}')
  @authenticate('jwt')
  @response(204, {
    description: 'TrainingProgram PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TrainingProgram, {partial: true}),
        },
      },
    })
    trainingProgram: TrainingProgram,
  ): Promise<void> {
    await this.trainingProgramService.updateById(id, trainingProgram);
  }

  @put('/training-programs/{id}')
  @authenticate('jwt')
  @response(204, {
    description: 'TrainingProgram PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() trainingProgram: TrainingProgram,
  ): Promise<void> {
    await this.trainingProgramService.replaceById(id, trainingProgram);
  }

  @del('/training-programs/{id}')
  @authenticate('jwt')
  @response(204, {
    description: 'TrainingProgram DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.trainingProgramService.deleteById(id);
  }
}
