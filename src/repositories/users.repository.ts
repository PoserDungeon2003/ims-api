import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {SwdImsDataSource} from '../datasources';
import {Users, UsersRelations, Roles, UserRoles} from '../models';
import {UserRolesRepository} from './user-roles.repository';
import {RolesRepository} from './roles.repository';

export class UsersRepository extends DefaultCrudRepository<
  Users,
  typeof Users.prototype.usersId,
  UsersRelations
> {

  public readonly roles: HasManyThroughRepositoryFactory<Roles, typeof Roles.prototype.rolesId,
          UserRoles,
          typeof Users.prototype.usersId
        >;

  constructor(
    @inject('datasources.swd_ims') dataSource: SwdImsDataSource, @repository.getter('UserRolesRepository') protected userRolesRepositoryGetter: Getter<UserRolesRepository>, @repository.getter('RolesRepository') protected rolesRepositoryGetter: Getter<RolesRepository>,
  ) {
    super(Users, dataSource);
    this.roles = this.createHasManyThroughRepositoryFactoryFor('roles', rolesRepositoryGetter, userRolesRepositoryGetter,);
    this.registerInclusionResolver('roles', this.roles.inclusionResolver);
  }
}
