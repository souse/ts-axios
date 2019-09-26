/*
 * @Description: file content
 * @Author: drank
 * @Date: 2019-09-19 22:41:04
 * @LastEditTime: 2019-09-26 07:25:19
 */
export type Method = 'get' | 'GET'
  | 'post' | 'POST'
  | 'delete' | 'DELETE'
  | 'put' | 'PUT'
  | 'options' | 'OPTIONS'
  | 'patch' | 'PATCH'
  | 'head' | 'HEAD';

export interface AxiosRequestConfig {
  url?: string;
  method?: Method;
  headers?: any;
  data?: any;
  params?: any;
  timeout?: number;
  responseType?: XMLHttpRequestResponseType
}

export interface AxiosResponse {
  data?: any;
  status?: number;
  statusText?: string;
  headers?: any;
  config?: AxiosRequestConfig;
  request?: any
}

export interface AxiosPromise extends Promise<AxiosResponse> {}

export interface AxiosError extends Error {
  config: AxiosRequestConfig;
  code?: string;
  request?: any;
  response?: AxiosResponse;
  isAxiosError?: boolean;
}

export interface Axios {
  request(config: AxiosRequestConfig): AxiosPromise;
  get(url: string, config?: AxiosRequestConfig): AxiosPromise;
  delete(url: string, config?: AxiosRequestConfig): AxiosPromise;
  head(url: string, config?: AxiosRequestConfig): AxiosPromise;
  options(url: string, config?: AxiosRequestConfig): AxiosPromise;
  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise;
  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise;
  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise;
}

export interface AxiosInstance extends Axios {
  (config: AxiosRequestConfig): AxiosPromise;
  (url?: string, config?: AxiosRequestConfig): AxiosPromise;
}