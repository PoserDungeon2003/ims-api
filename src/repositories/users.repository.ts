import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {SwdImsDataSource} from '../datasources';
import {Intern, Roles, Users, UsersRelations} from '../models';
import {InternRepository} from './intern.repository';
import {RolesRepository} from './roles.repository';

export class UsersRepository extends DefaultCrudRepository<
  Users,
  typeof Users.prototype.id,
  UsersRelations
> {

  public readonly roles: BelongsToAccessor<Roles, typeof Users.prototype.id>;

  public readonly interns: HasManyRepositoryFactory<Intern, typeof Users.prototype.id>;

  constructor(
    @inject('datasources.swd_ims') dataSource: SwdImsDataSource,
    @repository.getter('RolesRepository') protected rolesRepositoryGetter: Getter<RolesRepository>,
    @repository.getter('InternRepository') protected internRepositoryGetter: Getter<InternRepository>,
  ) {
    super(Users, dataSource);
    this.interns = this.createHasManyRepositoryFactoryFor('interns', internRepositoryGetter,);
    this.registerInclusionResolver('interns', this.interns.inclusionResolver);
    this.roles = this.createBelongsToAccessorFor('roles', rolesRepositoryGetter,);
    this.registerInclusionResolver('roles', this.roles.inclusionResolver);
  }
}
