import {Constructor, inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {SwdImsDataSource} from '../datasources';
import {TimeStampRepositoryMixin} from '../mixins/time-stamp-repository.mixin';
import {Migration, MigrationRelations} from '../models';

export class MigrationRepository extends TimeStampRepositoryMixin<
  Migration,
  typeof Migration.prototype.id,
  Constructor<
    DefaultCrudRepository<
      Migration,
      typeof Migration.prototype.id,
      MigrationRelations
    >
  >
>(DefaultCrudRepository) {
  constructor(@inject('datasources.swd_ims') dataSource: SwdImsDataSource) {
    super(Migration, dataSource)
  }
}
