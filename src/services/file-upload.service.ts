import { /* inject, */ BindingScope, config, ContextTags, injectable, Provider} from '@loopback/core';
import {Request} from '@loopback/rest';
import multer from 'multer';
import {FileUploadHandler} from '../common';
import {FILE_UPLOAD_SERVICE} from '../keys';

@injectable({
  scope: BindingScope.TRANSIENT,
  tags: {[ContextTags.KEY]: FILE_UPLOAD_SERVICE},
})
export class FileUploadService implements Provider<FileUploadHandler> {
  constructor(@config() private options: multer.Options = {}) {
    if (!this.options.storage) {
      // Default to in-memory storage
      this.options.storage = multer.memoryStorage();
    }
  }

  public static getFilesAndFields(request: Request) {
    const uploadedFiles = request.files;
    const mapper = (f: globalThis.Express.Multer.File) => ({
      fieldname: f.fieldname,
      originalname: f.originalname,
      encoding: f.encoding,
      mimetype: f.mimetype,
      size: f.size,
    });
    let files: object[] = [];
    if (Array.isArray(uploadedFiles)) {
      files = uploadedFiles.map(mapper);
    } else {
      for (const filename in uploadedFiles) {
        files.push(...uploadedFiles[filename].map(mapper));
      }
    }
    return {files, fields: request.body};
  }

  value(): FileUploadHandler {
    return multer(this.options).any();
  }
}
