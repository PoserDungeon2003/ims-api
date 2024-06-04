import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Roles, RolesWithRelations} from './roles.model';

@model()
export class Users extends Entity {
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
  email: string;

  @property({
    type: 'number',
    required: true,
  })
  phone: number;

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

  @belongsTo(() => Roles)
  rolesId: number;

  constructor(data?: Partial<Users>) {
    super(data);
  }
}

export interface UsersRelations {
  // describe navigational properties here
  roles?: RolesWithRelations
}

export type UsersWithRelations = Users & UsersRelations;
