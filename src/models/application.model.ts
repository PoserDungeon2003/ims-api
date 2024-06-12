import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {JobPosition} from './job-position.model';
import {Interview} from './interview.model';

@model()
export class Application extends Entity {
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
    type: 'date',
    defaultFn: 'now',
  })
  appliedAt?: Date;

  @property({
    type: 'string',
    default: 'pending',
  })
  status?: 'pending' | 'accepted' | 'rejected';

  @belongsTo(() => JobPosition)
  jobPositionId: number;

  @hasMany(() => Interview, {keyTo: 'applicantId'})
  interviews: Interview[];

  constructor(data?: Partial<Application>) {
    super(data);
  }
}

export interface ApplicationRelations {
  // describe navigational properties here
}

export type ApplicationWithRelations = Application & ApplicationRelations;
