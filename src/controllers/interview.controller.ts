import { inject } from '@loopback/core';
import { authenticate } from '@loopback/authentication';
import {
    Count,
    CountSchema,
    Filter,
    FilterExcludingWhere,
    Where,
} from '@loopback/repository';
import {
    del,
    get,
    getModelSchemaRef,
    param,
    patch,
    post,
    put,
    requestBody,
    response,
} from '@loopback/rest';
import { Interview } from '../models';
import { InterviewService } from '../services';

export class InterviewController {
    constructor(
        @inject('services.InterviewService')
        private interviewService: InterviewService,
    ) { }

    @post('/interviews')
    @authenticate('jwt')
    @response(200, {
        description: 'Interview model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Interview) } },
    })
    async create(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Interview, {
                        title: 'NewInterview',
                        exclude: ['id'],
                    }),
                },
            },
        })
        interview: Omit<Interview, 'id'>,
    ): Promise<Interview> {
        return this.interviewService.createInterview(interview);
    }

    @get('/interviews/count')
    @authenticate('jwt')
    @response(200, {
        description: 'Interview model count',
        content: { 'application/json': { schema: CountSchema } },
    })
    async count(
        @param.where(Interview) where?: Where<Interview>,
    ): Promise<Count> {
        return this.interviewService.getInterviewCount(where);
    }

    @get('/interviews')
    @authenticate('jwt')
    @response(200, {
        description: 'Array of Interview model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: getModelSchemaRef(Interview, { includeRelations: true }),
                },
            },
        },
    })
    async find(
        @param.filter(Interview) filter?: Filter<Interview>,
    ): Promise<Interview[]> {
        return this.interviewService.getAllInterviews(filter);
    }

    @patch('/interviews')
    @authenticate('jwt')
    @response(200, {
        description: 'Interview PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
    })
    async updateAll(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Interview, { partial: true }),
                },
            },
        })
        interview: Interview,
        @param.where(Interview) where?: Where<Interview>,
    ): Promise<Count> {
        return this.interviewService.updateInterviews(interview, where);
    }

    @get('/interviews/{id}')
    @authenticate('jwt')
    @response(200, {
        description: 'Interview model instance',
        content: {
            'application/json': {
                schema: getModelSchemaRef(Interview, { includeRelations: true }),
            },
        },
    })
    async findById(
        @param.path.number('id') id: number,
        @param.filter(Interview, { exclude: 'where' }) filter?: FilterExcludingWhere<Interview>
    ): Promise<Interview> {
        return this.interviewService.getInterviewById(id, filter);
    }

    @patch('/interviews/{id}')
    @authenticate('jwt')
    @response(204, {
        description: 'Interview PATCH success',
    })
    async updateById(
        @param.path.number('id') id: number,
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(Interview, { partial: true }),
                },
            },
        })
        interview: Interview,
    ): Promise<void> {
        await this.interviewService.updateInterviewById(id, interview);
    }

    @put('/interviews/{id}')
    @authenticate('jwt')
    @response(204, {
        description: 'Interview PUT success',
    })
    async replaceById(
        @param.path.number('id') id: number,
        @requestBody() interview: Interview,
    ): Promise<void> {
        await this.interviewService.replaceInterviewById(id, interview);
    }

    @del('/interviews/{id}')
    @authenticate('jwt')
    @response(204, {
        description: 'Interview DELETE success',
    })
    async deleteById(@param.path.number('id') id: number): Promise<void> {
        await this.interviewService.deleteInterviewById(id);
    }
}
