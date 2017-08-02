import axios from 'axios';
import store from '../store';
import log from 'utils/log';

let baseUrl = process.env.API_ROOT;
let timeout = 30000;

const service = axios.create({
    baseURL: baseUrl,
    timeout: timeout
});

/**
 * form请求
 * @param url
 * @param data
 */
service.form = function (url, data) {
    return service({
        url: url,
        method: 'post',
        data,
        transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }],
        timeout: timeout,
        headers: {
            'authorization': store.getters.token,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

//请求拦截器
service.interceptors.request.use(config => {
    for (var key in config.params) {
        if (config.params.hasOwnProperty(key)) {
            if (config.params[key]===undefined||config.params[key]===null||config.params[key]==='') {
                delete config.params[key];
            }
        }
    }

    if (store.getters.token) {
        config.headers['authorization'] = store.getters.token; // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
    }
    // log.writeNormalLog('api-log',config,'info');
    return config
}, error => {
    log.writeExLog(error,'请求异常');
    return Promise.reject(error);
});

//响应拦截器
service.interceptors.response.use(config => {
    return config.data;
}, error => {
    log.writeExLog(error,'响应异常');
    return Promise.reject(error);
})


export default service;