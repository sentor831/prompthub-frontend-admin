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
                            <input class="form-control">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label" style="font-size: medium;">密码</label>
                        <div class="col-sm-10">
                            <input type="password" class="form-control">
                        </div>
                    </div>
                    <div class="card-footer text-center">
                        <button type="submit" class="btn btn-primary">Sign in</button>
                    </div>
                </form>

            </card>
        </div>

    </div>
</template>

<script>
import Card from 'src/components/Cards/Card.vue'
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
    methods: {},
}
</script>