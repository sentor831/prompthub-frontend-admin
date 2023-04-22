<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <card class="card-plain">
                        <template slot="header">
                            <div class="row" style="margin-left:0.5vw">
                                <h4 class="card-title">管理作品</h4>
                                <el-dropdown style="margin-left:3vw">
                                    <el-button type="default" id="filter">
                                        全部作品<i class="el-icon-arrow-down el-icon--right"></i>
                                    </el-button>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item @click.native="changeFilter(-1)">全部作品</el-dropdown-item>
                                        <el-dropdown-item @click.native="changeFilter(0)">审核通过作品</el-dropdown-item>
                                        <el-dropdown-item @click.native="changeFilter(1)">审核未通过作品</el-dropdown-item>
                                        <el-dropdown-item @click.native="changeFilter(2)">审核中作品</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </div>
                        </template>

                        <template>
                            <el-table :data="tableData" stripe>
                                <el-table-column v-if="value === -1" prop="id" label="ID" width="80">
                                </el-table-column>
                                <el-table-column v-else prop="prompt.id" label="ID" width="80">
                                </el-table-column>
                                <el-table-column prop="picture" label="缩略图" width="200">
                                    <template slot-scope="scope">
                                        <img v-if="value === -1" :src="scope.row.picture" width="100" height="100"
                                            style="margin-left:0; padding: 1vh" />
                                        <img v-else :src="scope.row.prompt.picture" width="100" height="100"
                                            style="margin-left:0; padding: 1vh" />
                                    </template>
                                </el-table-column>
                                <el-table-column v-if="value === -1" prop="uploader.nickname" label="上传者昵称">
                                </el-table-column>
                                <el-table-column v-else prop="user.nickname" label="上传者昵称">
                                </el-table-column>
                                <el-table-column prop="created_at" label="上传时间">
                                    <template slot-scope="scope">
                                        {{ dispTime(scope.row.created_at) }}
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作">
                                    <template slot-scope="scope">
                                        <el-button type="primary"
                                            @click="handleLook(scope.$index, scope.row)">查看详情</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>
                    </card>
                </div>
            </div>
            <div class="block" style="text-align: center">
                <el-pagination layout="prev, pager, next" :total="totalNum" :current-page="currentPage"
                    :page-size="pageSize" @current-change="handleCurrentChange">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { get_prompt_list, get_audit_record_list } from '../api';
import { formatTime } from '../api/utils';
import Card from 'src/components/Cards/Card.vue'
import { Notification } from 'element-ui'

export default {
    name: 'works',
    components: {
        Card
    },
    data() {
        return {
            currentPage: 1,
            pageSize: 10,
            totalNum: 1000,
            tableData: [],
            value: -1,
        }
    },
    mounted() {
        if (this.cookie.getCookie('page') !== null) {
            this.currentPage = eval(this.cookie.getCookie('page'))
            this.cookie.clearCookie('page')
        } else {
            this.currentPage = 1
        }
        if (this.cookie.getCookie('filter') !== null) {
            this.value = eval(this.cookie.getCookie('filter'))
            this.cookie.clearCookie('filter')
        } else {
            this.value = -1
        }
        this.getWorks(this.value)
    },
    methods: {
        dispTime(t, detailed) {
            return formatTime(t, detailed)
        },
        getWorks(value) {
            if (value === -1) {
                get_prompt_list(this.pageSize, this.currentPage)
                    .then((res) => {
                        console.log(res)
                        this.tableData = res.data.prompt_list
                        this.totalNum = res.data.prompt_num
                    })
                    .catch((err) => {
                        console.log(err)
                        Notification({ title: '获取作品列表失败', message: err.response.data.msg, type: 'error', duration: 2000 })
                    })
            } else {
                get_audit_record_list(this.pageSize, this.currentPage, value)
                    .then((res) => {
                        console.log(res)
                        this.tableData = res.data.audit_record_list
                        this.totalNum = res.data.audit_record_num
                    })
                    .catch((err) => {
                        console.log(err)
                        Notification({ title: '获取作品列表失败', message: err.response.data.msg, type: 'error', duration: 2000 })
                    })
            }
        },
        handleCurrentChange(currentPage) {
            this.currentPage = currentPage
            this.getWorks(this.value)
        },
        handleLook(index, row) {
            console.log(index, row.id);
            this.cookie.setCookie({
                page: this.currentPage,
                filter: this.value
            }, 1)
            if (this.value === -1) {
                this.$router.push({ path: '/admin/works/info', query: { picid: row.id } })
            } else {
                this.$router.push({ path: '/admin/works/info', query: { picid: row.prompt.id, recordid: row.audit_record_id } })
            }

        },
        changeFilter(value) {
            this.value = value
            this.currentPage = 1
            let word = ''
            if (value === -1) {
                word = '全部作品<i class="el-icon-arrow-down el-icon--right"></i>'
            } else if (value === 0) {
                word = '审核通过作品<i class="el-icon-arrow-down el-icon--right"></i>'
            } else if (value === 1) {
                word = '审核未通过作品<i class="el-icon-arrow-down el-icon--right"></i>'
            } else if (value === 2) {
                word = '审核中作品<i class="el-icon-arrow-down el-icon--right"></i>'
            }
            document.getElementById('filter').innerHTML = word
            this.getWorks(this.value)
        }
    }
}
</script>