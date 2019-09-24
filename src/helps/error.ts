import { AxiosRequestConfig, AxiosResponse } from '../types/index';
import request from '@/service/api';
/*
 * @Description: file content
 * @Author: drank
 * @Date: 2019-09-24 23:16:00
 * @LastEditTime: 2019-09-24 23:26:03
 */

export class AxiosError extends Error{
  isAxiosError: boolean;
  config: AxiosRequestConfig;
  code?: string | null;
  request?: any;
  reponse?: AxiosResponse

  constructor(
    message: string, 
    config: AxiosRequestConfig, 
    code: string | null,
    request?: any,
    response?: AxiosResponse
  ) {
    super(message);

    this.config = config;
    this.code = code;
    this.request = request;
    this.request = response;
    this.isAxiosError = true;

    Object.setPrototypeOf(this, AxiosError.prototype);
  }
}

export function createError(
  message: string, 
  config: AxiosRequestConfig, 
  code: string | null,
  request?: any,
  response?: AxiosResponse
): any {
  const error = new AxiosError(message, config, code, request, response);

  return error;
}