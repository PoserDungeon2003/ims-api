import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {Count, Filter, FilterExcludingWhere, repository, Where} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {Role} from '../common';
import {CreateTasksRQ} from '../common/models/request';
import {Tasks} from '../models';
import {InternTaskRepository, TasksRepository, TrainingProgramRepository, UsersRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class TaskService {
  constructor(
    @repository(TasksRepository)
    private tasksRepository: TasksRepository,
    @repository(UsersRepository)
    private usersRepository: UsersRepository,
    @repository(TrainingProgramRepository)
    private trainingProgramRepository: TrainingProgramRepository,
    @repository(InternTaskRepository)
    private internTaskRepository: InternTaskRepository
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

  async getCompletionRated(): Promise<number> {
    try {
      let completedTasks = await this.internTaskRepository.find({
        where: {
          isCompleted: true
        }
      })
      let allAssignedTasks = await this.internTaskRepository.find()

      if (allAssignedTasks.length === 0) {
        return 0
      }
      return completedTasks.length / allAssignedTasks.length

    } catch (error) {
      throw new HttpErrors[500]("Internal server error")
    }


  }

  async count(where?: Where<Tasks>): Promise<Count> {
    return this.tasksRepository.count(where);
  }

  async findTask(filter?: Filter<Tasks>): Promise<Tasks[]> {
    return this.tasksRepository.find(filter);
  }

  async updateAll(tasks: Tasks, where?: Where<Tasks>): Promise<Count> {
    return this.tasksRepository.updateAll(tasks, where);
  }

  async findTaskById(id: number, filter?: FilterExcludingWhere<Tasks>): Promise<Tasks> {
    return this.tasksRepository.findById(id, filter);
  }

  async updateTaskById(id: number, tasks: Tasks): Promise<void> {
    await this.tasksRepository.updateById(id, tasks);
  }

  async replaceById(id: number, tasks: Tasks): Promise<void> {
    await this.tasksRepository.replaceById(id, tasks);
  }

  async deleteTaskById(id: number): Promise<void> {
    await this.tasksRepository.deleteById(id);
  }
}
