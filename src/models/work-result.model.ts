import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class WorkResult extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  percentage: number;

  @property({
    type: 'string',
  })
  note?: string;

  @property({
    type: 'number',
  })
  internId?: number;

  @property({
    type: 'number',
  })
  trainingProgramId?: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<WorkResult>) {
    super(data);
  }
}

export interface WorkResultRelations {
  // describe navigational properties here
}

export type WorkResultWithRelations = WorkResult & WorkResultRelations;
