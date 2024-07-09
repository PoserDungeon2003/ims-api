import fs from 'fs';
import yaml from 'js-yaml';
import {ImsApiApplication} from '../application';
import {ApplicationRepository} from '../repositories';

export default async function (app: ImsApiApplication) {
  const applicationRepository = await app.getRepository(ApplicationRepository)

  let content: string = fs.readFileSync('./src/migrations/07.application.yml', 'utf8')
  let rows = yaml.load(content) as any;

  for (let row of rows) {
    console.log('application', row);

    let application = await applicationRepository.findOne({where: {id: row.id}});
    if (application) {
      await applicationRepository.updateById(application.id, {
        appliedTo: row.appliedTo,
        coverLetter: row.coverLetter,
        email: row.email,
        fullName: row.fullName,
        phone: row.phone,
        resume: row.resume,
        status: row.status,
      });
    } else {
      await applicationRepository.create({
        appliedTo: row.appliedTo,
        coverLetter: row.coverLetter,
        email: row.email,
        fullName: row.fullName,
        phone: row.phone,
        resume: row.resume,
        status: row.status,
      });
    }
  }

  console.log('Create application successful')
}
