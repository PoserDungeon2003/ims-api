import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {Count, Filter, FilterExcludingWhere, repository, Where} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
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
        throw new HttpErrors[404]("Intern or task not found");
      }
      if (existedTask) {
        throw new HttpErrors[400]("Task already assigned to intern");
      }
      return await this.internTaskRepository.create({
        internId: request.internId,
        tasksId: request.tasksId,
        isCompleted: request.isCompleted
      });
    } catch (error) {
      console.log(error);
      throw new HttpErrors[500]("Internal server error");
    }
  }

  async count(where?: Where<InternTask>): Promise<Count> {
    return this.internTaskRepository.count(where);
  }

  async find(filter?: Filter<InternTask>): Promise<InternTask[]> {
    return this.internTaskRepository.find(filter);
  }

  async updateAll(internTask: InternTask, where?: Where<InternTask>): Promise<Count> {
    return this.internTaskRepository.updateAll(internTask, where);
  }

  async findById(id: number, filter?: FilterExcludingWhere<InternTask>): Promise<InternTask> {
    return this.internTaskRepository.findById(id, filter);
  }

  async updateById(id: number, internTask: InternTask): Promise<void> {
    await this.internTaskRepository.updateById(id, internTask);
  }

  async replaceById(id: number, internTask: InternTask): Promise<void> {
    await this.internTaskRepository.replaceById(id, internTask);
  }

  async deleteById(id: number): Promise<void> {
    await this.internTaskRepository.deleteById(id);
  }
}
