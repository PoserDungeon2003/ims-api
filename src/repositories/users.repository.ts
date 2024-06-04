import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {SwdImsDataSource} from '../datasources';
import {Roles, Users, UsersRelations} from '../models';
import {RolesRepository} from './roles.repository';

export class UsersRepository extends DefaultCrudRepository<
  Users,
  typeof Users.prototype.id,
  UsersRelations
> {

  public readonly roles: BelongsToAccessor<Roles, typeof Users.prototype.id>;

  constructor(
    @inject('datasources.swd_ims') dataSource: SwdImsDataSource, @repository.getter('RolesRepository') protected rolesRepositoryGetter: Getter<RolesRepository>,
  ) {
    super(Users, dataSource);
    this.roles = this.createBelongsToAccessorFor('roles', rolesRepositoryGetter,);
    this.registerInclusionResolver('roles', this.roles.inclusionResolver);
  }
}
