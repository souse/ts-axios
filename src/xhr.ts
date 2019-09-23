import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types/index';
import { parseHeaders } from './helps/headers';
/*
 * @Description: file content
 * @Author: drank
 * @Date: 2019-09-19 22:51:07
 * @LastEditTime: 2019-09-24 00:35:11
 */

export  default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise(resolve => {
    const { data = null, url, method = 'get', headers, responseType } = config;
    const request = new XMLHttpRequest();

    if (responseType) {
      request.responseType = responseType;
    }
    request.open(method.toUpperCase(), url, true);
    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) return;

      const responseHeaders = parseHeaders(request.getAllResponseHeaders());
      const responseData = responseType !== 'text' ? request.response : request.responseText;
      
      const response: AxiosResponse = {
          data: responseData,
          status: request.status,
          statusText: request.statusText,
          headers: responseHeaders,
          config,
          request
      }

      resolve(response);
    }

    Object.keys(headers).forEach(name => {
      if (data === null && name.toLocaleLowerCase() === 'content-type') {
        delete headers[name];
      } else {
        console.log('header name: ', name);
        request.setRequestHeader(name, headers[name]);
      }
    });
    request.send(data);
  });
}