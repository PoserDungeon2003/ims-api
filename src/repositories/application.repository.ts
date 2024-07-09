import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {SwdImsDataSource} from '../datasources';
import {Application, ApplicationRelations, Interview} from '../models';
import {InterviewRepository} from './interview.repository';
import {JobPositionRepository} from './job-position.repository';

export class ApplicationRepository extends DefaultCrudRepository<
  Application,
  typeof Application.prototype.id,
  ApplicationRelations
> {

  public readonly interviews: HasManyRepositoryFactory<Interview, typeof Application.prototype.id>;

  constructor(
    @inject('datasources.swd_ims') dataSource: SwdImsDataSource, @repository.getter('JobPositionRepository') protected jobPositionRepositoryGetter: Getter<JobPositionRepository>, @repository.getter('InterviewRepository') protected interviewRepositoryGetter: Getter<InterviewRepository>,
  ) {
    super(Application, dataSource);
    this.interviews = this.createHasManyRepositoryFactoryFor('interviews', interviewRepositoryGetter,);
    this.registerInclusionResolver('interviews', this.interviews.inclusionResolver);
  }
}
