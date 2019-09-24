/*
 * @Description: file content
 * @Author: drank
 * @Date: 2019-09-20 22:20:16
 * @LastEditTime: 2019-09-23 22:30:31
 */
const tostring = Array.prototype.toString;

export function isObject(val: any): val is Object {
  return val !== null && typeof val === 'object';
}

export function isPlainObject(val: any): val is Object {
  return tostring.call(val) === '[object Object]';
}

export function isDate(val: any): val is Date {
  return tostring.call(val) === '[object Date]';
}

export function getSearchByName(name: string): string {
  const match = RegExp(`[?&]${name}=([^&]*)`).exec(window.location.href);

  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}


