import { AxiosInstance } from './types';
import Axios from './core/Axios';
import { extend } from './helps/util';
import defaults from './defaults';
import { AxiosRequestConfig, AxiosStatic } from './types/index';
import mergeConfig from './core/mergeConfig';
/*
 * @Description: file content
 * @Author: drank
 * @Date: 2019-09-24 23:31:41
 * @LastEditTime: 2019-09-26 07:11:47
 */

function createInstance(config: AxiosRequestConfig): AxiosStatic {
  const context = new Axios(config);
  const instance = Axios.prototype.request.bind(context);

  extend(instance, context);

  return instance as AxiosStatic;
}

const axios = createInstance(defaults);

axios.create = function create(config) {
  return createInstance(mergeConfig(defaults, config));
}

export default axios;