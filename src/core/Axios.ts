/*
 * @Description: file content
 * @Author: drank
 * @Date: 2019-09-24 23:46:31
 * @LastEditTime: 2019-09-26 07:28:05
 */
import { AxiosRequestConfig, AxiosResponse, AxiosPromise, Method, ResolvedFn, RejectedFn } from '../types/index';
import dispatchRequest from './dispatchRequest';
import InterceptorManager from './interceptorManager';
import mergeConfig from './mergeConfig';

interface Interceptor {
  request: InterceptorManager<AxiosRequestConfig>;
  response: InterceptorManager<AxiosResponse>;
}

interface PromiseChain<T> {
  resolved: ResolvedFn<T> | ((config: AxiosRequestConfig) => AxiosPromise);
  rejected?: RejectedFn
}
export default class Axios {
  defaults: AxiosRequestConfig;
  interceptors: Interceptor;

  constructor(initCoinfg: AxiosRequestConfig) {
    this.defaults = initCoinfg;
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponse>()
    }
  }

  request(url: any, config?: any): AxiosPromise {
    if (typeof url === 'string') {
      if (!config) config = {};
      config.url = url;
    } else {
      config = url;
    }

    config = mergeConfig(this.defaults, config);

    const chain: PromiseChain<any>[] = [{
      resolved: dispatchRequest,
      rejected: undefined
    }];

    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor);
    });

    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor);
    });

    let promise = Promise.resolve(config);

    while (chain.length) {
      const { resolved, rejected } = chain.shift()!;

      promise.then(resolved, rejected);
    }

    return promise;
    // return dispatchRequest(config);
  }
  
  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
   return this._requestMethodWithoutData('get', url, config);
  }

  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('delete', url, config);
  }

  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('head', url, config);
  }

  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithoutData('options', url, config);
  }

  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('post', url, data, config);
  }

  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('put', url, data, config);
  }

  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithData('patch', url, data, config);
  }

  _requestMethodWithoutData(method: Method, url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.request(Object.assign(config || {}, { method, url }));
  }

  _requestMethodWithData(method: Method, url: string, data?: any, config?: AxiosRequestConfig) {
    return this.request(Object.assign(config || {}, {
      method,
      url,
      data 
    }));
  }
}