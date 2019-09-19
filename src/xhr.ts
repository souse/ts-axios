import { AxiosRequestConfig } from './types/index';
/*
 * @Description: file content
 * @Author: drank
 * @Date: 2019-09-19 22:51:07
 * @LastEditTime: 2019-09-19 23:00:45
 */

export  default function xhr(config: AxiosRequestConfig): void {
  const { data = null, url, method = 'get'} = config;

  const request = new XMLHttpRequest()

  request.open(method.toUpperCase(), url, true);
  request.send(data);
}