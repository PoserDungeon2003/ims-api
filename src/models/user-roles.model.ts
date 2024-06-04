import {Entity, model, property} from '@loopback/repository';

@model()
export class UserRoles extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  userRolesId?: number;

  @property({
    type: 'number',
    required: true,
  })
  usersId: number;

  @property({
    type: 'number',
    required: true,
  })
  rolesId: number;


  constructor(data?: Partial<UserRoles>) {
    super(data);
  }
}

export interface UserRolesRelations {
  // describe navigational properties here
}

export type UserRolesWithRelations = UserRoles & UserRolesRelations;
