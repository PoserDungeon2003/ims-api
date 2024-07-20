import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {Count, Filter, FilterExcludingWhere, repository, Where} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {CreateInterview} from '../common/models/request';
import {Interview, Quiz} from '../models';
import {InterviewRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class InterviewService {
  constructor(
    @repository(InterviewRepository)
    private interviewRepository: InterviewRepository,
  ) { }

  async create(interview: CreateInterview): Promise<Interview> {
    try {
      const quiz: Quiz = JSON.parse(interview.quiz ?? "");
      return this.interviewRepository.create({
        ...interview,
        quiz: quiz,
      });
    } catch (error) {
      throw HttpErrors[500]("Internal server error")
    }
  }

  async count(where?: Where<Interview>): Promise<Count> {
    return this.interviewRepository.count(where);
  }

  async find(filter?: Filter<Interview>): Promise<Interview[]> {
    return this.interviewRepository.find(filter);
  }

  async updateAll(interview: Interview, where?: Where<Interview>): Promise<Count> {
    return this.interviewRepository.updateAll(interview, where);
  }

  async findById(id: number, filter?: FilterExcludingWhere<Interview>): Promise<Interview> {
    return this.interviewRepository.findById(id, filter);
  }

  async updateById(id: number, interview: Interview): Promise<void> {
    await this.interviewRepository.updateById(id, interview);
  }

  async replaceById(id: number, interview: Interview): Promise<void> {
    await this.interviewRepository.replaceById(id, interview);
  }

  async deleteById(id: number): Promise<void> {
    await this.interviewRepository.deleteById(id);
  }
}
