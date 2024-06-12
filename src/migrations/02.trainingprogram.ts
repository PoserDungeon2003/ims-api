import fs from 'fs';
import yaml from 'js-yaml';
import {ImsApiApplication} from '../application';
import {TrainingProgramRepository} from '../repositories';

export default async function (app: ImsApiApplication) {
  const trainingProgramRepository = await app.getRepository(TrainingProgramRepository)

  let content: string = fs.readFileSync('./src/migrations/02.trainingprogram.yml', 'utf8')
  let rows = yaml.load(content) as any;

  for (let row of rows) {
    console.log(row);

    let role = await trainingProgramRepository.findOne({where: {code: row.code}});
    if (role) {
      await trainingProgramRepository.updateById(role.id, row);
    } else {
      await trainingProgramRepository.create(row);
    }
  }

  console.log('Create training program successful')
}
