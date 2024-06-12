import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Intern} from './intern.model';
import {Interview} from './interview.model';
import {JobPosition} from './job-position.model';
import {Roles} from './roles.model';
import {Tasks} from './tasks.model';
import {Feedback} from './feedback.model';

@model({
  settings: {
    // foreignKeys: {
    //   fk_roles_roleId: {
    //     name: 'fk_roles_roleId',
    //     entity: 'Roles',
    //     entityKey: 'id',
    //     foreignKey: 'rolesid',
    //     onDelete: 'CASCADE',
    //     onUpdate: 'SET NULL'
    //   },
    // },
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

  @hasMany(() => Interview, {keyTo: 'HrId'})
  interviews: Interview[];

  @hasMany(() => JobPosition, {keyTo: 'hrId'})
  jobPositions: JobPosition[];

  @hasMany(() => Tasks, {keyTo: 'mentorId'})
  tasks: Tasks[];

  @hasMany(() => Feedback, {keyTo: 'mentorId'})
  feedbacks: Feedback[];

  constructor(data?: Partial<Users>) {
    super(data);
  }
}

export interface UsersRelations {
  // describe navigational properties here
}

export type UsersWithRelations = Users & UsersRelations;
