import { AxiosRequestConfig } from './types/index';

const defaults: AxiosRequestConfig = {
  method: 'get',

  timeout: 10000,

  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  }
}

const methodNoData = ['delete', 'get', 'head', 'options'];

methodNoData.forEach(method => {
  defaults.headers[method] = {};
});

const methodWidthData = ['post', 'put', 'patch'];

methodWidthData.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});

export default defaults;