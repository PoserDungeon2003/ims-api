import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {SwdImsDataSource} from '../datasources';
import {TrainingProgram, TrainingProgramRelations, Tasks, Feedback, Users} from '../models';
import {TasksRepository} from './tasks.repository';
import {FeedbackRepository} from './feedback.repository';
import {UsersRepository} from './users.repository';

export class TrainingProgramRepository extends DefaultCrudRepository<
  TrainingProgram,
  typeof TrainingProgram.prototype.id,
  TrainingProgramRelations
> {

  public readonly tasks: HasManyRepositoryFactory<Tasks, typeof TrainingProgram.prototype.id>;

  public readonly feedbacks: HasManyRepositoryFactory<Feedback, typeof TrainingProgram.prototype.id>;

  public readonly users: BelongsToAccessor<Users, typeof TrainingProgram.prototype.id>;

  constructor(
    @inject('datasources.swd_ims') dataSource: SwdImsDataSource, @repository.getter('TasksRepository') protected tasksRepositoryGetter: Getter<TasksRepository>, @repository.getter('FeedbackRepository') protected feedbackRepositoryGetter: Getter<FeedbackRepository>, @repository.getter('UsersRepository') protected usersRepositoryGetter: Getter<UsersRepository>,
  ) {
    super(TrainingProgram, dataSource);
    this.users = this.createBelongsToAccessorFor('users', usersRepositoryGetter,);
    this.registerInclusionResolver('users', this.users.inclusionResolver);
    this.feedbacks = this.createHasManyRepositoryFactoryFor('feedbacks', feedbackRepositoryGetter,);
    this.registerInclusionResolver('feedbacks', this.feedbacks.inclusionResolver);
    this.tasks = this.createHasManyRepositoryFactoryFor('tasks', tasksRepositoryGetter,);
    this.registerInclusionResolver('tasks', this.tasks.inclusionResolver);
  }
}
