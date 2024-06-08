import {Entity, model, property} from '@loopback/repository';
import {TimeStampMixin} from '../mixins';

@model({
  settings: {
    indexes: {
      migration_name_idx: {
        keys: {
          name: 1,
        },
        options: {
          unique: true,
        },
      },
    },
  },
})
export class Migration extends TimeStampMixin(Entity) {
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


  constructor(data?: Partial<Migration>) {
    super(data);
  }
}

export interface MigrationRelations {
  // describe navigational properties here
}

export type MigrationWithRelations = Migration & MigrationRelations;
