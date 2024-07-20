import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'swd_ims',
  connector: 'postgresql',
  // url: process.env.DB_URL || '',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'swd_ims'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class SwdImsDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'swd_ims';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.swd_ims', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
