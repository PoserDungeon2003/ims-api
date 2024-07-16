import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {WorkResult} from '../models';
import {InternRepository, TrainingProgramRepository, WorkResultRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class WorkResultService {
  constructor(
    @repository(WorkResultRepository)
    private workResultRepository: WorkResultRepository,
    @repository(InternRepository)
    private internRepository: InternRepository,
    @repository(TrainingProgramRepository)
    private trainingProgramRepository: TrainingProgramRepository,
  ) { }

  async addNewWorkResult(workResult: Omit<WorkResult, 'id'>) {
    let intern = await this.internRepository.findById(workResult.internId);
    if (!intern) {
      return {
        success: 0,
        message: "Intern not found"
      }
    }
    let trainingProgram = await this.trainingProgramRepository.findById(workResult.trainingProgramId);
    if (!trainingProgram) {
      return {
        success: 0,
        message: "Training program not found"
      }
    }
    return this.workResultRepository.create(workResult);
  }
}
