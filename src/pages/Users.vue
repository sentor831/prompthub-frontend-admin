<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card class="card-plain">
            <template slot="header">
              <h4 class="card-title">管理用户</h4>
              <!-- <p class="card-category">全部用户列表</p> -->
            </template>
            <!-- <div class="table-responsive"> -->
            <!-- <l-table class="table-hover" :columns="table.columns" :data="table.data">
              </l-table> -->
            <!-- </div> -->
            <template>
              <el-table :data="table.data" stripe>
                <el-table-column prop="id" label="ID" width="100">
                </el-table-column>
                <el-table-column prop="avator" label="头像" width="200">
                  <template slot-scope="scope">
                    <img :src="scope.row.avator" width="100" height="100" style="margin-left:0; padding: 1vh" />
                  </template>
                </el-table-column>
                <el-table-column prop="email" label="邮箱">
                </el-table-column>
                <el-table-column prop="username" label="用户名">
                </el-table-column>
              </el-table>
            </template>

            <!-- </div> -->
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
import LTable from 'src/components/Table.vue'
import Card from 'src/components/Cards/Card.vue'
let tableData = [{
  id: 1,
  avator: 'https://sucai.suoluomei.cn/sucai_zs/images/20201027152321-13.jpg',
  email: '111',
  username: 'Dakota Rice'
},
{
  id: 2,
  avator: 'https://sucai.suoluomei.cn/sucai_zs/images/20201027152321-13.jpg',
  email: '111',
  username: 'Dakota Rice'
}]
export default {
  components: {
    LTable,
    Card
  },
  data() {
    return {
      table: {
        data: [...tableData]
      }
    }
  }
}
</script>
<style></style>
