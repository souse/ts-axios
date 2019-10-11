/*
 * @Description: file content
 * @Author: drank
 * @Date: 2019-09-23 22:14:25
 * @LastEditTime: 2019-09-26 07:17:35
 */
import axios from '../../src/index';

axios.get('/base/get', {
  params: {
    foo: {
      bar: 'baz'
    }
  }
});


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

// axios({
//   method: 'post',
//   url: '/base/post',
//   data: {
//     foo: 1,
//     bar: 2
//   }
// }).then(res => {
//   console.log(res);
// })

// axios({
//   method: 'post',
//   url: '/base/post',
//   headers: {
//     'Content-Type': 'application/json;charset=utf-8'
//   },
//   responseType: 'json',
//   data: {
//     a: 1,
//     b: 2
//   }
// }).then(res => {
//   console.log(res);
// })
interface ResponseData<T = any> {
  code: number;
  result: T;
  message: string;
}

interface User {
  name: string;
  age: number;
}

export function getUser<T>() {
  return axios.get<ResponseData<T>>('/base/get')
    .then(res => res.data);
}

async function test() {
  const user = await getUser<User>();

  console.log(user.result.name);
  
}