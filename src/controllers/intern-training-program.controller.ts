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
WorkResult,
TrainingProgram,
} from '../models';
import {InternRepository} from '../repositories';

export class InternTrainingProgramController {
  constructor(
    @repository(InternRepository) protected internRepository: InternRepository,
  ) { }

  @get('/interns/{id}/training-programs', {
    responses: {
      '200': {
        description: 'Array of Intern has many TrainingProgram through WorkResult',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TrainingProgram)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<TrainingProgram>,
  ): Promise<TrainingProgram[]> {
    return this.internRepository.trainingPrograms(id).find(filter);
  }

  @post('/interns/{id}/training-programs', {
    responses: {
      '200': {
        description: 'create a TrainingProgram model instance',
        content: {'application/json': {schema: getModelSchemaRef(TrainingProgram)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Intern.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TrainingProgram, {
            title: 'NewTrainingProgramInIntern',
            exclude: ['id'],
          }),
        },
      },
    }) trainingProgram: Omit<TrainingProgram, 'id'>,
  ): Promise<TrainingProgram> {
    return this.internRepository.trainingPrograms(id).create(trainingProgram);
  }

  @patch('/interns/{id}/training-programs', {
    responses: {
      '200': {
        description: 'Intern.TrainingProgram PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TrainingProgram, {partial: true}),
        },
      },
    })
    trainingProgram: Partial<TrainingProgram>,
    @param.query.object('where', getWhereSchemaFor(TrainingProgram)) where?: Where<TrainingProgram>,
  ): Promise<Count> {
    return this.internRepository.trainingPrograms(id).patch(trainingProgram, where);
  }

  @del('/interns/{id}/training-programs', {
    responses: {
      '200': {
        description: 'Intern.TrainingProgram DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(TrainingProgram)) where?: Where<TrainingProgram>,
  ): Promise<Count> {
    return this.internRepository.trainingPrograms(id).delete(where);
  }
}
