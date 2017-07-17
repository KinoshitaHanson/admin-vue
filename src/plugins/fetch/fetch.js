import axios from 'axios';

let baseUrl = process.env == 'production' ? 'product' : 'dev';
console.log(baseUrl, process.env);
const service = axios.create({
  baseURL: baseUrl,
  timeout: 30000,
  headers: {
    'authority': 'foobar' //TODO:
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
  return config
}, error => {
  return Promise.reject(error);
})

export default {
  install: function (Vue, options) {
    Vue.prototype.$fetch = service;
  }
}
