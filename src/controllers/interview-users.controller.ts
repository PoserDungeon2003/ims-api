import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Interview,
  Users,
} from '../models';
import {InterviewRepository} from '../repositories';

export class InterviewUsersController {
  constructor(
    @repository(InterviewRepository)
    public interviewRepository: InterviewRepository,
  ) { }

  @get('/interviews/{id}/users', {
    responses: {
      '200': {
        description: 'Users belonging to Interview',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Users),
          },
        },
      },
    },
  })
  async getUsers(
    @param.path.number('id') id: typeof Interview.prototype.id,
  ): Promise<Users> {
    return this.interviewRepository.Hr(id);
  }
}
