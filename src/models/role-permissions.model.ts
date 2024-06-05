import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    foreignKeys: {
      fk_roles_permissions: {
        name: 'fk_roles_permissions',
        entity: 'Roles',
        entityKey: 'id',
        foreignKey: 'rolesid',
      },
      fk_permissions_roles: {
        name: 'fk_permissions_roles',
        entity: 'Permissions',
        entityKey: 'id',
        foreignKey: 'permissionsid',
      }
    },
  },
})
export class RolePermissions extends Entity {
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
