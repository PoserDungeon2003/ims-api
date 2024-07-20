import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {SwdImsDataSource} from '../datasources';
import {JobPosition, JobPositionRelations, Users} from '../models';
import {UsersRepository} from './users.repository';

export class JobPositionRepository extends DefaultCrudRepository<
  JobPosition,
  typeof JobPosition.prototype.id,
  JobPositionRelations
> {

  public readonly users: BelongsToAccessor<Users, typeof JobPosition.prototype.id>;

  constructor(
    @inject('datasources.swd_ims') dataSource: SwdImsDataSource, @repository.getter('UsersRepository') protected usersRepositoryGetter: Getter<UsersRepository>,
  ) {
    super(JobPosition, dataSource);
    this.users = this.createBelongsToAccessorFor('users', usersRepositoryGetter,);
    this.registerInclusionResolver('users', this.users.inclusionResolver);
  }
}
