import { Module } from '@nestjs/common';
import { CommonServiceModule } from '../../shared/service';
import { HealthCheckController } from './healthCheck.contoller';
import { HealthCheckService } from './healthCheck.service';

@Module({
  imports: [CommonServiceModule],
  controllers: [HealthCheckController],
  providers: [HealthCheckService],
})
export class HealthCheckModule {}
