import { AxiosRequestConfig } from './types';
import xhr from './xhr';

/*
 * @Description: file content
 * @Author: drank
 * @Date: 2019-09-19 21:57:22
 * @LastEditTime: 2019-09-19 23:02:03
 */
function axios(config: AxiosRequestConfig): void {
  xhr(config);
}

export default axios;