export interface IAppEnvironmentVariable {
  port: number;
  baseUrl: string;
  swaggerUrl: string;
}
export interface DatabaseEnvironmentVariable {
  dbDriver: string;
  dbHost: string;
  dbPort: number;
  dbUser: string;
  dbName: string;
  dbPassword: string;
}
export interface JwtEnvironmentVariable {
  jwtSecret: string;
  jwtExpire: string;
}
export interface TwilioEnvironmentVariable {
  twilioPhoneNumber: string;
  twilioAuthToken: string;
  twilioAccountSid: string;
}
export interface INodemailerEnvironmentVariable {
  userEmail: string;
  userPassword: string;
  service: string;
  smtpHost: string;
  smtpPort: number;
}

export interface ConfigProps {
  app: IAppEnvironmentVariable;
  db: DatabaseEnvironmentVariable;
  jwt: JwtEnvironmentVariable;
  twilio: TwilioEnvironmentVariable;
  nodemailer: INodemailerEnvironmentVariable;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      PORT: string;
      APP_PORT: string;
      DB_DRIVER: string;
      DB_HOST: string;
      DB_PORT: string;
      DB_USER: string;
      DB_NAME: string;
      DB_PASSWORD: string;
      SECRET_KEY: string;
      JWT_EXPIRE: string;
      USER_EMAIL: string;
      USER_PASSWORD: string;
      NODEMAILER_SERVICE: string;
      SWAGGER_HOST: string;
      BASE_URL: string;
      ACCOUNT_SID: string;
      AUTH_TOKEN: string;
      TWILIO_PHONE_NUMBER: string;
      CLASS_PATH: string;
      URL: string;
      ADMINPASSWORD: string;
      SMTP_HOST: string;
      SMTP_PORT: string;
    }
  }
}
