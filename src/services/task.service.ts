import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {CreateTasksRQ} from '../common/models/request';
import {BaseReponse} from '../common/models/response';
import {Role} from '../common/type';
import {TasksRepository, TrainingProgramRepository, UsersRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class TaskService {
  constructor(
    @repository(TasksRepository)
    private tasksRepository: TasksRepository,
    @repository(UsersRepository)
    private usersRepository: UsersRepository,
    @repository(TrainingProgramRepository)
    private trainingProgramRepository: TrainingProgramRepository,
  ) { }

  async createTasks(task: CreateTasksRQ): Promise<BaseReponse> {
    let trainingProgram = await this.trainingProgramRepository.findOne({
      where: {
        code: task.trainingProgramCode
      }
    })

    if (!trainingProgram) {
      return {
        success: 0,
        message: "Training program not found"
      }
    }

    let mentor = await this.usersRepository.findOne({
      where: {
        fullName: task.mentorName
      }
    })

    if (mentor?.rolesId !== Role.Mentor) {
      return {
        success: 0,
        message: "User is not mentor"
      }
    }

    try {
      let response = await this.tasksRepository.create({
        name: task.name,
        description: task.description,
        trainingProgramId: trainingProgram.id,
        mentorId: mentor?.id
      })
      if (response) {
        return {
          success: 1,
          message: "Create task successful"
        }
      }
      return {
        success: 0,
        message: "Create task failed"
      }
    } catch (error) {
      return {success: 0, message: error}
    }
  }
}
