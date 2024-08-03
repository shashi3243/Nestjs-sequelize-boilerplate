import { Request } from 'express';

export type Language = {
  [key: string]: { [key: string]: string };
};

export interface ICustomReqInterface extends Request {
  headers: Record<string, string | undefined> & {
    language?: string;
  };
}

export interface SuccessResponse<T> {
  success?: boolean;
  statusCode?: number;
  message: string;
  data?: T;
}
