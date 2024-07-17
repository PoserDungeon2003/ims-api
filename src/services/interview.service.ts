import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {CreateInterview} from '../common/models/request';
import {Interview} from '../models';
import {InterviewRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class InterviewService {
  constructor(
    @repository(InterviewRepository)
    private interviewRepository: InterviewRepository,
  ) { }

  async create(interview: CreateInterview): Promise<Interview> {
    try {
      let truncatedQuiz = interview.quiz?.replace(/'/g, "");
      return this.interviewRepository.create({
        ...interview,
        quiz: JSON.parse(truncatedQuiz ?? ""),
      });
    } catch (error) {
      throw HttpErrors[500]("Internal server error")
    }
  }
}
