import {belongsTo, Entity, model, property} from '@loopback/repository';
import {TimeStampMixin} from '../mixins';
import {Application} from './application.model';
import {Users} from './users.model';

@model()
export class Interview extends TimeStampMixin(Entity) {
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
  intervieweeName: string;

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

  @belongsTo(() => Users)
  usersId: number;

  @belongsTo(() => Application)
  applicationId: number;

  constructor(data?: Partial<Interview>) {
    super(data);
  }
}

export interface InterviewRelations {
  // describe navigational properties here
}

export type InterviewWithRelations = Interview & InterviewRelations;
