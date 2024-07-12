import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {Count, Filter, FilterExcludingWhere, repository, Where} from '@loopback/repository';
import {CreateInternRQ} from '../common/models/request';
import {Role} from '../common/type';
import {Intern} from '../models';
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

  async count(where?: Where<Intern>): Promise<Count> {
    return this.internRepository.count(where);
  }

  async find(filter?: Filter<Intern>): Promise<Intern[]> {
    return this.internRepository.find(filter);
  }

  async updateAll(intern: Intern, where?: Where<Intern>): Promise<Count> {
    return this.internRepository.updateAll(intern, where);
  }

  async findById(id: number, filter?: FilterExcludingWhere<Intern>): Promise<Intern> {
    return this.internRepository.findById(id, filter);
  }

  async updateById(id: number, intern: Intern): Promise<void> {
    await this.internRepository.updateById(id, intern);
  }

  async replaceById(id: number, intern: Intern): Promise<void> {
    await this.internRepository.replaceById(id, intern);
  }

  async deleteById(id: number): Promise<void> {
    await this.internRepository.deleteById(id);
  }
}
