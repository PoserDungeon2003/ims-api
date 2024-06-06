import {Entity, model, property} from '@loopback/repository';

@model()
export class TrainingProgram extends Entity {
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
  createdOn?: Date;

  @property({
    type: 'date',
    defaultFn: 'now',
  })
  updatedOn?: Date;

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
