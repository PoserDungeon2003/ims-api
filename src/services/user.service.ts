import {UserService as BaseUserService} from '@loopback/authentication';
import {Credentials} from '@loopback/authentication-jwt';
import {service} from '@loopback/core';
import {Count, Filter, FilterExcludingWhere, repository, Where} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import {compare} from 'bcryptjs';
import log4js from 'log4js';
import shortUUID from 'short-uuid';
import {Role} from '../common';
import {BaseReponse} from '../common/models/response';
import {Users} from '../models';
import {RolesRepository, UsersRepository} from '../repositories';
import {PasswordHashService} from './password-hash.service';

const logger = log4js.getLogger('user.controller')
logger.level = 'debug'

export class UserService implements BaseUserService<Users, Credentials> {
  constructor(
    @repository(UsersRepository) private userRepository: UsersRepository,
    @repository(RolesRepository) private rolesRepository: RolesRepository,
    @service(PasswordHashService) private passwordHasher: PasswordHashService,
  ) { }
  async verifyCredentials(credentials: Credentials): Promise<Users> {
    const invalidUserNameError = 'Tên đăng nhập chưa đúng. Vui lòng thử lại.'
    const invalidPasswordError = 'Mật khẩu chưa đúng. Vui lòng thử lại.'

    const foundUser = await this.userRepository.findOne({
      where: {email: credentials.email},
    })

    if (!foundUser) {
      throw new HttpErrors.Unauthorized(JSON.stringify({message: invalidUserNameError}))
    }

    const credentialsFound = await this.userRepository.findById(foundUser.id)
    if (!credentialsFound) {
      throw new HttpErrors.Unauthorized(JSON.stringify({message: invalidUserNameError}))
    }

    const passwordMatched = await compare(
      credentials.password,
      credentialsFound.password,
    )

    if (!passwordMatched) {
      throw new HttpErrors.Unauthorized(JSON.stringify({message: invalidPasswordError}))
    }
    return foundUser
  }
  convertToUserProfile(user: Users): UserProfile {
    const role = Role[user.rolesId]
    return {
      [securityId]: user.id?.toString() ?? '',
      email: user.email,
      name: user.fullName,
      roles: [role],
      tokenId: shortUUID().new(),
    }
  }

  async createUser(userParams: Users): Promise<BaseReponse> {
    logger.debug('userParams', userParams)

    let user = await this.userRepository.findOne({
      where: {email: userParams.email.toLowerCase()}
    })

    if (!user) {
      let role = await this.rolesRepository.exists(userParams.rolesId)
      if (!role) {
        throw new HttpErrors[404]('Role not found')
      }
      try {
        user = await this.userRepository.create({
          email: userParams.email.toLowerCase(),
          username: userParams.username?.toLowerCase(),
          fullName: userParams.fullName,
          phone: userParams.phone,
          password: await this.passwordHasher.hashPassword(userParams.password),
          rolesId: userParams.rolesId
        })
        return {success: 1}
      } catch (error) {
        throw new HttpErrors[500]('Create user failed')
      }
    }

    return {success: 0, message: 'This email has been used'}
  }

  async findUser(filter?: Filter<Users>): Promise<Users[]> {
    return this.userRepository.find(filter);
  }

  async findUserById(id: string, filter?: FilterExcludingWhere<Users>): Promise<Users> {
    return this.userRepository.findById(id, filter);
  }

  async updateUserById(id: string, users: Users): Promise<void> {
    await this.userRepository.updateById(id, users);
  }

  async deleteUserById(id: string): Promise<void> {
    await this.userRepository.deleteById(id);
  }

  async count(where?: Where<Users>): Promise<Count> {
    return this.userRepository.count(where);
  }

  async updateAll(users: Users, where?: Where<Users>): Promise<Count> {
    return this.userRepository.updateAll(users, where);
  }

  async replaceById(id: string, users: Users): Promise<void> {
    await this.userRepository.replaceById(id, users);
  }
}
