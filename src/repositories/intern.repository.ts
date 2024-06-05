import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {SwdImsDataSource} from '../datasources';
import {Intern, InternRelations} from '../models';

export class InternRepository extends DefaultCrudRepository<
  Intern,
  typeof Intern.prototype.id,
  InternRelations
> {
  constructor(
    @inject('datasources.swd_ims') dataSource: SwdImsDataSource,
  ) {
    super(Intern, dataSource);
  }
}
