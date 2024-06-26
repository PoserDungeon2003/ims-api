import {injectable} from '@loopback/core';
import {compare, genSalt, hash} from 'bcryptjs';

@injectable()
export class PasswordHashService {
  async hashPassword(password: string): Promise<string> {
    const salt = await genSalt(10);
    return hash(password, salt);
  }

  async comparePassword(
    providedPass: string,
    storedPass: string,
  ): Promise<boolean> {
    return compare(providedPass, storedPass);
  }
}
