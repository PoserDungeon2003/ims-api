import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {SwdImsDataSource} from '../datasources';
import {Tasks, TasksRelations} from '../models';

export class TasksRepository extends DefaultCrudRepository<
  Tasks,
  typeof Tasks.prototype.id,
  TasksRelations
> {
  constructor(
    @inject('datasources.swd_ims') dataSource: SwdImsDataSource,
  ) {
    super(Tasks, dataSource);
  }
}
