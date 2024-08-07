import {ImsApiApplication} from '../application';
import {MigrationRepository} from '../repositories';
import createRole from './01.role';
import createTrainingProgram from './02.trainingprogram';
import createUsers from './03.user';
import createIntern from './04.intern';
import createTasks from './05.tasks';
import createWorkResult from './06.work-result';
import createApplication from './07.application';
import createFeedback from './08.feedback';
import createInterview from './09.interview';
import createJobPosition from './10.job-position';

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
    {name: '05.tasks', migration: createTasks},
    {name: '06.work-result', migration: createWorkResult},
    {name: '07.application', migration: createApplication},
    {name: '08.feedback', migration: createFeedback},
    {name: '09.interview', migration: createInterview},
    {name: '10.job-position', migration: createJobPosition},
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
