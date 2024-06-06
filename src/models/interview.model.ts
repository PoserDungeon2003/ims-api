import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Users} from './users.model';

@model()
export class Interview extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    defaultFn: 'now',
  })
  time?: string;

  @property({
    type: 'string',
    required: true,
  })
  location: string;

  @property({
    type: 'object',
    postgresql: {
      dataType: 'jsonb',
    }
  })
  quiz?: object;

  @property({
    type: 'string',
    required: false,
    default: 'pending',
  })
  status?: 'pending' | 'accepted' | 'rejected';

  @property({
    type: 'date',
    defaultFn: 'now',
  })
  createdOn?: Date;

  @property({
    type: 'date',
  })
  updatedOn?: Date;

  @belongsTo(() => Users)
  HrId: number;

  constructor(data?: Partial<Interview>) {
    super(data);
  }
}

export interface InterviewRelations {
  // describe navigational properties here
}

export type InterviewWithRelations = Interview & InterviewRelations;
