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

// =======================> 管理员 API
// 登录
export const login = (params) => {
    return axioss.request({
        url: `/api/auth/admin_obtain_token`,
        data: params,
        method: 'post'
    })
}

// 获取用户列表
export const get_user_list = (per_page, page_index) => {
    return axioss.request({
        url: `/api/admin/get_user_list?per_page=${per_page}&page_index=${page_index}`,
        method: 'get'
    })
}

// 获取作品列表
export const get_prompt_list = (per_page, page_index) => {
    return axioss.request({
        url: `/api/admin/get_prompt_list?per_page=${per_page}&page_index=${page_index}`,
        method: 'get'
    })
}

// 获取作品内容
export const get_prompt = (id) => {
    return axioss.request({
        url: `api/prompt/get_prompt?id=${id}`,
        method: 'get'
    })
}

// 获取待审核作品列表
export const get_audit_record_list = (per_page, page_index, status) => {
    return axioss.request({
        url: `/api/admin/get_audit_record_list?per_page=${per_page}&page_index=${page_index}&status=${status}`,
        method: 'get'
    })
}

// 审核作品
export const audit_prompt = (params) => {
    return axioss.request({
        url: `/api/admin/audit_prompt`,
        method: 'get',
        data: params
    })
}

// 获取评论列表
export const get_comment_list = (prompt_id, per_page, page_index) => {
    return axioss.request({
        url: `/api/admin/get_comment_list?prompt_id=${prompt_id}&per_page=${per_page}&page_index=${page_index}`,
        method: 'get'
    })
}

// 删除评论
export const delete_comment = (params) => {
    return axioss.request({
        url: `api/admin/delete_comment`,
        method: 'delete',
        data: params
    })
}