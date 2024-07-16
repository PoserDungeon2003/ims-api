import {BindingScope, injectable, service} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors, Request} from '@loopback/rest';
import {ApplyApplication} from '../common/models/request';
import {Application} from '../models';
import {ApplicationRepository} from '../repositories';
import {FirebaseService} from './firebase.service';

@injectable({scope: BindingScope.TRANSIENT})
export class ApplicationService {
  constructor(
    @repository(ApplicationRepository)
    private applicationRepository: ApplicationRepository,
    @service(FirebaseService)
    private firebaseService: FirebaseService,
  ) { }

  async create(request: Request): Promise<Application> {
    let application = request.body as ApplyApplication;
    let fullName = application.firstName + ' ' + application.lastName;

    try {
      let result = await this.applicationRepository.create({
        appliedTo: application.appliedTo,
        fullName: fullName,
        // coverLetter: uploadFile.downloadURL,
        email: application.email,
        phone: application.phone,
        // resume: uploadFile.downloadURL,
        status: application.status,
      });
      if (result) {
        let uploadFile = await this.firebaseService.uploadFileToStorage(request, result.id?.toString() || '');
        console.log('=====upload to firebase', uploadFile);

        await this.applicationRepository.updateById(result.id, {
          resume: uploadFile.downloadURL,
        })
      }
      return result;
    } catch (error) {
      console.log('=====error', error);
      throw new HttpErrors[500]("Internal Server Error");
    }
  }
}
