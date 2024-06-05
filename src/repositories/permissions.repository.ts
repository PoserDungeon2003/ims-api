import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {SwdImsDataSource} from '../datasources';
import {Permissions, PermissionsRelations} from '../models';

export class PermissionsRepository extends DefaultCrudRepository<
  Permissions,
  typeof Permissions.prototype.id,
  PermissionsRelations
> {
  constructor(
    @inject('datasources.swd_ims') dataSource: SwdImsDataSource,
  ) {
    super(Permissions, dataSource);
  }
}
