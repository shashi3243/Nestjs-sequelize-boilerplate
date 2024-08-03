import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { config, databaseProvider } from './shared/config';
import { CronjobsService } from './shared/service/sheduler.service';
import { UtilModules } from './shared/utils/util.module';
import { IndexModule } from './modules/index.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`],
      cache: true,
      load: [config],
    }),
    IndexModule,
    UtilModules,
    ScheduleModule.forRoot({ cronJobs: true }),
  ],
  controllers: [],
  providers: [...databaseProvider, CronjobsService],
})
export class AppModule {}
