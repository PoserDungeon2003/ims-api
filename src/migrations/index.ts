import {ImsApiApplication} from '../application';
import {MigrationRepository} from '../repositories';
import createRole from './01.role';
import createTrainingProgram from './02.trainingprogram';

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
    {name: '02.trainingprogram', migration: createTrainingProgram}
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
