/*
 * @Description: file content
 * @Author: drank
 * @Date: 2019-09-23 22:28:09
 * @LastEditTime: 2019-09-24 00:38:23
 */
import { isPlainObject } from './util';

export function transformRequest(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data);
  }
  return data;
}

export function transformResponse(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data);   
    } catch (error) {
      // haha  
    }
  }

  return data;
}