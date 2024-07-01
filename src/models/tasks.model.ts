import {belongsTo, Entity, model, property} from '@loopback/repository';
import {TrainingProgram} from './training-program.model';
import {Users} from './users.model';

@model()
export class Tasks extends Entity {
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
  description: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @belongsTo(() => Users)
  usersId: number;

  @belongsTo(() => TrainingProgram)
  trainingProgramId: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Tasks>) {
    super(data);
  }
}

export interface TasksRelations {
  // describe navigational properties here
}

export type TasksWithRelations = Tasks & TasksRelations;
