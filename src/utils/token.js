import Cookies from "js-cookie"
export const TOKEN_KEY = 'admin-token'
export const REFRESH_TOKEN_KEY = 'admin-refresh-token'
export const cookieExpires = 1

export const setToken = (token) => {
    Cookies.set(TOKEN_KEY, token, { expires: cookieExpires || 1 })
}

export const getToken = () => {
    const token = Cookies.get(TOKEN_KEY)
    console.log(token)
    if (token) return token
    else return false
}

export const setRefreshToken = (refreshToken) => {
    Cookies.set(REFRESH_TOKEN_KEY, refreshToken, { expires: cookieExpires || 3 })
}

export const getRefreshToken = () => {
    const refreshToken = Cookies.get(REFRESH_TOKEN_KEY)
    if (refreshToken) return refreshToken
    else return false
}