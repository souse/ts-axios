/*
 * @Description: file content
 * @Author: drank
 * @Date: 2019-09-19 22:41:04
 * @LastEditTime: 2019-09-20 00:05:07
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
  data?: any;
  params?: any;
}