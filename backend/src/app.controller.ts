import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public, CurrentUser } from './auth';
import type { JwtPayload } from './types/request.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


}
