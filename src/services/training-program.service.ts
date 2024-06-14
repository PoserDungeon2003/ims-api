import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {TrainingProgram} from '../models';
import {TrainingProgramRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class TrainingProgramService {
  constructor(
    @repository(TrainingProgramRepository)
    private trainingProgramRepository: TrainingProgramRepository,
  ) { }

  async createTrainingProgram(trainingProgram: Omit<TrainingProgram, 'id'>) {
    return await this.trainingProgramRepository.create(trainingProgram)
  }
}
