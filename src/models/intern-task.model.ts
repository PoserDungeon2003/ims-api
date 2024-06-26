import {Entity, model, property} from '@loopback/repository';

@model()
export class InternTask extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'boolean',
    required: true,
  })
  isCompleted: boolean;

  @property({
    type: 'number',
  })
  internId?: number;

  @property({
    type: 'number',
  })
  tasksId?: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<InternTask>) {
    super(data);
  }
}

export interface InternTaskRelations {
  // describe navigational properties here
}

export type InternTaskWithRelations = InternTask & InternTaskRelations;
