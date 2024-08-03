import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { SuccessResponse } from '../../shared/interface';
import { HealthCheckService } from './healthCheck.service';

@Controller()
export class HealthCheckController {
  constructor(public healthCheckService: HealthCheckService) {}

  @Get('/healthCheck')
  public healthCheck(): SuccessResponse<null> {
    try {
      return this.healthCheckService.getHealthCheck();
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      } else {
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
