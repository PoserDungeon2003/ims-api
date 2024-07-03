import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {CreateInternRQ} from '../common/models/request';
import {Role} from '../common/type';
import {InternRepository, UsersRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class InternService {
  constructor(
    @repository(InternRepository)
    private internRepository: InternRepository,
    @repository(UsersRepository)
    private usersRepository: UsersRepository,
  ) { }

  async createIntern(internRQ: CreateInternRQ) {
    let user = await this.usersRepository.findOne({
      where: {
        id: internRQ.usersId
      }
    })

    let intern = await this.internRepository.findOne({
      where: {
        email: internRQ.email
      }
    });

    if (intern) {
      return {
        success: 0,
        message: "Duplicate email"
      }
    }

    if (!user) {
      return {
        success: 0,
        message: "User not found"
      }
    }

    if (user.rolesId !== Role.Mentor) {
      return {
        success: 0,
        message: "User is not mentor"
      }
    }

    try {
      let result = await this.internRepository.create({
        email: internRQ.email,
        experiences: internRQ.experiences,
        fullName: internRQ.fullName,
        major: internRQ.major,
        phone: internRQ.phone,
        University: internRQ.University,
        usersId: user.id
      })
      if (result) {
        return result
      }
      return {success: 0, message: "Create intern failed"}
    } catch (error) {
      return {success: 0, message: error}
    }
  }
}
