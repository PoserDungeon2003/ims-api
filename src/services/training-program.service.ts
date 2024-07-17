import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {Count, Filter, FilterExcludingWhere, repository, Where} from '@loopback/repository';
import {Role} from '../common';
import {CreateTrainingProgramRQ} from '../common/models/request';
import {TrainingProgram} from '../models';
import {TrainingProgramRepository, UsersRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class TrainingProgramService {
  constructor(
    @repository(TrainingProgramRepository)
    private trainingProgramRepository: TrainingProgramRepository,
    @repository(UsersRepository)
    private usersRepository: UsersRepository
  ) { }

  async createTrainingProgram(trainingProgramRQ: CreateTrainingProgramRQ) {
    let user = await this.usersRepository.findOne({
      where: {
        id: trainingProgramRQ.usersId
      }
    })

    if (!user) {
      return {
        success: 0,
        message: "User not found"
      }
    }

    if (user.rolesId !== Role.Coordinator) {
      return {
        success: 0,
        message: "User is not coordinator"
      }
    }
    try {
      let trainingProgram = await this.trainingProgramRepository.create({
        ...trainingProgramRQ,
        createdBy: user.fullName,
        usersId: user.id
      })
      if (trainingProgram) {
        return trainingProgram
      }
      else {
        return {success: 0, message: "Create training program failed"}
      }
    } catch (error) {
      return {success: 0, message: error}
    }
  }

  async count(where?: Where<TrainingProgram>
  ): Promise<Count> {
    return this.trainingProgramRepository.count(where);
  }

  async findByFilter(filter?: Filter<TrainingProgram>,
  ): Promise<TrainingProgram[]> {
    return this.trainingProgramRepository.find(filter);
  }

  async updateAll(trainingProgram: TrainingProgram, where?: Where<TrainingProgram>): Promise<Count> {
    return this.trainingProgramRepository.updateAll(trainingProgram, where);
  }

  async findById(id: number, filter?: FilterExcludingWhere<TrainingProgram>): Promise<TrainingProgram> {
    return this.trainingProgramRepository.findById(id, filter);
  }

  async updateById(id: number, trainingProgram: TrainingProgram): Promise<void> {
    let user = await this.usersRepository.findById(trainingProgram.usersId)
    await this.trainingProgramRepository.updateById(id, {
      ...trainingProgram,
      createdBy: user.fullName
    });
  }

  async replaceById(id: number, trainingProgram: TrainingProgram): Promise<void> {
    await this.trainingProgramRepository.replaceById(id, trainingProgram);
  }

  async deleteById(id: number): Promise<void> {
    await this.trainingProgramRepository.deleteById(id);
  }
}
