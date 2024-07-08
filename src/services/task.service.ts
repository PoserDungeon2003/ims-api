import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {CreateTasksRQ} from '../common/models/request';
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

  async createTasks(task: CreateTasksRQ) {
    let trainingProgram = await this.trainingProgramRepository.findOne({
      where: {
        id: task.trainingProgramId
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
        id: task.usersId
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
        usersId: mentor?.id
      })
      if (response) {
        return response
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
