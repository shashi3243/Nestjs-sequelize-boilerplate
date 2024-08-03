import { Module } from '@nestjs/common';
import { ResponseHandler } from './responseHandlre.service';

@Module({
  imports: [],
  providers: [ResponseHandler],
  exports: [ResponseHandler],
})
export class CommonServiceModule {}
