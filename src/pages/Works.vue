<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <card class="card-plain">
                        <template slot="header">
                            <h4 class="card-title">管理作品</h4>
                        </template>
                        <template>
                            <el-table :data="tableData" stripe>
                                <el-table-column prop="id" label="ID" width="80">
                                </el-table-column>
                                <el-table-column prop="picture" label="缩略图" width="200">
                                    <template slot-scope="scope">
                                        <img :src="scope.row.picture" width="100" height="100"
                                            style="margin-left:0; padding: 1vh" />
                                    </template>
                                </el-table-column>
                                <el-table-column prop="uploader.nickname" label="上传者昵称">
                                </el-table-column>
                                <el-table-column prop="created_at" label="上传时间">
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
import { get_prompt_list } from '../api';
import Card from 'src/components/Cards/Card.vue'

let tableData = [{
    id: 1,
    picture: 'https://sucai.suoluomei.cn/sucai_zs/images/20201027152321-13.jpg',
    uploader: { nickname: 'hyf' },
    created_at: '2023.01.02 12:34:56',
}]

export default {
    name: 'works',
    components: {
        Card
    },
    data() {
        return {
            currentPage: 1,
            pageSize: 10,
            // TODO 
            totalNum: 1000,
            tableData: [],
        }
    },
    mounted() {
        this.getWorks()
    },
    methods: {
        getWorks() {
            get_prompt_list(this.pageSize, this.currentPage)
                .then((res) => {
                    this.tableData = res.data.prompt_list
                    console.log(this.totalNum)
                })
                .catch((err) => {
                    console.log(err)
                    Notification({ title: '获取作品列表失败', message: err.response.data.msg, type: 'error', duration: 2000 })
                })
        },
        handleCurrentChange(currentPage) {
            this.currentPage = currentPage
            this.getWorks()
        },
        handleLook(index, row) {
            console.log(index, row.id);
            this.$router.push({ path: '/admin/works/info', query: { picid: row.id } })
        }
    }
}
</script>