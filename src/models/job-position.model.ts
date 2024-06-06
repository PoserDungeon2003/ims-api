import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Users} from './users.model';
import {Application} from './application.model';

@model()
export class JobPosition extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    default: 'open',
  })
  status?: 'open' | 'closed';

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @belongsTo(() => Users)
  hrId: number;

  @hasMany(() => Application)
  applications: Application[];

  constructor(data?: Partial<JobPosition>) {
    super(data);
  }
}

export interface JobPositionRelations {
  // describe navigational properties here
}

export type JobPositionWithRelations = JobPosition & JobPositionRelations;
