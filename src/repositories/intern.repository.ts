import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {SwdImsDataSource} from '../datasources';
import {Intern, InternRelations, Users} from '../models';
import {UsersRepository} from './users.repository';

export class InternRepository extends DefaultCrudRepository<
  Intern,
  typeof Intern.prototype.id,
  InternRelations
> {

  public readonly mentor: BelongsToAccessor<Users, typeof Intern.prototype.id>;

  constructor(
    @inject('datasources.swd_ims') dataSource: SwdImsDataSource,
    @repository.getter('UsersRepository') protected usersRepositoryGetter: Getter<UsersRepository>,
  ) {
    super(Intern, dataSource);
    this.mentor = this.createBelongsToAccessorFor('mentor', usersRepositoryGetter,);
    this.registerInclusionResolver('mentor', this.mentor.inclusionResolver);
  }
}
