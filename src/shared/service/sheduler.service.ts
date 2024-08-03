import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { loggerService } from '../helper';

@Injectable()
export class CronjobsService {
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  checkCronJob(): void {
    loggerService.consoleLog().info(JSON.stringify('cron working at 12 am'));
  }
}
