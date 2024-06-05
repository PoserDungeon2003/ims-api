import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasManyThroughRepositoryFactory, repository} from '@loopback/repository';
import {SwdImsDataSource} from '../datasources';
import {Intern, InternRelations, InternTask, Tasks, Users} from '../models';
import {InternTaskRepository} from './intern-task.repository';
import {TasksRepository} from './tasks.repository';
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

  constructor(
    @inject('datasources.swd_ims') dataSource: SwdImsDataSource,
    @repository.getter('UsersRepository') protected usersRepositoryGetter: Getter<UsersRepository>,
    @repository.getter('InternTaskRepository') protected internTaskRepositoryGetter: Getter<InternTaskRepository>,
    @repository.getter('TasksRepository') protected tasksRepositoryGetter: Getter<TasksRepository>,
  ) {
    super(Intern, dataSource);
    this.tasks = this.createHasManyThroughRepositoryFactoryFor('tasks', tasksRepositoryGetter, internTaskRepositoryGetter,);
    this.registerInclusionResolver('tasks', this.tasks.inclusionResolver);
    this.mentor = this.createBelongsToAccessorFor('mentor', usersRepositoryGetter,);
    this.registerInclusionResolver('mentor', this.mentor.inclusionResolver);
  }
}
