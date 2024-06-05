import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory, repository} from '@loopback/repository';
import {SwdImsDataSource} from '../datasources';
import {Permissions, RolePermissions, Roles, RolesRelations, Users} from '../models';
import {PermissionsRepository} from './permissions.repository';
import {RolePermissionsRepository} from './role-permissions.repository';
import {UsersRepository} from './users.repository';

export class RolesRepository extends DefaultCrudRepository<
  Roles,
  typeof Roles.prototype.id,
  RolesRelations
> {

  public readonly users: HasManyRepositoryFactory<Users, typeof Roles.prototype.id>;

  public readonly permissions: HasManyThroughRepositoryFactory<Permissions, typeof Permissions.prototype.id,
    RolePermissions,
    typeof Roles.prototype.id
  >;

  constructor(
    @inject('datasources.swd_ims') dataSource: SwdImsDataSource, @repository.getter('UsersRepository') protected usersRepositoryGetter: Getter<UsersRepository>, @repository.getter('RolePermissionsRepository') protected rolePermissionsRepositoryGetter: Getter<RolePermissionsRepository>, @repository.getter('PermissionsRepository') protected permissionsRepositoryGetter: Getter<PermissionsRepository>,
  ) {
    super(Roles, dataSource);
    this.permissions = this.createHasManyThroughRepositoryFactoryFor('permissions', permissionsRepositoryGetter, rolePermissionsRepositoryGetter,);
    this.registerInclusionResolver('permissions', this.permissions.inclusionResolver);
    this.users = this.createHasManyRepositoryFactoryFor('users', usersRepositoryGetter,);
    this.registerInclusionResolver('users', this.users.inclusionResolver);
  }
}
