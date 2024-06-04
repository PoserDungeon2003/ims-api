import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {SwdImsDataSource} from '../datasources';
import {Roles, RolesRelations, Permissions, RolePermissions} from '../models';
import {RolePermissionsRepository} from './role-permissions.repository';
import {PermissionsRepository} from './permissions.repository';

export class RolesRepository extends DefaultCrudRepository<
  Roles,
  typeof Roles.prototype.rolesId,
  RolesRelations
> {

  public readonly permissions: HasManyThroughRepositoryFactory<Permissions, typeof Permissions.prototype.permissionsId,
          RolePermissions,
          typeof Roles.prototype.rolesId
        >;

  constructor(
    @inject('datasources.swd_ims') dataSource: SwdImsDataSource, @repository.getter('RolePermissionsRepository') protected rolePermissionsRepositoryGetter: Getter<RolePermissionsRepository>, @repository.getter('PermissionsRepository') protected permissionsRepositoryGetter: Getter<PermissionsRepository>,
  ) {
    super(Roles, dataSource);
    this.permissions = this.createHasManyThroughRepositoryFactoryFor('permissions', permissionsRepositoryGetter, rolePermissionsRepositoryGetter,);
    this.registerInclusionResolver('permissions', this.permissions.inclusionResolver);
  }
}
