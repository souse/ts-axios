/*
 * @Description: file content
 * @Author: drank
 * @Date: 2019-09-23 22:14:25
 * @LastEditTime: 2019-09-24 00:28:44
 */
import axios from '../../src/index';

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     foo: {
//       bar: 'baz'
//     }
//   }
// })

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     arr: ['1', '2']
//   }
// })

// const date = new Date();

// axios({
//   method: 'get',
//   url: '/base/get',
//   params: {
//     date
//   }
// })

axios({
  method: 'post',
  url: '/base/post',
  data: {
    foo: 1,
    bar: 2
  }
}).then(res => {
  console.log(res);
})

axios({
  method: 'post',
  url: '/base/post',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  responseType: 'json',
  data: {
    a: 1,
    b: 2
  }
}).then(res => {
  console.log(res);
})