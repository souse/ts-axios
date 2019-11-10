import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types/index';
import { parseHeaders } from '../helps/headers';
import { createError } from '../helps/error';
/*
 * @Description: file content
 * @Author: drank
 * @Date: 2019-09-19 22:51:07
 * @LastEditTime: 2019-09-25 00:10:06
 */

export  default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers, responseType, timeout, cancelToken } = config;
    const request = new XMLHttpRequest();

    if (responseType) request.responseType = responseType;
    if (timeout) request.timeout = timeout;

    request.open(method.toUpperCase(), url, true);
    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) return;
      if (request.status === 0) return; // 网络错误; 超时

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

      handleResponse(response);
    }
    request.ontimeout = function handleTimeout() {
      reject(createError(`Request timeout outtime is ${timeout}`, config, null, request, null));
    }
    request.onerror = function handleError() {
      reject(createError('Network Error...', config, 'ECONNABORTED', request, null));
    }

    Object.keys(headers).forEach(name => {
      if (data === null && name.toLocaleLowerCase() === 'content-type') {
        delete headers[name];
      } else {
        console.log('header name: ', name);
        request.setRequestHeader(name, headers[name]);
      }
    });

    if (cancelToken) {
      cancelToken.promise.then(reason => {
        request.abort();
        reject(reason);
      });
    }

    request.send(data);

    function handleResponse(res: AxiosResponse): void {
      if (res.status >= 200 && res.status < 300) {
        resolve(res);
      } else {
        reject(createError(`Request fail with status ${res.status}`, config, null, request, res));
      }
    }
  });
}