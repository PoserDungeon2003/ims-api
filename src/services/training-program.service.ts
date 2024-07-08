import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {CreateTrainingProgramRQ} from '../common/models/request';
import {Role} from '../common/type';
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
}
