import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {SwdImsDataSource} from '../datasources';
import {Application, Interview, InterviewRelations, Users} from '../models';
import {ApplicationRepository} from './application.repository';
import {UsersRepository} from './users.repository';

export class InterviewRepository extends DefaultCrudRepository<
  Interview,
  typeof Interview.prototype.id,
  InterviewRelations
> {

  public readonly users: BelongsToAccessor<Users, typeof Interview.prototype.id>;

  public readonly application: BelongsToAccessor<Application, typeof Interview.prototype.id>;

  constructor(
    @inject('datasources.swd_ims') dataSource: SwdImsDataSource, @repository.getter('UsersRepository') protected usersRepositoryGetter: Getter<UsersRepository>, @repository.getter('ApplicationRepository') protected applicationRepositoryGetter: Getter<ApplicationRepository>,
  ) {
    super(Interview, dataSource);
    this.application = this.createBelongsToAccessorFor('application', applicationRepositoryGetter,);
    this.registerInclusionResolver('application', this.application.inclusionResolver);
    this.users = this.createBelongsToAccessorFor('users', usersRepositoryGetter,);
    this.registerInclusionResolver('users', this.users.inclusionResolver);
  }
}
