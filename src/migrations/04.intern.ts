import fs from 'fs';
import yaml from 'js-yaml';
import {ImsApiApplication} from '../application';
import {Role} from '../common/type';
import {InternRepository, UsersRepository} from '../repositories';

export default async function (app: ImsApiApplication) {
  const usersRepository = await app.getRepository(UsersRepository)
  const internRepository = await app.getRepository(InternRepository)

  let content: string = fs.readFileSync('./src/migrations/04.intern.yml', 'utf8')
  let rows = yaml.load(content) as any;

  for (let row of rows) {
    console.log('intern', row);
    let user = await usersRepository.findOne({where: {username: row.username}});
    if (user?.rolesId !== Role.Mentor) {
      console.log('User is not mentor')
      return
    }

    let intern = await internRepository.findOne({where: {email: row.email}});

    if (intern) {
      await internRepository.updateById(intern.id, {
        email: row.email,
        experiences: row.experiences,
        fullName: row.fullName,
        major: row.major,
        phone: row.phone,
        University: row.University,
        usersId: user.id,
      });
    } else {
      const result = await internRepository.create({
        email: row.email,
        experiences: row.experiences,
        fullName: row.fullName,
        major: row.major,
        phone: row.phone,
        University: row.University,
        usersId: user.id,
      });
    }
  }

  console.log('Create intern successful')
}
