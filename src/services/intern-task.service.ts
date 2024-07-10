import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {InternTask} from '../models';
import {InternRepository, InternTaskRepository, TasksRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class InternTaskService {
  constructor(
    @repository(InternRepository)
    private internRepository: InternRepository,
    @repository(TasksRepository)
    private tasksRepository: TasksRepository,
    @repository(InternTaskRepository)
    private internTaskRepository: InternTaskRepository
  ) { }

  async assignTask(request: InternTask) {
    try {
      let intern = await this.internRepository.findById(request.internId);
      let task = await this.tasksRepository.findById(request.tasksId);
      let existedTask = await this.internTaskRepository.findOne({
        where: {
          internId: request.internId,
          tasksId: request.tasksId
        }
      })
      if (!intern || !task) {
        return {
          success: 0,
          message: "Intern or task not found"
        };
      }
      if (existedTask) {
        return {
          success: 0,
          message: "Task already assigned to intern"
        }
      }
      return await this.internTaskRepository.create({
        internId: request.internId,
        tasksId: request.tasksId,
        isCompleted: request.isCompleted
      });
    } catch (error) {
      console.log(error);
      return {
        success: 0,
        message: "Assign task failed"
      }
    }
  }
}
