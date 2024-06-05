import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {SwdImsDataSource} from '../datasources';
import {InternTask, InternTaskRelations} from '../models';

export class InternTaskRepository extends DefaultCrudRepository<
  InternTask,
  typeof InternTask.prototype.id,
  InternTaskRelations
> {
  constructor(
    @inject('datasources.swd_ims') dataSource: SwdImsDataSource,
  ) {
    super(InternTask, dataSource);
  }
}
