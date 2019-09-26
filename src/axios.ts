import { AxiosInstance } from './types';
import Axios from './core/Axios';
import { extend } from './helps/util';
/*
 * @Description: file content
 * @Author: drank
 * @Date: 2019-09-24 23:31:41
 * @LastEditTime: 2019-09-26 07:11:47
 */

function createInstance(): AxiosInstance {
  const context = new Axios();
  const instance = Axios.prototype.request.bind(context);

  extend(instance, context);

  return instance as AxiosInstance;
}

const axios = createInstance();

export default axios;