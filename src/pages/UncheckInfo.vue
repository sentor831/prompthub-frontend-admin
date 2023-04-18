<template>
    <div class="content" style="background-color: whitesmoke;">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <card class="card-plain">
                        <template slot="header">
                            <h4 class="card-title">待审核作品详情</h4>
                        </template>
                        <div class="row">
                            <div class="col-6">
                                <img src="https://sucai.suoluomei.cn/sucai_zs/images/20201027152322-15.jpg"
                                    style="cursor: pointer; width: 100%" />
                            </div>
                            <div class="col-6">
                                <p>上传者</p>
                                <div class="card">
                                    <div class="card-body">
                                        <p class="card-text">{{ uploader }}</p>
                                    </div>
                                </div>
                                <p>上传时间</p>
                                <div class="card">
                                    <div class="card-body">
                                        <p class="card-text">{{ uploadtime }}</p>
                                    </div>
                                </div>
                                <p>prompt</p>
                                <div class="card">
                                    <div class="card-body">
                                        <p class="card-text">{{ prompt }}</p>
                                    </div>
                                </div>
                                <p>模型</p>
                                <div class="card">
                                    <div class="card-body">
                                        <p class="card-text">{{ model }}</p>
                                    </div>
                                </div>
                                <p>宽度</p>
                                <div class="card">
                                    <div class="card-body">
                                        <p class="card-text">{{ width }}</p>
                                    </div>
                                </div>
                                <p>高度</p>
                                <div class="card">
                                    <div class="card-body">
                                        <p class="card-text">{{ height }}</p>
                                    </div>
                                </div>
                                <p>其他信息</p>
                                <div class="card">
                                    <div class="card-body">
                                        <p class="card-text">{{ others }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col" style="text-align: right; margin-top: 3vh;">
                            <el-button type="success" style="width: 20vh" @click="handlePass()">通过</el-button>
                            <el-button type="danger" style="width: 20vh" @click="handleReject()">拒绝</el-button>
                        </div>
                        <el-dialog :visible.sync="dialogVisible" center width="30%">
                            <div style="align-items: center; justify-content: center;">
                                <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                                    <el-form-item prop="reason">
                                        <el-input type="textarea" v-model="ruleForm.reason"
                                            placeholder="拒绝理由..."></el-input>
                                    </el-form-item>
                                </el-form>
                            </div>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="dialogVisible = false">取 消</el-button>
                                <el-button type="primary" @click="confirmReject('ruleForm')">确 定</el-button>
                            </span>
                        </el-dialog>
                    </card>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import { audit_prompt } from '../api';
export default {
    name: 'workinfo',
    components: {

    },
    data() {
        return {
            uploader: 'haha',
            uploadtime: '2023.3.11 13:25:11',
            prompt: 'funny, good, bad, building, tall, night, lights, amazing, what, strange, weird, boring, interesting, surprising',
            model: 'DALL-E',
            width: '120',
            height: '240',
            others: 'some json wwwww wwwwwwwww wwwwwwwwwww wwwwwwww,wwwwwwwwwwww,wwwwwwwwwwwww wwwwwwwwwww, wwwwwwwwwwww,wwwwwwwwwww wwwwwww,wwwwwwwwwwww,wwwwww,wwww,wwwwwwwwwww,wwwwwwww wwwwwww,wwwwwwww wwwwwwwwww,wwwwww wwwwwwww,wwwww wwwwwwwwww,wwwwwwww www',
            tableData: [{
                username: 'www',
                content: '??',
                time: '2023'
            }],
            dialogVisible: false,
            ruleForm: {
                reason: ''
            },
            rules: {
                reason: [
                    { required: true, message: '请填写拒绝理由', trigger: 'blur' }
                ]
            },
            picid: -1,
        }
    },
    mounted() {
        this.picid = this.$route.query.picid
    },
    methods: {
        handlePass() {
            audit_prompt({
                id: this.picid,
                passed: true,
                content: '通过'
            })
                .then((res) => {
                    this.$message({ type: 'success', message: '已通过' });
                    this.$router.push('/admin/uncheck')
                })
                .catch((err) => {
                    console.log(err)
                    Notification({ title: '审核失败', message: err.response.data.msg, type: 'error', duration: 2000 })
                })

        },
        handleReject() {
            this.dialogVisible = true;
        },
        confirmReject(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    audit_prompt({
                        id: this.picid,
                        passed: false,
                        content: '不通过' + this.ruleForm.reason
                    })
                        .then((res) => {
                            this.$message({ type: 'success', message: '已拒绝' })
                            this.$router.push('/admin/uncheck')
                        })
                        .catch((err) => {
                            console.log(err)
                            Notification({ title: '审核失败', message: err.response.data.msg, type: 'error', duration: 2000 })
                        })

                }
            });

        }
    }
}
</script>

<style></style>