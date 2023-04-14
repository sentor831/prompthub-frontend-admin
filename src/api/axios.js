import axios from 'axios'
import _ from 'lodash'
import { refreshTokenReq } from '@/api/index.js'
import { getRefreshToken, getToken, setRefreshToken, setToken } from '@/utils/token.js'
import router from '../router';
// import { Spin } from 'iview'

axios.defaults.timeout = 5000;  // 超时时间设置
axios.defaults.withCredentials = true;  // true允许跨域

class HttpRequest {
    baseURL = '';
    constructor(baseUrl = baseURL) {
        this.baseUrl = baseUrl
        this.queue = {}
    }
    getInsideConfig() {
        const config = {
            baseURL: this.baseUrl,
            headers: {
                //
            }
        }
        return config
    }
    destroy(url) {
        delete this.queue[url]
        if (!Object.keys(this.queue).length) {
            // Spin.hide()
        }
    }
    interceptors(instance, url) {
        // 请求拦截

        instance.interceptors.request.use(config => {
            // 添加全局的loading...
            if (!Object.keys(this.queue).length) {
                // Spin.show() // 不建议开启，因为界面不友好
            }
            this.queue[url] = true
            config.headers['Authorization'] = config.headers['Authorization'] || ('Bearer ' + (getToken() || 'invalid_token'))
            return config
        }, error => {
            return Promise.reject(error)
        })
        // 响应拦截
        instance.interceptors.response.use(res => {
            this.destroy(url)
            const { data, status } = res
            return { data, status }
        }, async (error) => {
            this.destroy(url)

            const errorJson = JSON.parse(JSON.stringify(error))
            let response_status = errorJson.status

            if (response_status === 401) {
                // should refresh token or re-login
                // 当请求url已经是刷新token时
                // 说明此时刷新失败
                // 为了避免死递归，需要返回错误
                // TODO: ask backend to return a detailed error code
                if (_.includes(error.config.url, 'refresh')) {
                    return Promise.reject(error)
                }

                const refreshToken = getRefreshToken()
                if (refreshToken) {
                    try {
                        const res = await refreshTokenReq(refreshToken)
                        const data = res.data
                        setToken(data['access_token'])
                        setRefreshToken(refreshToken)
                        const reqConfig = error.config
                        reqConfig.headers['Authorization'] = 'Bearer ' + data['access_token']
                        return axios.request(reqConfig) // 再次发送之前 401 的请求
                    } catch (err) {
                        if (err.response.status === 401) {
                            reLogin()
                        }
                        return Promise.reject(err)
                    }
                } else {
                    if (location.href.endsWith('/login')) {
                        return Promise.reject(error)
                    } else {
                        reLogin()
                        return Promise.reject(error)
                    }
                }
            } else if (status == 403) {
                console.log('权限已修改请重新登录')
                setTimeout(() => {
                    router.replace({
                        path: '/',
                        query: {
                            redirect: router.currentRoute.fullPath
                        }
                    });
                }, 1000);
            } else if (status == 404) {
                console.log('页面飞到火星去了')
            }
            return Promise.reject(error)
        })
    }
    request(options) {
        const instance = axios.create()
        options = Object.assign(this.getInsideConfig(), options)
        this.interceptors(instance, options.url)
        return instance(options)
    }
}



export default HttpRequest