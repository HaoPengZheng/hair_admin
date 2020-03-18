<template>
  <div>
    <div>
      <el-input
        v-model="params.phone"
        placeholder="搜索电话"
        style="width:300px"
        @blur="doSearch"
      ></el-input>
      <el-button
        icon="el-icon-search"
        circle
        @click="doSearch"
      ></el-button>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="handlePageChange"
      >
      </el-pagination>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="id"
        label="Id"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="昵称"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="gender"
        label="性别"
        sortable
      >
        <template slot-scope="scope">
          <div>
            <el-tag
              v-if="scope.row.gender == 0"
              effect="dark"
              type="danger"
            >
              女
            </el-tag>
            <el-tag
              v-if="scope.row.gender == 1"
              effect="dark"
            >
              男
            </el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="level.name"
        label="会员等级"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="level.discount"
        label="折扣"
        sortable
      >
        <template slot-scope="scope">
          <span>{{scope.row.level.discount}}折</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <el-button type="primary">充值</el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getUserList } from '@/api/member';
export default {
    name: 'good-list',
    data() {
        return {
            total: 0,
            page:1,
            params: {
                phone: '',
                limit: '10'
            },
            tableData: []
        };
    },
    created() {
        this.doSearch();
    },
    methods: {
        doSearch() {
            let params = {};
            if (this.params.phone.trim()) {
                params.phone = this.params.phone;
            }
            params.limit = this.params.limit;
            params.page = this.page
            getUserList(params).then(res => {
                this.tableData = res.data.data;
                this.total = res.data.total;
            });
        },
        handlePageChange(page){
          this.page = page
          this.doSearch()
        }
    }
};
</script>

<style>
</style>