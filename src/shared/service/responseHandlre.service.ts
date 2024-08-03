import { Injectable } from '@nestjs/common';
import { SuccessResponse } from '../interface';

@Injectable()
export class ResponseHandler {
  success<T>(params: SuccessResponse<T>): SuccessResponse<T> {
    const { statusCode = 200, message, data = null } = params;
    return {
      success: true,
      statusCode,
      message,
      data,
    };
  }
}
