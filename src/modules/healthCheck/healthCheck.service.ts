import { Injectable } from '@nestjs/common';
import { SuccessResponse } from '../../shared/interface';
import { ResponseHandler } from '../../shared/service/responseHandlre.service';

@Injectable()
export class HealthCheckService {
  constructor(public successResponse: ResponseHandler) {}

  public getHealthCheck(): SuccessResponse<null> {
    return this.successResponse.success({
      message: 'Get Health Check Successfully.',
    });
  }
}
