import fs from 'fs';
import yaml from 'js-yaml';
import {ImsApiApplication} from '../application';
import {Role} from '../common';
import {TasksRepository, TrainingProgramRepository, UsersRepository} from '../repositories';

export default async function (app: ImsApiApplication) {
  const trainingProgramRepository = await app.getRepository(TrainingProgramRepository)
  const usersRepository = await app.getRepository(UsersRepository)
  const tasksRepository = await app.getRepository(TasksRepository)

  let content: string = fs.readFileSync('./src/migrations/05.tasks.yml', 'utf8')
  let rows = yaml.load(content) as any;

  for (let row of rows) {
    console.log('task', row);
    let user = await usersRepository.findOne({where: {username: row.username}});
    if (user?.rolesId !== Role.Mentor) {
      console.log('User is not mentor')
      return
    }

    let trainingProgram = await trainingProgramRepository.findOne({where: {code: row.trainingProgramId}});
    if (!trainingProgram) {
      console.log('Training program not found')
      return
    }

    let task = await tasksRepository.findOne({where: {name: row.name}});
    if (task) {
      await tasksRepository.updateById(task.id, {
        name: row.name,
        description: row.description,
        trainingProgramId: trainingProgram.id,
        usersId: user.id,
      });
    } else {
      const result = await tasksRepository.create({
        name: row.name,
        description: row.description,
        trainingProgramId: trainingProgram.id,
        usersId: user.id,
      });
    }
  }

  console.log('Create task successful')
}
