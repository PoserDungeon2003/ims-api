import fs from 'fs';
import yaml from 'js-yaml';
import {ImsApiApplication} from '../application';
import {TrainingProgramRepository, UsersRepository} from '../repositories';

export default async function (app: ImsApiApplication) {
  const trainingProgramRepository = await app.getRepository(TrainingProgramRepository)
  const usersRepository = await app.getRepository(UsersRepository)

  let content: string = fs.readFileSync('./src/migrations/02.trainingprogram.yml', 'utf8')
  let rows = yaml.load(content) as any;

  for (let row of rows) {
    console.log(row);

    let user = await usersRepository.findOne({where: {fullName: row.createdBy}});
    if (user?.rolesId !== 2) {
      console.log('User is not coordinator')
      return
    }

    let trainingProgram = await trainingProgramRepository.findOne({where: {code: row.code}});
    if (trainingProgram) {
      await trainingProgramRepository.updateById(trainingProgram.id, {
        ...row,
        coordinatorId: user.id
      });
    } else {
      await trainingProgramRepository.create({
        ...row,
        coordinatorId: user.id
      });
    }
  }

  console.log('Create training program successful')
}
