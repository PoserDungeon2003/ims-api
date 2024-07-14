import {RequestHandler} from 'express-serve-static-core';

export enum Role {
  HRManager = 1,
  Coordinator = 2,
  Mentor = 3,
  Admin = 4
}


export type FileUploadHandler = RequestHandler;
