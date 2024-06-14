import {genSalt, hash} from 'bcryptjs';
import fs from 'fs';
import yaml from 'js-yaml';
import {ImsApiApplication} from '../application';
import {Users} from '../models';
import {RolesRepository, UsersRepository} from '../repositories';

const hashPassword = async (password: string): Promise<string> => {
  const salt = await genSalt(10);
  return hash(password, salt);
}

export default async function (app: ImsApiApplication) {
  const usersRepository = await app.getRepository(UsersRepository)
  const rolesRepository = await app.getRepository(RolesRepository)

  let content: string = fs.readFileSync('./src/migrations/03.user.yml', 'utf8')
  let rows = yaml.load(content) as Users[];

  for (let row of rows) {
    console.log(row);

    let role = await rolesRepository.findOne({where: {id: row.rolesId}});
    if (!role) {
      console.log('Role not found')
      return
    }

    let user = await usersRepository.findOne({where: {username: row.username}});
    if (user) {
      await usersRepository.updateById(user.id, {
        username: row.username,
        phone: row.phone,
        fullName: row.fullName,
        email: row.email,
        password: await hashPassword(row.password),
        rolesId: row.rolesId
      })
    } else {
      await usersRepository.create({
        username: row.username,
        phone: row.phone,
        fullName: row.fullName,
        email: row.email,
        password: await hashPassword(row.password),
        rolesId: row.rolesId
      })
    }
  }
  console.log('Create users successful')
}
