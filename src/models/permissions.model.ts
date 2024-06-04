import {Entity, model, property} from '@loopback/repository';

@model()
export class Permissions extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  permissionsId?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  description?: string;


  constructor(data?: Partial<Permissions>) {
    super(data);
  }
}

export interface PermissionsRelations {
  // describe navigational properties here
}

export type PermissionsWithRelations = Permissions & PermissionsRelations;
