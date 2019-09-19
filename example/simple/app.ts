/*
 * @Description: file content
 * @Author: drank
 * @Date: 2019-09-19 23:37:00
 * @LastEditTime: 2019-09-20 00:05:32
 */
import axios from '../../src/index';
axios({
  method: 'get',
  url: '/simple/get',
  params: {
    a: 1,
    b: 2
  }
})