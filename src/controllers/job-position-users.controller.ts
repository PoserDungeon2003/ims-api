import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  JobPosition,
  Users,
} from '../models';
import {JobPositionRepository} from '../repositories';

export class JobPositionUsersController {
  constructor(
    @repository(JobPositionRepository)
    public jobPositionRepository: JobPositionRepository,
  ) { }

  @get('/job-positions/{id}/users', {
    responses: {
      '200': {
        description: 'Users belonging to JobPosition',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Users),
          },
        },
      },
    },
  })
  async getUsers(
    @param.path.number('id') id: typeof JobPosition.prototype.id,
  ): Promise<Users> {
    return this.jobPositionRepository.hr(id);
  }
}
