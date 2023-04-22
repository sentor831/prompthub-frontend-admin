<template>
    <div class="content" style="background-color: whitesmoke;">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <card class="card-plain">
                        <template slot="header">
                            <h4 class="card-title">作品详情</h4>
                        </template>
                        <div class="row">
                            <div class="col-6">
                                <img :src=pic style="cursor: pointer; width: 100%" />
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
                        <div class="comments col" style="margin-top: 1%;" v-if="status === 0">
                            <div class="row" style="width: 100%; margin-left: 1vw;">
                                <!-- <el-button type="danger" @click="handleDeleteArray()">批量删除</el-button> -->
                                <!-- <el-input class="input" placeholder="关键字" v-model="keyword"
                                    style="margin-left: 3em; width: 30%;">
                                    <el-button slot="append" icon="el-icon-search"></el-button>
                                </el-input> -->
                            </div>
                            <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark"
                                style="width: 100%; margin-top: 2em; margin-left: 0"
                                @selection-change="handleSelectionChange">
                                <el-table-column type="selection" width="55">
                                </el-table-column>
                                <el-table-column prop="user.nickname" label="评论者昵称" width="200" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column prop="content" label="评论内容" width="550" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column prop="created_at" label="评论时间">
                                    <template slot-scope="scope">
                                        {{ dispTime(scope.row.created_at) }}
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作">
                                    <template slot-scope="scope">
                                        <el-button type="danger"
                                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </card>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import ElementUI from 'element-ui';
import { get_comment_list, get_prompt, delete_comment } from '../api';
import { Notification } from 'element-ui'
import { formatTime } from '../api/utils';
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
            tableData: [],
            picid: -1,
            recordid: -1,
            // keyword: '',
            status: 0
        }
    },
    mounted() {
        this.picid = this.$route.query.picid;
        this.recordid = this.$route.query.recordid
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
                    this.width = res.data.prompt.width
                    this.height = res.data.prompt.height
                    this.others = res.data.prompt.prompt_attribute
                    // this.jsonObj = JSON.parse(this.others);
                    this.jsonObj = eval('[' + res.data.prompt.prompt_attribute + ']')[0]
                    this.status = res.data.prompt.upload_status
                    if (this.status === 0) {
                        get_comment_list(this.picid, 10, 1)
                            .then((res) => {
                                this.tableData = res.data.comment_list

                            })
                            .catch((err) => {
                                console.log(err)
                                Notification({ title: '获取评论列表失败', message: err.response.data.msg, type: 'error', duration: 2000 })
                            })
                    }
                })
        },
        handleDelete(index, row) {
            delete_comment({
                comment_id: row.id
            })
                .then((res) => {
                    get_comment_list(this.picid, 10, 1)
                        .then((res) => {
                            this.tableData = res.data.comment_list

                        })
                        .catch((err) => {
                            console.log(err)
                            Notification({ title: '获取评论列表失败', message: err.response.data.msg, type: 'error', duration: 2000 })
                        })
                })
                .catch((err) => {
                    console.log(err)
                    Notification({ title: '删除评论失败', message: err.response.data.msg, type: 'error', duration: 2000 })
                })
            console.log(index, row);
        },
        // handleDeleteArray() {
        // const length = this.multipleSelection.length;

        // for (let i = 0; i < length; i++) {
        //     this.delarr.push(this.multipleSelection[i].id);
        // }
        // }
    }
}
</script>

<style>
.information {
    border-style: solid;
    border-width: thin;
}

.comments {
    margin-top: 2vh;
}
</style>