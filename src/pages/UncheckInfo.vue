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
                                <img :src="pic" style="cursor: pointer; width: 100%" />
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
                                        <p class="card-text">{{ dispTime(uploadtime) }}</p>
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
                                        <p class="card-text">
                                            <!-- <pre>{{ JSON.stringify(jsonObj, null, 4) }}</pre> -->
                                        <pre>{{ jsonObj }}</pre>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col" style="text-align: right; margin-top: 3vh;">
                            <el-button type="success" style="width: 20vh" @click="handlePass()">通过</el-button>
                            <el-button type="danger" style="width: 20vh" @click="handleReject()">拒绝</el-button>
                        </div>
                        <el-dialog :visible.sync="dialogVisible" center width="35%">
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
import { audit_prompt, get_prompt } from '../api';
import { formatTime } from '../api/utils';
import { Notification } from 'element-ui'
export default {
    name: 'workinfo',
    components: {

    },
    data() {
        return {
            pic: '',
            uploader: '',
            uploadtime: '',
            prompt: '',
            model: '',
            width: '',
            height: '',
            others: '',
            jsonObj: null,
            dialogVisible: false,
            ruleForm: {
                reason: ''
            },
            rules: {
                reason: [
                    { required: true, message: '请填写拒绝理由', trigger: 'blur' }
                ]
            },
            recordid: -1,
            picid: -1
        }
    },
    mounted() {
        this.recordid = this.$route.query.recordid
        this.picid = this.$route.query.picid
        this.getPicInfo()
    },
    methods: {
        dispTime(t, detailed) {
            return formatTime(t, detailed)
        },
        getPicInfo() {
            get_prompt(this.picid)
                .then((res) => {
                    console.log(res)
                    this.pic = res.data.prompt.picture
                    this.uploader = res.data.prompt.uploader.nickname
                    this.uploadtime = res.data.prompt.created_at
                    this.prompt = res.data.prompt.prompt
                    this.model = res.data.prompt.model
                    let img = new Image()
                    img.src = res.data.prompt.picture
                    this.width = img.width
                    this.height = img.height
                    this.others = res.data.prompt.prompt_attribute
                    // this.jsonObj = JSON.parse(this.others);
                    this.jsonObj = eval('[' + res.data.prompt.prompt_attribute + ']')[0]
                    console.log(this.jsonObj)
                })
        },
        handlePass() {
            audit_prompt({
                id: this.recordid,
                passed: true,
                content: ''
            })
                .then((res) => {
                    console.log(res)
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
                        id: this.recordid,
                        passed: false,
                        content: this.ruleForm.reason
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