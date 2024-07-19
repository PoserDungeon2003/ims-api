import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {Count, Filter, FilterExcludingWhere, repository, Where} from '@loopback/repository';
import {Feedback} from '../models';
import {FeedbackRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class FeedbackService {
  constructor(
    @repository(FeedbackRepository)
    public feedbackRepository: FeedbackRepository,
  ) { }

  async create(feedback: Omit<Feedback, 'id'>): Promise<Feedback> {
    return this.feedbackRepository.create(feedback);
  }

  async count(where?: Where<Feedback>): Promise<Count> {
    return this.feedbackRepository.count(where);
  }

  async find(filter?: Filter<Feedback>): Promise<Feedback[]> {
    return this.feedbackRepository.find(filter);
  }

  async updateAll(feedback: Feedback, where?: Where<Feedback>): Promise<Count> {
    return this.feedbackRepository.updateAll(feedback, where);
  }

  async findById(id: number, filter?: FilterExcludingWhere<Feedback>): Promise<Feedback> {
    return this.feedbackRepository.findById(id, filter);
  }

  async updateById(id: number, feedback: Feedback): Promise<void> {
    await this.feedbackRepository.updateById(id, feedback);
  }

  async replaceById(id: number, feedback: Feedback): Promise<void> {
    await this.feedbackRepository.replaceById(id, feedback);
  }

  async deleteById(id: number): Promise<void> {
    await this.feedbackRepository.deleteById(id);
  }
}
