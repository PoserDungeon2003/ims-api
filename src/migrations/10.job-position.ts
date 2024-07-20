import fs from 'fs';
import yaml from 'js-yaml';
import {ImsApiApplication} from '../application';
import {Role} from '../common';
import {JobPositionRepository, UsersRepository} from '../repositories';

export default async function (app: ImsApiApplication) {
  const usersRepository = await app.getRepository(UsersRepository)
  const jobPositionRepository = await app.getRepository(JobPositionRepository)

  let content: string = fs.readFileSync('./src/migrations/10.job-position.yml', 'utf8')
  let rows = yaml.load(content) as any;

  for (let row of rows) {

    let user = await usersRepository.findOne({where: {username: row.username}});
    if (user?.rolesId !== Role.HRManager) {
      console.log('User is not HRManager')
      return
    }

    let jobPosition = await jobPositionRepository.findOne({
      where: {
        id: row.id
      }
    });

    if (jobPosition) {
      await jobPositionRepository.updateById(jobPosition.id, {
        description: row.description,
        name: row.name,
        usersId: user.id,
        status: row.status,
      });
    } else {
      let result = await jobPositionRepository.create({
        description: row.description,
        name: row.name,
        usersId: user.id,
        status: row.status,
      });
      console.log('create job position', result);
    }
  }

  console.log('Create job position successful')
}
