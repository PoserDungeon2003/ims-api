import {Entity, model, property, hasMany} from '@loopback/repository';
import {Roles} from './roles.model';
import {UserRoles} from './user-roles.model';

@model()
export class Users extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  usersId?: number;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  fullName: string;

  @property({
    type: 'string',
    required: true,
  })
  username: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'number',
    required: true,
  })
  phone: number;

  @hasMany(() => Roles, {through: {model: () => UserRoles}})
  roles: Roles[];

  constructor(data?: Partial<Users>) {
    super(data);
  }
}

export interface UsersRelations {
  // describe navigational properties here
}

export type UsersWithRelations = Users & UsersRelations;
