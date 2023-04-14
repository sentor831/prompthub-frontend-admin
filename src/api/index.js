import axios from 'axios'
import HttpRequest from '@/api/axios'

export const refreshTokenReq = (refreshToken) => {
    const url = '/api/auth/refresh_token'
    const headers = refreshToken ? { Authorization: 'Bearer ' + refreshToken } : {}
    console.log('refreshtoken:' + refreshToken)
    return axios.request({
        url,
        method: 'get',
        headers
    })
}

const axioss = new HttpRequest('')

// =======================> 用户 API
// 登录
export const login = (params) => {
    return axioss.request({
        url: `/api/auth/user_obtain_token`,
        data: params,
        method: 'post'
    })
}

// 发送邮件
export const sendRegisterEmail = (params) => {
    return axioss.request({
        url: `/api/user/sign_up`,
        data: params,
        method: 'post'
    })
}

// 注册
export const register = (params) => {
    return axioss.request({
        url: `/api/user/confirm_and_create`,
        data: params,
        method: 'put'
    })
}

// 忘记密码发送邮件
export const sendForgetPassEmail = (params) => {
    return axioss.request({
        url: `/api/user/confirm_and_create`,
        data: params,
        method: 'post'
    })
}

// 修改忘记的密码
export const modifyForgetPass = (params) => {
    return axioss.request({
        url: `/api/user/confirm_forget_password`,
        data: params,
        method: 'put'
    })
}

// 修改密码
export const modifyPass = (params) => {
    return axioss.request({
        url: `api/user/change_password`,
        data: params,
        method: 'post'
    })

}