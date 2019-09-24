import request from '@/service/api';
/*
 * @Description: file content
 * @Author: drank
 * @Date: 2019-09-19 22:41:04
 * @LastEditTime: 2019-09-24 23:15:35
 */
type Method = 'get' | 'GET'
  | 'post' | 'POST'
  | 'delete' | 'DELETE'
  | 'put' | 'PUT'
  | 'options' | 'OPTIONS'
  | 'patch' | 'PATCH'
  | 'head' | 'HEAD';

export interface AxiosRequestConfig {
  url: string;
  method?: Method;
  headers?: any;
  data?: any;
  params?: any;
  timeout?: number;
  responseType?: XMLHttpRequestResponseType
}

export interface AxiosResponse {
  data: any;
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequestConfig;
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