import {belongsTo, Entity, model, property, hasMany} from '@loopback/repository';
import {Roles} from './roles.model';
import {Intern} from './intern.model';

@model({
  settings: {
    foreignKeys: {
      fk_roles_roleId: {
        name: 'fk_roles_roleId',
        entity: 'Roles',
        entityKey: 'id',
        foreignKey: 'rolesid',
        onDelete: 'CASCADE',
        onUpdate: 'SET NULL'
      },
    },
  },
})
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

  @hasMany(() => Intern, {keyTo: 'mentorId'})
  interns: Intern[];

  constructor(data?: Partial<Users>) {
    super(data);
  }
}

export interface UsersRelations {
  // describe navigational properties here
}

export type UsersWithRelations = Users & UsersRelations;
