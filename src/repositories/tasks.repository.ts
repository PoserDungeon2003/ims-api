import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {SwdImsDataSource} from '../datasources';
import {Tasks, TasksRelations, Users, TrainingProgram} from '../models';
import {UsersRepository} from './users.repository';
import {TrainingProgramRepository} from './training-program.repository';

export class TasksRepository extends DefaultCrudRepository<
  Tasks,
  typeof Tasks.prototype.id,
  TasksRelations
> {

  public readonly users: BelongsToAccessor<Users, typeof Tasks.prototype.id>;

  public readonly trainingProgram: BelongsToAccessor<TrainingProgram, typeof Tasks.prototype.id>;

  constructor(
    @inject('datasources.swd_ims') dataSource: SwdImsDataSource, @repository.getter('UsersRepository') protected usersRepositoryGetter: Getter<UsersRepository>, @repository.getter('TrainingProgramRepository') protected trainingProgramRepositoryGetter: Getter<TrainingProgramRepository>,
  ) {
    super(Tasks, dataSource);
    this.trainingProgram = this.createBelongsToAccessorFor('trainingProgram', trainingProgramRepositoryGetter,);
    this.registerInclusionResolver('trainingProgram', this.trainingProgram.inclusionResolver);
    this.users = this.createBelongsToAccessorFor('users', usersRepositoryGetter,);
    this.registerInclusionResolver('users', this.users.inclusionResolver);
  }
}
