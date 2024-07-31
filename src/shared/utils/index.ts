import { ICustomReqInterface, Language } from '../interface';
import { en, hi } from '../language';

const language: Language = {
  en,
  hi,
};

/**
 * Function For Translating message
 * @param {object} req
 * @param {boolean} _data
 * @param {string} key
 * @returns {string}
 */
export const getMessage = (
  req: ICustomReqInterface,
  _data: boolean,
  key: string
): string => {
  let languageCode: string | undefined = req?.headers && req?.headers?.language;
  languageCode = languageCode ?? 'en';
  const condition = language[languageCode] && language[languageCode][key];
  return condition ? language[languageCode][key] : key;
};

/**
 * Function For Convert Object Into String
 * @param {object} obj
 * @returns {string}
 */

export const jsonToString = (
  obj: object | string
): string | object | Error | undefined => {
  if (obj && typeof obj === 'object' && Object.keys(obj).length !== 0) {
    return JSON.stringify(obj) as string;
  }
  return Object.keys(obj).length === 0 ? String(obj) : obj;
};
