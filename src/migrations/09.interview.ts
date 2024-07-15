import fs from 'fs';
import yaml from 'js-yaml';
import {ImsApiApplication} from '../application';
import {Role} from '../common';
import {ApplicationRepository, InterviewRepository, UsersRepository} from '../repositories';

export default async function (app: ImsApiApplication) {
  const usersRepository = await app.getRepository(UsersRepository)
  const applicationRepository = await app.getRepository(ApplicationRepository)
  const interviewRepository = await app.getRepository(InterviewRepository)

  let content: string = fs.readFileSync('./src/migrations/09.interview.yml', 'utf8')
  let rows = yaml.load(content) as any;

  for (let row of rows) {

    let user = await usersRepository.findOne({where: {username: row.username}});
    if (user?.rolesId !== Role.HRManager) {
      console.log('User is not HRManager')
      return
    }

    let application = await applicationRepository.findById(row.applicationId);
    if (!application) {
      console.log('Application not found')
      return
    }

    let interview = await interviewRepository.findOne({
      where: {
        id: row.id
      }
    });

    if (interview) {
      await interviewRepository.updateById(interview.id, {
        intervieweeName: row.intervieweeName,
        time: row.time,
        applicationId: application.id,
        usersId: user.id,
        quiz: row.quiz,
        status: row.status,
        location: row.location,
      });
    } else {
      let result = await interviewRepository.create({
        intervieweeName: row.intervieweeName,
        time: row.time,
        applicationId: application.id,
        usersId: user.id,
        quiz: row.quiz,
        status: row.status,
        location: row.location,
      });
      console.log('create interview', result);
    }
  }

  console.log('Create interview successful')
}
