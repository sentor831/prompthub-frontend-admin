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
                            <el-table :data="table.data" stripe>
                                <el-table-column prop="id" label="ID" width="80">
                                </el-table-column>
                                <el-table-column prop="picture" label="缩略图" width="200">
                                    <template slot-scope="scope">
                                        <img :src="scope.row.picture" width="100" height="100"
                                            style="margin-left:0; padding: 1vh" />
                                    </template>
                                </el-table-column>
                                <el-table-column prop="uploader" label="上传者用户名">
                                </el-table-column>
                                <el-table-column prop="uploadtime" label="上传时间">
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
                <el-pagination layout="prev, pager, next" :total="50">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
let tableData = [{
    id: 1,
    picture: 'https://sucai.suoluomei.cn/sucai_zs/images/20201027152321-13.jpg',
    uploader: 'hyf',
    uploadtime: '2023.01.02 12:34:56',
}]

export default {
    name: 'works',
    components: {

    },
    data() {
        return {
            table: {
                data: [...tableData]
            }
        }
    },
    methods: {
        handleLook(index, row) {
            console.log(index, row);
            this.$router.push('/admin/works/info')
            // TODO set cookies
        }
    }
}
</script>