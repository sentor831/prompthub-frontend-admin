<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card class="card-plain">
            <template slot="header">
              <h4 class="card-title">管理用户</h4>
            </template>
            <template>
              <!-- <el-table :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)" stripe> -->
              <el-table :data="tableData" stripe>
                <el-table-column prop="id" label="ID" width="100">
                </el-table-column>
                <el-table-column prop="avatar" label="头像" width="200">
                  <template slot-scope="scope">
                    <img :src="scope.row.avatar" width="100" height="100" style="margin-left:0; padding: 1vh" />
                  </template>
                </el-table-column>
                <!-- <el-table-column prop="email" label="邮箱">
                </el-table-column> -->
                <el-table-column prop="nickname" label="用户名">
                </el-table-column>
              </el-table>
            </template>

            <!-- </div> -->
          </card>
        </div>
      </div>
      <div class="block" style="text-align: center">
        <el-pagination layout="prev, pager, next" :total="totalNum" :current-page="currentPage" :page-size="pageSize"
          @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import LTable from 'src/components/Table.vue'
import Card from 'src/components/Cards/Card.vue'
import { get_user_list } from '../api'
import { Notification } from 'element-ui'
// let tableData = [{
//   id: 1,
//   avator: 'https://sucai.suoluomei.cn/sucai_zs/images/20201027152321-13.jpg',
//   nickname: 'Dakota Rice'
// },
// {
//   id: 2,
//   avator: 'https://sucai.suoluomei.cn/sucai_zs/images/20201027152321-13.jpg',
//   nickname: 'Dakota Rice'
// },
// {
//   id: 3,
//   avator: 'https://sucai.suoluomei.cn/sucai_zs/images/20201027152321-13.jpg',
//   nickname: 'Dakota Rice3'
// },
// {
//   id: 4,
//   avator: 'https://sucai.suoluomei.cn/sucai_zs/images/20201027152321-13.jpg',
//   nickname: 'Dakota Rice4'
// },
// {
//   id: 5,
//   avator: 'https://sucai.suoluomei.cn/sucai_zs/images/20201027152321-13.jpg',
//   nickname: 'Dakota Rice5'
// },
// {
//   id: 6,
//   avator: 'https://sucai.suoluomei.cn/sucai_zs/images/20201027152321-13.jpg',
//   nickname: 'Dakota Rice6'
// },
// {
//   id: 7,
//   avator: 'https://sucai.suoluomei.cn/sucai_zs/images/20201027152321-13.jpg',
//   nickname: 'Dakota Rice7'
// },
// {
//   id: 8,
//   avator: 'https://sucai.suoluomei.cn/sucai_zs/images/20201027152321-13.jpg',
//   nickname: 'Dakota Rice'
// }]
export default {
  components: {
    // LTable,
    Card
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      totalNum: 100,
      tableData: [],
    }
  },
  mounted() {
    this.getUsers()
  },
  methods: {
    getUsers() {
      get_user_list(this.pageSize, this.currentPage)
        .then((res) => {
          this.tableData = res.data.user_list
          this.totalNum = res.data.user_num
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
          Notification({ title: '获取用户列表失败', message: err.response.data.msg, type: 'error', duration: 2000 })
        })
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
      this.getUsers()
    }
  }
}
</script>
<style></style>
