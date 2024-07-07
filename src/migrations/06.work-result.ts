import fs from 'fs';
import yaml from 'js-yaml';
import {ImsApiApplication} from '../application';
import {InternRepository, TrainingProgramRepository, WorkResultRepository} from '../repositories';

export default async function (app: ImsApiApplication) {
  const trainingProgramRepository = await app.getRepository(TrainingProgramRepository)
  const internRepository = await app.getRepository(InternRepository)
  const workResultRepository = await app.getRepository(WorkResultRepository)

  let content: string = fs.readFileSync('./src/migrations/06.work-result.yml', 'utf8')
  let rows = yaml.load(content) as any;

  for (let row of rows) {
    console.log('work_result', row);
    let intern = await internRepository.findOne({where: {username: row.username}});
    if (!intern) {
      console.log('Intern not found')
      return
    }

    let trainingProgram = await trainingProgramRepository.findOne({where: {code: row.trainingProgramId}});
    if (!trainingProgram) {
      console.log('Training program not found')
      return
    }

    let task = await workResultRepository.findOne({where: {id: row.id}});
    if (task) {
      await workResultRepository.updateById(task.id, {
        internId: intern.id,
        note: row.note,
        percentage: row.percentage,
        trainingProgramId: trainingProgram.id,
      });
    } else {
      await workResultRepository.create({
        internId: intern.id,
        note: row.note,
        percentage: row.percentage,
        trainingProgramId: trainingProgram.id,
      });
    }
  }

  console.log('Create work result successful')
}
