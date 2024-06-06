import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Application,
  JobPosition,
} from '../models';
import {ApplicationRepository} from '../repositories';

export class ApplicationJobPositionController {
  constructor(
    @repository(ApplicationRepository)
    public applicationRepository: ApplicationRepository,
  ) { }

  @get('/applications/{id}/job-position', {
    responses: {
      '200': {
        description: 'JobPosition belonging to Application',
        content: {
          'application/json': {
            schema: getModelSchemaRef(JobPosition),
          },
        },
      },
    },
  })
  async getJobPosition(
    @param.path.number('id') id: typeof Application.prototype.id,
  ): Promise<JobPosition> {
    return this.applicationRepository.jobPosition(id);
  }
}
