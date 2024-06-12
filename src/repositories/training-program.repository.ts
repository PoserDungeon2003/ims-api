import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {SwdImsDataSource} from '../datasources';
import {TrainingProgram, TrainingProgramRelations, Tasks, Feedback} from '../models';
import {TasksRepository} from './tasks.repository';
import {FeedbackRepository} from './feedback.repository';

export class TrainingProgramRepository extends DefaultCrudRepository<
  TrainingProgram,
  typeof TrainingProgram.prototype.id,
  TrainingProgramRelations
> {

  public readonly tasks: HasManyRepositoryFactory<Tasks, typeof TrainingProgram.prototype.id>;

  public readonly feedbacks: HasManyRepositoryFactory<Feedback, typeof TrainingProgram.prototype.id>;

  constructor(
    @inject('datasources.swd_ims') dataSource: SwdImsDataSource, @repository.getter('TasksRepository') protected tasksRepositoryGetter: Getter<TasksRepository>, @repository.getter('FeedbackRepository') protected feedbackRepositoryGetter: Getter<FeedbackRepository>,
  ) {
    super(TrainingProgram, dataSource);
    this.feedbacks = this.createHasManyRepositoryFactoryFor('feedbacks', feedbackRepositoryGetter,);
    this.registerInclusionResolver('feedbacks', this.feedbacks.inclusionResolver);
    this.tasks = this.createHasManyRepositoryFactoryFor('tasks', tasksRepositoryGetter,);
    this.registerInclusionResolver('tasks', this.tasks.inclusionResolver);
  }
}
