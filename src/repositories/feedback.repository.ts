import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {SwdImsDataSource} from '../datasources';
import {Feedback, FeedbackRelations, Users, Intern, TrainingProgram} from '../models';
import {UsersRepository} from './users.repository';
import {InternRepository} from './intern.repository';
import {TrainingProgramRepository} from './training-program.repository';

export class FeedbackRepository extends DefaultCrudRepository<
  Feedback,
  typeof Feedback.prototype.id,
  FeedbackRelations
> {

  public readonly users: BelongsToAccessor<Users, typeof Feedback.prototype.id>;

  public readonly intern: BelongsToAccessor<Intern, typeof Feedback.prototype.id>;

  public readonly trainingProgram: BelongsToAccessor<TrainingProgram, typeof Feedback.prototype.id>;

  constructor(
    @inject('datasources.swd_ims') dataSource: SwdImsDataSource, @repository.getter('UsersRepository') protected usersRepositoryGetter: Getter<UsersRepository>, @repository.getter('InternRepository') protected internRepositoryGetter: Getter<InternRepository>, @repository.getter('TrainingProgramRepository') protected trainingProgramRepositoryGetter: Getter<TrainingProgramRepository>,
  ) {
    super(Feedback, dataSource);
    this.trainingProgram = this.createBelongsToAccessorFor('trainingProgram', trainingProgramRepositoryGetter,);
    this.registerInclusionResolver('trainingProgram', this.trainingProgram.inclusionResolver);
    this.intern = this.createBelongsToAccessorFor('intern', internRepositoryGetter,);
    this.registerInclusionResolver('intern', this.intern.inclusionResolver);
    this.users = this.createBelongsToAccessorFor('users', usersRepositoryGetter,);
    this.registerInclusionResolver('users', this.users.inclusionResolver);
  }
}
