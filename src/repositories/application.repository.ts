import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {SwdImsDataSource} from '../datasources';
import {Application, ApplicationRelations, JobPosition} from '../models';
import {JobPositionRepository} from './job-position.repository';

export class ApplicationRepository extends DefaultCrudRepository<
  Application,
  typeof Application.prototype.id,
  ApplicationRelations
> {

  public readonly jobPosition: BelongsToAccessor<JobPosition, typeof Application.prototype.id>;

  constructor(
    @inject('datasources.swd_ims') dataSource: SwdImsDataSource, @repository.getter('JobPositionRepository') protected jobPositionRepositoryGetter: Getter<JobPositionRepository>,
  ) {
    super(Application, dataSource);
    this.jobPosition = this.createBelongsToAccessorFor('jobPosition', jobPositionRepositoryGetter,);
    this.registerInclusionResolver('jobPosition', this.jobPosition.inclusionResolver);
  }
}
