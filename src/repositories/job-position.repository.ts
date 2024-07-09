import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {SwdImsDataSource} from '../datasources';
import {JobPosition, JobPositionRelations} from '../models';

export class JobPositionRepository extends DefaultCrudRepository<
  JobPosition,
  typeof JobPosition.prototype.id,
  JobPositionRelations
> {
  constructor(
    @inject('datasources.swd_ims') dataSource: SwdImsDataSource,
  ) {
    super(JobPosition, dataSource);
  }
}
