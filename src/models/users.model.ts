import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Feedback} from './feedback.model';
import {Intern} from './intern.model';
import {Interview} from './interview.model';
import {JobPosition} from './job-position.model';
import {Roles} from './roles.model';
import {Tasks} from './tasks.model';
import {TrainingProgram} from './training-program.model';

@model({
  settings: {
    indexes: {
      users_username_idx: {
        keys: {
          username: 1
        },
        options: {
          unique: true
        }
      }
    }
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

  @hasMany(() => Intern)
  interns: Intern[];

  @hasMany(() => Interview)
  interviews: Interview[];

  @hasMany(() => JobPosition, {keyTo: 'hrId'})
  jobPositions: JobPosition[];

  @hasMany(() => Tasks)
  tasks: Tasks[];

  @hasMany(() => Feedback)
  feedbacks: Feedback[];

  @hasMany(() => TrainingProgram)
  trainingPrograms: TrainingProgram[];

  constructor(data?: Partial<Users>) {
    super(data);
  }
}

export interface UsersRelations {
  // describe navigational properties here
}

export type UsersWithRelations = Users & UsersRelations;
