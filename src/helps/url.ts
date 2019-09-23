import { isDate, isPlainObject } from './util';

/*
 * @Description: file content
 * @Author: drank
 * @Date: 2019-09-20 22:21:07
 * @LastEditTime: 2019-09-23 22:31:22
 */

export function encode(param: string): string {
  return encodeURIComponent(param)
    .replace(/%40/g, '@')
    .replace(/%3A/ig, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/ig, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/ig, '[')
    .replace(/%5D/ig, ']');
}

export function buildURL(url: string, params?: any): string {
  if (!params) return url;
  
  const parts: string[] = [] ;
  const keys = Object.keys(params);
  
  keys.forEach(key => {
    const val: any = params[key];

    if (val === null || typeof val === 'undefined') return;
    let values: any[];

    if (Array.isArray(val)) {
      values = val;
      key += '[]';
    } else {
      values = [val];
    }

    values.forEach(v => {
      if (isDate(v)) {
        v = v.toISOString();
      } else if (isPlainObject(v)) {
        v = JSON.stringify(v);
      }
      parts.push(`${encode(key)}=${encode(v)}`);
    })
  });
  let serializedParams = parts.join('&');

  if (serializedParams) {
    const markIndex = url.indexOf('#');

    if (markIndex !== -1) {
      url = url.slice(0, markIndex);
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }
  
  return url;
}