import {BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {ApplyApplication} from '../common/models/request';
import {Application} from '../models';
import {ApplicationRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class ApplicationService {
  constructor(
    @repository(ApplicationRepository)
    private applicationRepository: ApplicationRepository,
  ) { }

  async create(application: ApplyApplication): Promise<Application> {
    let fullName = application.firstName + ' ' + application.lastName;

    try {
      return this.applicationRepository.create({
        appliedTo: application.appliedTo,
        fullName: fullName,
        coverLetter: application.coverLetter,
        email: application.email,
        phone: application.phone,
        resume: application.resume,
        status: application.status,
      });
    } catch (error) {
      throw new HttpErrors[500]("Internal Server Error");
    }
  }
}
