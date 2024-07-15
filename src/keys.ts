import {BindingKey} from '@loopback/core';
import {FileUploadHandler} from './common';

export const FILE_UPLOAD_SERVICE = BindingKey.create<FileUploadHandler>(
  'services.FileUpload',
);
