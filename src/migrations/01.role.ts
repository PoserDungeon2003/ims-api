import fs from 'fs';
import yaml from 'js-yaml';
import {ImsApiApplication} from '../application';
import {RolesRepository} from '../repositories';

export default async function (app: ImsApiApplication) {
  const roleRepository = await app.getRepository(RolesRepository) as RolesRepository;

  let content: string = fs.readFileSync('./src/migrations/01.role.yml', 'utf8')
  let rows = yaml.load(content) as any;

  for (let row of rows) {
    console.log(row);

    let role = await roleRepository.findOne({where: {name: row.name}});
    if (role) {
      await roleRepository.updateById(role.id, row);
    } else {
      await roleRepository.create(row);
    }
  }

  console.log('Create role successful')
}
