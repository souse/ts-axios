/*
 * @Description: file content
 * @Author: drank
 * @Date: 2019-09-20 22:20:16
 * @LastEditTime: 2019-09-26 07:04:06
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

export function extend<T, U>(to: T, from: U): T & U {
  for (let key in from) {
    ;(to as T & U)[key] = from[key] as any;
  }

  return to as T & U;
}

export function deepMerge(...objs: any[]): any {
  const result = Object.create(null);
  
  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key];

        if (isPlainObject(val)) {
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val);
          } else {
            result[key] = deepMerge(val);
          } 
        } else {
          result[key] = val;
        }
      })
    }
  });
  return result;
}