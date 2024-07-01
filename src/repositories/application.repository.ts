import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {SwdImsDataSource} from '../datasources';
import {Application, ApplicationRelations, JobPosition, Interview} from '../models';
import {InterviewRepository} from './interview.repository';
import {JobPositionRepository} from './job-position.repository';

export class ApplicationRepository extends DefaultCrudRepository<
  Application,
  typeof Application.prototype.id,
  ApplicationRelations
> {

  public readonly jobPosition: BelongsToAccessor<JobPosition, typeof Application.prototype.id>;

  public readonly interviews: HasManyRepositoryFactory<Interview, typeof Application.prototype.id>;

  constructor(
    @inject('datasources.swd_ims') dataSource: SwdImsDataSource, @repository.getter('JobPositionRepository') protected jobPositionRepositoryGetter: Getter<JobPositionRepository>, @repository.getter('InterviewRepository') protected interviewRepositoryGetter: Getter<InterviewRepository>,
  ) {
    super(Application, dataSource);
    this.interviews = this.createHasManyRepositoryFactoryFor('interviews', interviewRepositoryGetter,);
    this.registerInclusionResolver('interviews', this.interviews.inclusionResolver);
    this.jobPosition = this.createBelongsToAccessorFor('jobPosition', jobPositionRepositoryGetter,);
    this.registerInclusionResolver('jobPosition', this.jobPosition.inclusionResolver);
  }
}
