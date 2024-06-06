import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {SwdImsDataSource} from '../datasources';
import {Interview, InterviewRelations, Users} from '../models';
import {UsersRepository} from './users.repository';

export class InterviewRepository extends DefaultCrudRepository<
  Interview,
  typeof Interview.prototype.id,
  InterviewRelations
> {

  public readonly Hr: BelongsToAccessor<Users, typeof Interview.prototype.id>;

  constructor(
    @inject('datasources.swd_ims') dataSource: SwdImsDataSource, @repository.getter('UsersRepository') protected usersRepositoryGetter: Getter<UsersRepository>,
  ) {
    super(Interview, dataSource);
    this.Hr = this.createBelongsToAccessorFor('Hr', usersRepositoryGetter,);
    this.registerInclusionResolver('Hr', this.Hr.inclusionResolver);
  }
}
