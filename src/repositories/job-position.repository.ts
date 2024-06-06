import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {SwdImsDataSource} from '../datasources';
import {JobPosition, JobPositionRelations, Users, Application} from '../models';
import {UsersRepository} from './users.repository';
import {ApplicationRepository} from './application.repository';

export class JobPositionRepository extends DefaultCrudRepository<
  JobPosition,
  typeof JobPosition.prototype.id,
  JobPositionRelations
> {

  public readonly hr: BelongsToAccessor<Users, typeof JobPosition.prototype.id>;

  public readonly applications: HasManyRepositoryFactory<Application, typeof JobPosition.prototype.id>;

  constructor(
    @inject('datasources.swd_ims') dataSource: SwdImsDataSource, @repository.getter('UsersRepository') protected usersRepositoryGetter: Getter<UsersRepository>, @repository.getter('ApplicationRepository') protected applicationRepositoryGetter: Getter<ApplicationRepository>,
  ) {
    super(JobPosition, dataSource);
    this.applications = this.createHasManyRepositoryFactoryFor('applications', applicationRepositoryGetter,);
    this.registerInclusionResolver('applications', this.applications.inclusionResolver);
    this.hr = this.createBelongsToAccessorFor('hr', usersRepositoryGetter,);
    this.registerInclusionResolver('hr', this.hr.inclusionResolver);
  }
}
