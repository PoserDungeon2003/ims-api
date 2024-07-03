import {ImsApiApplication} from '../application';
import {MigrationRepository} from '../repositories';
import createRole from './01.role';
import createTrainingProgram from './02.trainingprogram';
import createUsers from './03.user';
import createIntern from './04.intern';
import createTasks from './05.tasks';

export async function premigrates(app: ImsApiApplication) {
  const repos = await app.getRepository(MigrationRepository)

  const list: {name: string; migration: Function}[] = [];

  for (const migration of list) {
    const findMigration = await repos.findOne({
      where: {name: migration.name},
    });
    if (!findMigration) {
      console.log(`start migration ${migration.name}`);
      await migration.migration(app);
      await repos.create({name: migration.name});
    }
  }

  console.log('inserting');
}

export async function migrations(app: ImsApiApplication) {
  const repos = await app.getRepository(MigrationRepository);
  const list: {name: string; migration: Function}[] = [
    {name: '01.role', migration: createRole},
    {name: '02.user', migration: createUsers},
    {name: '03.intern', migration: createIntern},
    {name: '04.trainingprogram', migration: createTrainingProgram},
    {name: '05.tasks', migration: createTasks}
  ];

  for (const migration of list) {
    const findMigration = await repos.findOne({
      where: {name: migration.name},
    });
    if (!findMigration) {
      console.log(`start migration ${migration.name}`);
      await migration.migration(app);
      await repos.create({name: migration.name});
      console.log(`done migration ${migration.name}`);
    }
  }

  console.log('inserting');
}
