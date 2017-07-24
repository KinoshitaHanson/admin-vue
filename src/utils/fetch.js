import axios from 'axios';




const service = axios.create({
    baseURL: baseUrl,
    timeout: timeout,
    headers: {
        'authorization': token
    }
});

service.form = function (url, param) {
    return service({
        url: url,
        method: 'post',
        data: param,
        transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }],
        timeout: timeout,
        headers: {
            'authorization': token,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}


//请求拦截器
service.interceptors.request.use(config => {
    for (var key in config.params) {
        if (config.params.hasOwnProperty(key)) {
            if (!config.params[key]) {
                delete config.params[key];
            }
        }
    }

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


export default service;