import {Entity, hasMany, model, property} from '@loopback/repository';
import {Users} from './users.model';

@model({
  settings: {
    // foreignKeys: {
    //   fk_roles_roleId: {
    //     name: 'fk_roles_roleId',
    //     onDelete: 'CASCADE',
    //   },
    // },
  }
})
export class Roles extends Entity {
  @property({
    type: 'number',
    id: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  description?: string;

  @hasMany(() => Users)
  users: Users[];

  constructor(data?: Partial<Roles>) {
    super(data);
  }
}

export interface RolesRelations {
  // describe navigational properties here
}

export type RolesWithRelations = Roles & RolesRelations;
