import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Intern,
  Users,
} from '../models';
import {InternRepository} from '../repositories';

export class InternUsersController {
  constructor(
    @repository(InternRepository)
    public internRepository: InternRepository,
  ) { }

  @get('/interns/{id}/users', {
    responses: {
      '200': {
        description: 'Users belonging to Intern',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Users),
          },
        },
      },
    },
  })
  async getUsers(
    @param.path.number('id') id: typeof Intern.prototype.id,
  ): Promise<Users> {
    return this.internRepository.mentor(id);
  }
}
