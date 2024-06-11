import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {CreateInternRQ} from '../common/models/request';
import {BaseReponse} from '../common/models/response';
import {InternRepository, RolesRepository, UsersRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class InternService {
  constructor(
    @repository(InternRepository)
    private internRepository: InternRepository,
    @repository(UsersRepository)
    private usersRepository: UsersRepository,
    @repository(RolesRepository)
    private rolesRepository: RolesRepository
  ) { }

  async createIntern(intern: CreateInternRQ): Promise<BaseReponse> {
    let user = await this.usersRepository.findOne({
      where: {
        fullName: intern.mentorName
      }
    })
    let role = await this.rolesRepository.findOne({
      where: {
        name: 'Mentor'
      }
    })

    if (!user) {
      throw new HttpErrors[404]("User not found")
    }

    if (role && user.rolesId !== role.id) {
      throw new HttpErrors[403]("User is not mentor")
    }

    try {
      let result = await this.internRepository.create({
        email: intern.email,
        experiences: intern.experiences,
        fullName: intern.fullName,
        major: intern.major,
        phone: intern.phone,
        University: intern.University,
        mentorId: user.id
      })
      if (result) {
        return {success: 1}
      }
      return {success: 0, message: "Create intern failed"}
    } catch (error) {
      console.log('create intern', error);
      throw new HttpErrors[500]("Internal server error")
    }

    // return this.internRepository.create(intern);
  }
}
