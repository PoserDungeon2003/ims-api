import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {SwdImsDataSource} from '../datasources';
import {UserRoles, UserRolesRelations} from '../models';

export class UserRolesRepository extends DefaultCrudRepository<
  UserRoles,
  typeof UserRoles.prototype.userRolesId,
  UserRolesRelations
> {
  constructor(
    @inject('datasources.swd_ims') dataSource: SwdImsDataSource,
  ) {
    super(UserRoles, dataSource);
  }
}
