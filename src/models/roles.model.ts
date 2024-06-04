import {Entity, model, property} from '@loopback/repository';

@model()
export class Roles extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  rolesId?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  description?: string;


  constructor(data?: Partial<Roles>) {
    super(data);
  }
}

export interface RolesRelations {
  // describe navigational properties here
}

export type RolesWithRelations = Roles & RolesRelations;
