import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {Count, Filter, FilterExcludingWhere, repository, Where} from '@loopback/repository';
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

  async count(where?: Where<WorkResult>): Promise<Count> {
    return this.workResultRepository.count(where);
  }

  async find(filter?: Filter<WorkResult>): Promise<WorkResult[]> {
    return this.workResultRepository.find(filter);
  }

  async updateAll(workResult: WorkResult, where?: Where<WorkResult>): Promise<Count> {
    return this.workResultRepository.updateAll(workResult, where);
  }

  async findById(id: number, filter?: FilterExcludingWhere<WorkResult>): Promise<WorkResult> {
    return this.workResultRepository.findById(id, filter);
  }

  async replaceById(id: number, workResult: WorkResult): Promise<void> {
    await this.workResultRepository.replaceById(id, workResult);
  }

  async updateById(id: number, workResult: WorkResult): Promise<void> {
    await this.workResultRepository.updateById(id, workResult);
  }

  async deleteById(id: number): Promise<void> {
    await this.workResultRepository.deleteById(id);
  }
}
