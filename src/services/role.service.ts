import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {Count, Filter, FilterExcludingWhere, repository, Where} from '@loopback/repository';
import {Roles} from '../models';
import {RolesRepository} from '../repositories';

@injectable({scope: BindingScope.TRANSIENT})
export class RoleService {
  constructor(
    @repository(RolesRepository)
    public rolesRepository: RolesRepository,
  ) { }

  async create(roles: Omit<Roles, 'id'>): Promise<Roles> {
    return this.rolesRepository.create(roles);
  }

  async count(where?: Where<Roles>): Promise<Count> {
    return this.rolesRepository.count(where);
  }

  async find(filter?: Filter<Roles>): Promise<Roles[]> {
    return this.rolesRepository.find(filter);
  }

  async updateAll(roles: Roles, where?: Where<Roles>): Promise<Count> {
    return this.rolesRepository.updateAll(roles, where);
  }

  async findById(id: number, filter?: FilterExcludingWhere<Roles>): Promise<Roles> {
    return this.rolesRepository.findById(id, filter);
  }

  async updateById(id: number, roles: Roles): Promise<void> {
    await this.rolesRepository.updateById(id, roles);
  }

  async replaceById(id: number, roles: Roles): Promise<void> {
    await this.rolesRepository.replaceById(id, roles);
  }

  async deleteById(id: number): Promise<void> {
    await this.rolesRepository.deleteById(id);
  }
}
