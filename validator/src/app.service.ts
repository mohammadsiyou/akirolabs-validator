import { Injectable } from '@nestjs/common';
import { isValidLuhn } from './utils/isValidLuhn';

@Injectable()
export class AppService {
  validate(token: string): boolean {
    return isValidLuhn(token.split('-').join(''));
  }
}
