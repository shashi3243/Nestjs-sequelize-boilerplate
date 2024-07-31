import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { config, databaseProvider } from './shared/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`],
      cache: true,
      load: [config],
    }),
  ],
  controllers: [],
  providers: [...databaseProvider],
})
export class AppModule {}
