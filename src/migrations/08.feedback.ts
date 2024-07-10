import fs from 'fs';
import yaml from 'js-yaml';
import {ImsApiApplication} from '../application';
import {Role} from '../common/type';
import {FeedbackRepository, InternRepository, TrainingProgramRepository, UsersRepository} from '../repositories';

export default async function (app: ImsApiApplication) {
  const feedbackRepository = await app.getRepository(FeedbackRepository)
  const usersRepository = await app.getRepository(UsersRepository)
  const internRepository = await app.getRepository(InternRepository)
  const trainingProgramRepository = await app.getRepository(TrainingProgramRepository)

  let content: string = fs.readFileSync('./src/migrations/08.feedback.yml', 'utf8')
  let rows = yaml.load(content) as any;

  for (let row of rows) {

    let user = await usersRepository.findOne({where: {username: row.username}});
    if (user?.rolesId !== Role.Mentor) {
      console.log('User is not mentor')
      return
    }

    let intern = await internRepository.findOne({where: {email: row.intern}});
    if (!intern) {
      console.log('Intern not found')
      return
    }

    let trainingProgram = await trainingProgramRepository.findOne({where: {code: row.trainingProgramCode}});
    if (!trainingProgram) {
      console.log('Training program not found')
      return
    }

    let feedback = await feedbackRepository.findOne({where: {id: row.id}});
    if (feedback) {
      let result = await feedbackRepository.updateById(feedback.id, {
        feedbackText: row.feedbackText,
        internId: intern.id,
        rating: row.rating,
        trainingProgramId: trainingProgram.id,
        usersId: user.id,
      });
      console.log('update feedback', result);
    } else {
      let result = await feedbackRepository.create({
        feedbackText: row.feedbackText,
        rating: row.rating,
        internId: intern.id,
        trainingProgramId: trainingProgram.id,
        usersId: user.id,
      });
      console.log('create feedback', result);
    }
  }

  console.log('Create feedback successful')
}
