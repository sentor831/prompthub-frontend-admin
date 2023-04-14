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
                            <div class="col">
                                <img src="https://sucai.suoluomei.cn/sucai_zs/images/20201027152322-15.jpg"
                                    style="cursor: pointer; width: 70vh" />
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
                        <div class="comments" style="margin-top:5vh">
                            <div class="row">
                                <el-button type="danger">批量删除</el-button>
                                <el-input class="input" placeholder="关键字" v-model="keyword"
                                    style="margin-left: 5vh; width: 40vh;">
                                    <el-button slot="append" icon="el-icon-search"></el-button>
                                </el-input>
                            </div>
                            <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark"
                                style="width: 100%; margin-top:3vh" @selection-change="handleSelectionChange">
                                <el-table-column type="selection" width="55">
                                </el-table-column>
                                <el-table-column prop="username" label="用户名" width="200" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column prop="content" label="评论内容" width="550" show-overflow-tooltip>
                                </el-table-column>
                                <el-table-column prop="time" label="评论时间">
                                    <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
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
            }]
        }
    },
    methods: {
        handleDelete(index, row) {
            console.log(index, row);
        }
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