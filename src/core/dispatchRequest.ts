import { AxiosRequestConfig, AxiosPromise } from '../types';
import xhr from './xhr';
import { buildURL } from '../helps/url';
import { transformRequest, transformResponse } from '../helps/data';
import { processHeaders, flattenHeaders } from '../helps/headers';
import { AxiosResponse } from '../types/index';
import transform from './transform';

/*
 * @Description: file content
 * @Author: drank
 * @Date: 2019-09-19 21:57:22
 * @LastEditTime: 2019-09-24 23:49:45
 */
export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config);
  return xhr(config).then(res => {
    return transformResponseData(res);
  })
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config);
  // config.headers = transfromHeaders(config);
  config.headers = transform(config.data, config.headers, config.transformRequest);
  if (config.data) {
    config.data = transformRequestData(config);
  }
  config.headers = flattenHeaders(config.headers, config.method!);
}

function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config;

  return buildURL(url, params);
}

function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data);
}

function transfromHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config;

  return processHeaders(headers, data);
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  // res.data = transformResponse(res.data);
  res.data = transform(res.data, res.headers, res.config.transformResponse);

  return res;
}