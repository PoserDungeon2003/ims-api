import {Entity, hasMany, model, property} from '@loopback/repository';
import {TimeStampMixin} from '../mixins';
import {Feedback} from './feedback.model';
import {Tasks} from './tasks.model';

@model()
export class TrainingProgram extends TimeStampMixin(Entity) {
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
    required: true,
  })
  content: string;

  @property({
    type: 'string',
    required: true,
  })
  code: string;

  @hasMany(() => Tasks)
  tasks: Tasks[];

  @hasMany(() => Feedback)
  feedbacks: Feedback[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<TrainingProgram>) {
    super(data);
  }
}

export interface TrainingProgramRelations {
  // describe navigational properties here
}

export type TrainingProgramWithRelations = TrainingProgram & TrainingProgramRelations;
