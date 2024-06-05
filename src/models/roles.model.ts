import {Entity, hasMany, model, property} from '@loopback/repository';
import {Permissions} from './permissions.model';
import {RolePermissions} from './role-permissions.model';
import {Users} from './users.model';

@model()
export class Roles extends Entity {
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
  })
  description?: string;

  @hasMany(() => Users)
  users: Users[];

  @hasMany(() => Permissions, {through: {model: () => RolePermissions}})
  permissions: Permissions[];

  constructor(data?: Partial<Roles>) {
    super(data);
  }
}

export interface RolesRelations {
  // describe navigational properties here
}

export type RolesWithRelations = Roles & RolesRelations;
