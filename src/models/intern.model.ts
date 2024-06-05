import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Users} from './users.model';
import {Tasks} from './tasks.model';
import {InternTask} from './intern-task.model';

@model({settings: {strict: false}})
export class Intern extends Entity {
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
  University: string;

  @property({
    type: 'string',
    required: true,
  })
  major: string;

  @property({
    type: 'string',
  })
  experiences?: string;

  @belongsTo(() => Users)
  mentorId: number;

  @hasMany(() => Tasks, {through: {model: () => InternTask}})
  tasks: Tasks[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Intern>) {
    super(data);
  }
}

export interface InternRelations {
  // describe navigational properties here
}

export type InternWithRelations = Intern & InternRelations;
