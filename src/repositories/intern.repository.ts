import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory, repository} from '@loopback/repository';
import {SwdImsDataSource} from '../datasources';
import {Feedback, Intern, InternRelations, InternTask, Tasks, TrainingProgram, Users, WorkResult} from '../models';
import {FeedbackRepository} from './feedback.repository';
import {InternTaskRepository} from './intern-task.repository';
import {TasksRepository} from './tasks.repository';
import {TrainingProgramRepository} from './training-program.repository';
import {WorkResultRepository} from './work-result.repository';
import {UsersRepository} from './users.repository';

export class InternRepository extends DefaultCrudRepository<
  Intern,
  typeof Intern.prototype.id,
  InternRelations
> {

  public readonly mentor: BelongsToAccessor<Users, typeof Intern.prototype.id>;

  public readonly tasks: HasManyThroughRepositoryFactory<Tasks, typeof Tasks.prototype.id,
    InternTask,
    typeof Intern.prototype.id
  >;

  public readonly trainingPrograms: HasManyThroughRepositoryFactory<TrainingProgram, typeof TrainingProgram.prototype.id,
    WorkResult,
    typeof Intern.prototype.id
  >;

  public readonly feedbacks: HasManyRepositoryFactory<Feedback, typeof Intern.prototype.id>;

  public readonly users: BelongsToAccessor<Users, typeof Intern.prototype.id>;

  constructor(
    @inject('datasources.swd_ims') dataSource: SwdImsDataSource,
    @repository.getter('InternTaskRepository') protected internTaskRepositoryGetter: Getter<InternTaskRepository>,
    @repository.getter('TasksRepository') protected tasksRepositoryGetter: Getter<TasksRepository>,
    @repository.getter('WorkResultRepository') protected workResultRepositoryGetter: Getter<WorkResultRepository>,
    @repository.getter('TrainingProgramRepository') protected trainingProgramRepositoryGetter: Getter<TrainingProgramRepository>, @repository.getter('FeedbackRepository') protected feedbackRepositoryGetter: Getter<FeedbackRepository>, @repository.getter('UsersRepository') protected usersRepositoryGetter: Getter<UsersRepository>,
  ) {
    super(Intern, dataSource);
    this.users = this.createBelongsToAccessorFor('users', usersRepositoryGetter,);
    this.registerInclusionResolver('users', this.users.inclusionResolver);
    this.feedbacks = this.createHasManyRepositoryFactoryFor('feedbacks', feedbackRepositoryGetter,);
    this.registerInclusionResolver('feedbacks', this.feedbacks.inclusionResolver);
    this.trainingPrograms = this.createHasManyThroughRepositoryFactoryFor('trainingPrograms', trainingProgramRepositoryGetter, workResultRepositoryGetter,);
    this.registerInclusionResolver('trainingPrograms', this.trainingPrograms.inclusionResolver);
    this.tasks = this.createHasManyThroughRepositoryFactoryFor('tasks', tasksRepositoryGetter, internTaskRepositoryGetter,);
    this.registerInclusionResolver('tasks', this.tasks.inclusionResolver);
  }
}
