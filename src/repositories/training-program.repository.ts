import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {SwdImsDataSource} from '../datasources';
import {TrainingProgram, TrainingProgramRelations} from '../models';

export class TrainingProgramRepository extends DefaultCrudRepository<
  TrainingProgram,
  typeof TrainingProgram.prototype.id,
  TrainingProgramRelations
> {
  constructor(
    @inject('datasources.swd_ims') dataSource: SwdImsDataSource,
  ) {
    super(TrainingProgram, dataSource);
  }
}
