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
import {TrainingProgram} from '../models';
import {TrainingProgramRepository} from '../repositories';

export class TrainingProgramController {
  constructor(
    @repository(TrainingProgramRepository)
    public trainingProgramRepository : TrainingProgramRepository,
  ) {}

  @post('/training-programs')
  @response(200, {
    description: 'TrainingProgram model instance',
    content: {'application/json': {schema: getModelSchemaRef(TrainingProgram)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TrainingProgram, {
            title: 'NewTrainingProgram',
            exclude: ['id'],
          }),
        },
      },
    })
    trainingProgram: Omit<TrainingProgram, 'id'>,
  ): Promise<TrainingProgram> {
    return this.trainingProgramRepository.create(trainingProgram);
  }

  @get('/training-programs/count')
  @response(200, {
    description: 'TrainingProgram model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(TrainingProgram) where?: Where<TrainingProgram>,
  ): Promise<Count> {
    return this.trainingProgramRepository.count(where);
  }

  @get('/training-programs')
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
    return this.trainingProgramRepository.find(filter);
  }

  @patch('/training-programs')
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
    return this.trainingProgramRepository.updateAll(trainingProgram, where);
  }

  @get('/training-programs/{id}')
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
    return this.trainingProgramRepository.findById(id, filter);
  }

  @patch('/training-programs/{id}')
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
    await this.trainingProgramRepository.updateById(id, trainingProgram);
  }

  @put('/training-programs/{id}')
  @response(204, {
    description: 'TrainingProgram PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() trainingProgram: TrainingProgram,
  ): Promise<void> {
    await this.trainingProgramRepository.replaceById(id, trainingProgram);
  }

  @del('/training-programs/{id}')
  @response(204, {
    description: 'TrainingProgram DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.trainingProgramRepository.deleteById(id);
  }
}
