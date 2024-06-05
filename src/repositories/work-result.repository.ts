import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {SwdImsDataSource} from '../datasources';
import {WorkResult, WorkResultRelations} from '../models';

export class WorkResultRepository extends DefaultCrudRepository<
  WorkResult,
  typeof WorkResult.prototype.id,
  WorkResultRelations
> {
  constructor(
    @inject('datasources.swd_ims') dataSource: SwdImsDataSource,
  ) {
    super(WorkResult, dataSource);
  }
}
