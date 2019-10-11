import { AxiosRequestConfig } from './types/index';
import { processHeaders } from './helps/headers';
import { transformRequest, transformResponse } from './helps/data';

const defaults: AxiosRequestConfig = {
  method: 'get',

  timeout: 10000,

  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  },
  transformRequest: [
    function(data: any, headers: any): any {
      processHeaders(headers, data);
      return transformRequest(data);
    }
  ],
  transformResponse: [
    function(data: any): any {
      return transformResponse(data);
    }
  ]
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