import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { ConfigProps } from './shared/interface';
import { commonMessage } from './shared/logMessage';
import { LoggingInterceptor, GlobalExceptionFilter } from './shared/helper';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<ConfigProps>);
  const { port } = configService.get('app');
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalFilters(new GlobalExceptionFilter());
  await app.listen(port, () => {
    commonMessage.loggerInfoMessage('listen', {
      error: null,
      port: Number(port),
    });
  });
}
bootstrap();
