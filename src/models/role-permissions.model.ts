import {Entity, model, property} from '@loopback/repository';

@model()
export class RolePermissions extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  rolePermissionsId?: number;

  @property({
    type: 'number',
    required: true,
  })
  rolesId: number;

  @property({
    type: 'number',
    required: true,
  })
  permissionsId: number;


  constructor(data?: Partial<RolePermissions>) {
    super(data);
  }
}

export interface RolePermissionsRelations {
  // describe navigational properties here
}

export type RolePermissionsWithRelations = RolePermissions & RolePermissionsRelations;
