import * as fs from 'fs';
import path from 'path';
import { Injectable } from '@nestjs/common';
import { ICustomReqInterface, Language } from '../interface';
import { en, hi } from '../language';

@Injectable()
export class UtilService {
  public language: Language = {
    en,
    hi,
  };
  /**
   * Function For Convert Object Into String
   * @param {object} obj
   * @returns {string}
   */

  public jsonToString(
    obj: object | string
  ): string | object | Error | undefined {
    if (obj && typeof obj === 'object' && Object.keys(obj).length !== 0) {
      return JSON.stringify(obj) as string;
    }
    return Object.keys(obj).length === 0 ? String(obj) : obj;
  }

  /**
   * Function For Check the Directory Is Empty
   * @param {string} directoryPath
   * @returns {boolean}
   */
  public isDirectoryEmpty(directoryPath: string): boolean {
    try {
      const files = fs.readdirSync(directoryPath);
      return files.length === 0;
    } catch (error) {
      return false; // Handle the error as per your requirement
    }
  }

  /**
   * Function For return directory path exclude dist directory
   * @param {string} directoryPath
   * @returns {boolean}
   */
  public resolveSrcPath(...args: string[]): string {
    return path.join(__dirname, '../../../../', 'src', ...args);
  }

  public getMessage(
    req: ICustomReqInterface,
    _data: boolean,
    key: string
  ): string {
    let languageCode: string | undefined =
      req?.headers && req?.headers?.language;
    languageCode = languageCode ?? 'en';
    const condition =
      this.language[languageCode] && this.language[languageCode][key];
    return condition ? this.language[languageCode][key] : key;
  }

  /**
   * Extracts the error string from an error object or stack trace.
   * @param {*} err - The error object or stack trace.
   * @param {string} [defaultMessage] - The default message to return if the extraction fails.
   * @returns {string} - The extracted error string.
   */
  public getErrorString(err: string): Error | string {
    const errStack = (err || '').split('\n');
    if (errStack.length > 0) {
      return (errStack[0] || '')?.split(':').pop();
    }
    return err;
  }
}
