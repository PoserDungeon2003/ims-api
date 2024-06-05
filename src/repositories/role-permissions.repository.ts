import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {SwdImsDataSource} from '../datasources';
import {RolePermissions, RolePermissionsRelations} from '../models';

export class RolePermissionsRepository extends DefaultCrudRepository<
  RolePermissions,
  typeof RolePermissions.prototype.id,
  RolePermissionsRelations
> {
  constructor(
    @inject('datasources.swd_ims') dataSource: SwdImsDataSource,
  ) {
    super(RolePermissions, dataSource);
  }
}
