import { ConfigProps } from '../interface';

export const config = (): ConfigProps => ({
  app: {
    port: Number(process.env.APP_PORT),
    baseUrl: String(process.env.BASE_URL),
    swaggerUrl: String(process.env.SWAGGER_HOST),
  },
  db: {
    dbDriver: String(process.env.DB_DRIVER),
    dbHost: String(process.env.DB_HOST),
    dbPort: Number(process.env.DB_PORT),
    dbUser: String(process.env.DB_USER),
    dbName: String(process.env.DB_NAME),
    dbPassword: String(process.env.DB_PASSWORD),
  },
  jwt: {
    jwtExpire: String(process.env.JWT_EXPIRE),
    jwtSecret: String(process.env.SECRET_KEY),
  },
  nodemailer: {
    userEmail: String(process.env.USER_EMAIL),
    userPassword: String(process.env.USER_PASSWORD),
    service: String(process.env.NODEMAILER_SERVICE),
    smtpHost: String(process.env.SMTP_HOST),
    smtpPort: Number(process.env.SMTP_PORT),
  },
  twilio: {
    twilioAccountSid: String(process.env.ACCOUNT_SID),
    twilioAuthToken: String(process.env.AUTH_TOKEN),
    twilioPhoneNumber: String(process.env.TWILLIO_PHONE_NUMBER),
  },
});
