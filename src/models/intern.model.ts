import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Feedback} from './feedback.model';
import {InternTask} from './intern-task.model';
import {Tasks} from './tasks.model';
import {TrainingProgram} from './training-program.model';
import {Users} from './users.model';
import {WorkResult} from './work-result.model';

@model({
  settings: {
    indexes: {
      intern_email_idx: {
        keys: {
          email: 1,
        },
        options: {
          unique: true,
        },
      },
      intern_phone_idx: {
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

  @hasMany(() => Tasks, {through: {model: () => InternTask}})
  tasks: Tasks[];

  @hasMany(() => TrainingProgram, {through: {model: () => WorkResult}})
  trainingPrograms: TrainingProgram[];

  @hasMany(() => Feedback)
  feedbacks: Feedback[];

  @belongsTo(() => Users)
  usersId: string;
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
