import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Users} from './users.model';

@model({
  settings: {
    indexes: {
      job_position_name_idx: {
        keys: {
          name: 1,
        }
      },
    },
  }
})
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
  usersId: string;

  constructor(data?: Partial<JobPosition>) {
    super(data);
  }
}

export interface JobPositionRelations {
  // describe navigational properties here
}

export type JobPositionWithRelations = JobPosition & JobPositionRelations;
