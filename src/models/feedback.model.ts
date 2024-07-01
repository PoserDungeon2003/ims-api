import {Entity, model, property, belongsTo} from '@loopback/repository';
import {TimeStampMixin} from '../mixins';
import {Users} from './users.model';
import {Intern} from './intern.model';
import {TrainingProgram} from './training-program.model';

@model()
export class Feedback extends TimeStampMixin(Entity) {
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
  feedbackText: string;

  @property({
    type: 'number',
    required: true,
  })
  rating: number;
  @belongsTo(() => Users)
  usersId: number;

  @belongsTo(() => Intern)
  internId: number;

  @belongsTo(() => TrainingProgram)
  trainingProgramId: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Feedback>) {
    super(data);
  }
}

export interface FeedbackRelations {
  // describe navigational properties here
}

export type FeedbackWithRelations = Feedback & FeedbackRelations;
