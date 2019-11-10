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
  responseType?: XMLHttpRequestResponseType;
  transformRequest?: AxiosTransFormer | AxiosTransFormer[];
  transformResponse?: AxiosTransFormer | AxiosTransFormer[];
  cancelToken?: CancelToken

  [propName: string]: any;
}

export interface AxiosResponse<T = any> {
  data?: T;
  status?: number;
  statusText?: string;
  headers?: any;
  config?: AxiosRequestConfig;
  request?: any
}

export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}

export interface AxiosError extends Error {
  config: AxiosRequestConfig;
  code?: string;
  request?: any;
  response?: AxiosResponse;
  isAxiosError?: boolean;
}

export interface Axios {
  defaults: AxiosRequestConfig;

  interceptors: {
    request: AxiosInterceptorManger<AxiosRequestConfig>;
    response: AxiosInterceptorManger<AxiosResponse>
  }

  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>;
  
  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
  
  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
  
  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
  
  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
  
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;
  
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;
  
  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>;
}

export interface AxiosInstance extends Axios {
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>;
  <T = any>(url?: string, config?: AxiosRequestConfig): AxiosPromise<T>;
}

export interface AxiosStatic extends AxiosInstance {
  create(config?: AxiosRequestConfig): AxiosInstance;
}

export interface AxiosInterceptorManger<T> {
  use(resolve: ResolvedFn<T>, reject?: RejectedFn): number;
  eject(id: number): void;
}

export interface ResolvedFn<T> {
  (val: T): T | Promise<T>;
}

export interface RejectedFn {
  (error: any): any
}

export interface AxiosTransFormer {
  (data: any, header: any): any; 
}

export interface CancelToken {
  promise: Promise<string>;
  reason?: string;
}

export interface Canceler {
  (message?: string): void;
}

export interface CancelExecutor {
  (cancel: Canceler): void;
}

export interface CancelTokenSource {
  token: CancelToken;
  cancel: Canceler
}

export interface CancelTokenStatic {
  new(executor: CancelExecutor): CancelToken;
  source(): CancelTokenSource;
}