import {authenticate} from '@loopback/authentication';
import {inject, service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  Request,
  requestBody,
  Response,
  response,
  RestBindings
} from '@loopback/rest';
import multer from 'multer';
import {FileUploadHandler} from '../common';
import {FILE_UPLOAD_SERVICE} from '../keys';
import {Application} from '../models';
import {ApplicationService, FileUploadService, FirebaseService} from '../services';

export class ApplicationController {
  constructor(
    @service(FirebaseService)
    private firebaseService: FirebaseService,
    @inject(FILE_UPLOAD_SERVICE)
    private handler: FileUploadHandler,
    @service(ApplicationService)
    private applicationService: ApplicationService,
  ) { }

  @post('/applications')
  @response(200)
  async create(
    @requestBody.file()
    request: Request,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ): Promise<object> {
    const upload = multer({storage: multer.memoryStorage()}).array('resume');
    return new Promise<object>((resolve, reject) => {
      upload(request, response, err => {
        if (err) reject(err);
        else {
          resolve(this.applicationService.create(request));
        }
      });
    });
  }

  @get('/applications/count')
  @authenticate('jwt')
  @response(200, {
    description: 'Application model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Application) where?: Where<Application>,
  ): Promise<Count> {
    return this.applicationService.count(where);
  }

  @get('/applications')
  @authenticate('jwt')
  @response(200, {
    description: 'Array of Application model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Application, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Application) filter?: Filter<Application>,
  ): Promise<Application[]> {
    return this.applicationService.find(filter);
  }

  @patch('/applications')
  @authenticate('jwt')
  @response(200, {
    description: 'Application PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Application, {partial: true}),
        },
      },
    })
    application: Application,
    @param.where(Application) where?: Where<Application>,
  ): Promise<Count> {
    return this.applicationService.updateAll(application, where);
  }

  @get('/applications/{id}')
  @authenticate('jwt')
  @response(200, {
    description: 'Application model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Application, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Application, {exclude: 'where'}) filter?: FilterExcludingWhere<Application>
  ): Promise<Application> {
    return this.applicationService.findById(id, filter);
  }

  @patch('/applications/{id}')
  @authenticate('jwt')
  @response(204, {
    description: 'Application PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Application, {partial: true}),
        },
      },
    })
    application: Application,
  ): Promise<void> {
    await this.applicationService.updateById(id, application);
  }

  @put('/applications/{id}')
  @authenticate('jwt')
  @response(204, {
    description: 'Application PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() application: Application,
  ): Promise<void> {
    await this.applicationService.replaceById(id, application);
  }

  @del('/applications/{id}')
  @authenticate('jwt')
  @response(204, {
    description: 'Application DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.applicationService.deleteById(id);
  }

  @post('/file/upload')
  @authenticate('jwt')
  @response(200)
  async uploadFile(
    @requestBody.file()
    request: Request,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ): Promise<object> {
    const upload = multer({storage: multer.memoryStorage()}).single('file');
    return new Promise<object>((resolve, reject) => {
      upload(request, response, err => {
        if (err) reject(err);
        else {
          resolve(this.firebaseService.testUploadToFirebase(request, response));
        }
      });
    });
  }

  @post('/files', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Files and fields',
      },
    },
  })
  @authenticate('jwt')
  async fileUpload(
    @requestBody.file()
    request: Request,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ): Promise<object> {
    return new Promise<object>((resolve, reject) => {
      this.handler(request, response, err => {
        if (err) reject(err);
        else {
          resolve(FileUploadService.getFilesAndFields(request));
        }
      });
    });
  }
}
