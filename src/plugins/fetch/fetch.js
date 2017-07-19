import axios from 'axios';

let baseUrl = process.env == 'production' ? 'product' : 'http://101.37.32.213:18080/dm';//TODO:
console.log(baseUrl, process.env);
const service = axios.create({
  baseURL: baseUrl,
  timeout: 30000,
  headers: {
    'authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiLnu5PooaPphbEiLCJjcmVhdGVkIjoxNTAwMjg1NzQ1MTg1LCJleHAiOjE1MDA4OTA1NDV9.VK-wdgh2W4srHmcU6EqlYCOapTbT7M2njTDdC6YWb2QRs-ft8te4yz8BX45WwgoEMAMJy07cBDZNDwQrL1cISQ' //TODO:
  }
});

//请求拦截器
service.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error);
});

//响应拦截器
service.interceptors.response.use(config => {
  return config.data;
}, error => {
  return Promise.reject(error);
})

export default {
  install: function (Vue, options) {
    Object.defineProperties(Vue.prototype, {'$fetch':{value:service,writable: true}});
    Vue.prototype.$fetch = service;
  }
}
