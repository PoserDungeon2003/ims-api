import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<JobPosition>) {
    super(data);
  }
}

export interface JobPositionRelations {
  // describe navigational properties here
}

export type JobPositionWithRelations = JobPosition & JobPositionRelations;
