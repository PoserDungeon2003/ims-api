import {ImsApiApplication} from './application';
import {migrations, premigrates} from './migrations';

export async function migrate(args: string[]) {
  const existingSchema = args.includes('--rebuild') ? 'drop' : 'alter';
  console.log('Migrating schemas (%s existing schema)', existingSchema);

  const app = new ImsApiApplication();
  await app.boot();

  console.log('test1')
  await app.migrateSchema({existingSchema, models: ['Migration']});
  console.log('test2')

  await premigrates(app)

  console.log('test3')

  await app.migrateSchema({
    existingSchema
  });

  console.log('start migrations')
  await migrations(app)

  // Connectors usually keep a pool of opened connections,
  // this keeps the process running even after all work is done.
  // We need to exit explicitly.
  process.exit(0);
}

migrate(process.argv).catch(err => {
  console.error('Cannot migrate database schema', err);
  process.exit(1);
});
