import { injectable, BindingScope } from '@loopback/core';
import { repository } from '@loopback/repository';
import { Interview } from '../models';
import { InterviewRepository } from '../repositories';
import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';

export interface IInterviewService {
    createInterview(interviewData: Omit<Interview, 'id'>): Promise<Interview>;
    getInterviewCount(where?: Where<Interview>): Promise<Count>;
    getAllInterviews(filter?: Filter<Interview>): Promise<Interview[]>;
    updateInterviews(interview: Interview, where?: Where<Interview>): Promise<Count>;
    getInterviewById(id: number, filter?: FilterExcludingWhere<Interview>): Promise<Interview>;
    updateInterviewById(id: number, interview: Interview): Promise<void>;
    replaceInterviewById(id: number, interview: Interview): Promise<void>;
    deleteInterviewById(id: number): Promise<void>;
}

@injectable({ scope: BindingScope.TRANSIENT })
export class InterviewService implements IInterviewService {
    constructor(
        @repository(InterviewRepository)
        private interviewRepository: InterviewRepository,
    ) { }

    async createInterview(interviewData: Omit<Interview, 'id'>): Promise<Interview> {
        return this.interviewRepository.create(interviewData);
    }

    async getInterviewCount(where?: Where<Interview>): Promise<Count> {
        return this.interviewRepository.count(where);
    }

    async getAllInterviews(filter?: Filter<Interview>): Promise<Interview[]> {
        return this.interviewRepository.find(filter);
    }

    async updateInterviews(interview: Interview, where?: Where<Interview>): Promise<Count> {
        return this.interviewRepository.updateAll(interview, where);
    }

    async getInterviewById(id: number, filter?: FilterExcludingWhere<Interview>): Promise<Interview> {
        return this.interviewRepository.findById(id, filter);
    }

    async updateInterviewById(id: number, interview: Interview): Promise<void> {
        await this.interviewRepository.updateById(id, interview);
    }

    async replaceInterviewById(id: number, interview: Interview): Promise<void> {
        await this.interviewRepository.replaceById(id, interview);
    }

    async deleteInterviewById(id: number): Promise<void> {
        await this.interviewRepository.deleteById(id);
    }
}
