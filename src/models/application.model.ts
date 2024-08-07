import {Entity, hasMany, model, property} from '@loopback/repository';
import {TimeStampMixin} from '../mixins';
import {Interview} from './interview.model';

@model({
  settings: {
    indexes: {
      application_email_idx: {
        keys: {
          email: 1,
        },
        options: {
          unique: true,
        },
      },
      application_phone_idx: {
        keys: {
          phone: -1,
        },
        options: {
          unique: true,
        },
      },
    },
  }
})
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
  })
  resume?: string;

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
