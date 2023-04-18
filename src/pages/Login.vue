<template>
    <div>
        <div class="col-md-5 ml-auto mr-auto" style="margin-top:15vh">
            <card>
                <div class="pb-0 card-header text-center">
                    <h4 class="font-weight-bolder">Prompthub 管理员登录</h4>
                </div>
                <form>
                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label" style="font-size: medium;">用户名</label>
                        <div class="col-sm-10">
                            <input class="form-control" v-model="username">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label" style="font-size: medium;">密码</label>
                        <div class="col-sm-10">
                            <input type="password" class="form-control" v-model="password">
                        </div>
                    </div>
                    <div class="card-footer text-center">
                        <button type="submit" class="btn btn-primary" @click="handleLogin()">登 录</button>
                    </div>
                </form>

            </card>
        </div>

    </div>
</template>

<script>
import Card from 'src/components/Cards/Card.vue'
import { login } from '../api/index';
import { getRefreshToken, getToken, setRefreshToken, setToken } from '@/utils/token.js'
import { Notification } from 'element-ui'
export default {
    name: "login",
    components: {
        Card
    },
    data() {
        return {
            username: '',
            password: '',
        }
    },
    methods: {
        handleLogin() {
            if (this.username === '') {
                Notification({ title: '提示', message: '用户名不能为空', type: 'warning', duration: 2000 })
            } else if (this.password === '') {
                Notification({ title: '提示', message: '请输入密码', type: 'warning', duration: 2000 })
            } else {
                login({
                    username: this.username,
                    password: this.password
                })
                    .then((res) => {
                        console.log(res)
                        setToken(res.data.access_token)
                        setRefreshToken(res.data.refresh_token)
                        let loginInfo = {
                            // TODO?
                        }
                        this.cookie.setCookie(loginInfo, 1)

                        this.$router.push('/admin/users')

                        Notification({ title: '登录成功', message: '欢迎您！', type: 'success', duration: 2000 })
                    })
                    .catch((err) => {
                        console.log(err)
                        Notification({ title: '登录失败', message: err.response.data.msg, type: 'error', duration: 2000 })
                    });
            }
        },
    },
}
</script>