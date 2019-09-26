/*
 * @Description: file content
 * @Author: drank
 * @Date: 2019-09-23 22:54:55
 * @LastEditTime: 2019-09-26 07:21:41
 */
import { isPlainObject } from './util';

function normalizeHeader(headers: any, normalizeName: string): void {
  if (!headers) return;
  Object.keys(headers).forEach(name => {
    if (name !== normalizeName && name.toUpperCase() !== normalizeName.toUpperCase()) {
      headers[normalizeName] = headers[name];
      delete headers[name];
    }
  })
}

export function processHeaders(headers: any, data?: any):any {
  normalizeHeader(headers, 'Content-Type');
  
  if (data !== undefined && isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8';
    }
  }

  return headers;
}

export function parseHeaders(headers: string): any {
  let parsed = Object.create(null);

  if (!headers) return parsed;

  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':');

    key = key.trim().toLowerCase();
    if (!key) return;
    if (val) {
      parsed[key] = val;
    }
  });

  return parsed;
}