import {model, property} from '@loopback/repository';
import {SchemaObject} from '@loopback/rest';

const CredentialsSchema: SchemaObject = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: {
      type: 'string',
      format: 'email',
    },
    password: {
      type: 'string',
    },
  },
};

export const CredentialsRequestBody = {
  description: 'The input of login function',
  required: true,
  content: {
    'application/json': {schema: CredentialsSchema},
  },
};

export type CreateUserRQ = {
  email: string,
  fullName: string,
  username: string,
  password: string,
  phone: number
}

@model()
export class CreateInternRQ {
  @property({
    type: 'string',
    required: true,
  })
  fullName: string
  @property({
    type: 'string',
    required: true,
  })
  email: string
  @property({
    type: 'number',
    required: true,
  })
  phone: number
  @property({
    type: 'string',
    required: true,
  })
  University: string
  @property({
    type: 'string',
    required: true,
  })
  major: string
  @property({
    type: 'string',
  })
  experiences?: string
  @property({
    type: 'string',
    required: true,
  })
  usersId: string
}

@model()
export class CreateTasksRQ {
  @property({
    type: 'string',
    required: true,
  })
  name: string
  @property({
    type: 'string',
    required: true,
  })
  description: string
  @property({
    type: 'number',
    required: true,
  })
  trainingProgramId: number
  @property({
    type: 'string',
    required: true,
  })
  usersId: string
}

@model()
export class CreateTrainingProgramRQ {
  @property({
    type: 'string',
    required: true,
  })
  name: string

  @property({
    type: 'string',
    required: true,
  })
  content: string

  @property({
    type: 'string',
    required: true,
  })
  code: string

  @property({
    type: 'string',
    required: true,
  })
  usersId: string
}

@model()
export class ApplyApplication {
  @property({
    type: 'string',
    required: true,
  })
  firstName: string;

  @property({
    type: 'string',
    required: true,
  })
  lastName: string;

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
    format: 'binary',
  })
  resume?: string;

  @property({
    type: 'string',
    format: 'binary',
  })
  coverLetter?: string;

  @property({
    type: 'string',
    required: true,
  })
  appliedTo: string;

  @property({
    type: 'string',
    default: 'pending',
  })
  status?: 'pending' | 'accepted' | 'rejected';
}
