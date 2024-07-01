import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  TrainingProgram,
  Users,
} from '../models';
import {TrainingProgramRepository} from '../repositories';

export class TrainingProgramUsersController {
  constructor(
    @repository(TrainingProgramRepository)
    public trainingProgramRepository: TrainingProgramRepository,
  ) { }

  @get('/training-programs/{id}/users', {
    responses: {
      '200': {
        description: 'Users belonging to TrainingProgram',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Users),
          },
        },
      },
    },
  })
  async getUsers(
    @param.path.number('id') id: typeof TrainingProgram.prototype.id,
  ): Promise<Users> {
    return this.trainingProgramRepository.users(id);
  }
}
