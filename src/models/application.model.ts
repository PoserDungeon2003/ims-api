import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {TimeStampMixin} from '../mixins';
import {Interview} from './interview.model';
import {JobPosition} from './job-position.model';

@model()
export class Application extends TimeStampMixin(Entity) {
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
  fullName: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'number',
    required: true,
  })
  phone: number;

  @property({
    type: 'string',
    required: true,
  })
  resume: string;

  @property({
    type: 'string',
  })
  coverLetter?: string;

  @property({
    type: 'string',
    required: true,
  })
  appliedTo: string;

  @property({
    type: 'string',
    default: 'pending',
  })
  status?: 'pending' | 'accepted' | 'rejected';

  @belongsTo(() => JobPosition)
  jobPositionId: number;

  @hasMany(() => Interview)
  interviews: Interview[];

  constructor(data?: Partial<Application>) {
    super(data);
  }
}

export interface ApplicationRelations {
  // describe navigational properties here
}

export type ApplicationWithRelations = Application & ApplicationRelations;
