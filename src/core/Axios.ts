/*
 * @Description: file content
 * @Author: drank
 * @Date: 2019-09-24 23:46:31
 * @LastEditTime: 2019-09-24 23:54:59
 */
import { AxiosRequestConfig, AxiosPromise } from '../types';
import dispatchRequest from './dispatchRequest';

export default class Axios {
  request(config: AxiosRequestConfig): AxiosPromise {
    return dispatchRequest(config);
  }
  
  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    throw new Error("Method not implemented.");
  }

  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    throw new Error("Method not implemented.");
  }

  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    throw new Error("Method not implemented.");
  }

  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    throw new Error("Method not implemented.");
  }

  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    throw new Error("Method not implemented.");
  }

  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    throw new Error("Method not implemented.");
  }

  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    throw new Error("Method not implemented.");
  }
}