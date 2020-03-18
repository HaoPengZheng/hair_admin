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
        prop="name"
        label="姓名"
        sortable
      >
      </el-table-column>
       <el-table-column
        prop="add_money"
        label="add_money"
        sortable
      >
      </el-table-column>
       <el-table-column
        prop="discount"
        label="折扣"
        sortable
      >
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
            params:{
              phone:'',
              limit:'20'
            },
            tableData: [],
        };
    },
    created() {
        this.doSearch();
    },
    methods: {
        doSearch() {
            let params = {}
            if(this.params.phone.trim()){
              params.phone = this.params.phone
            }
            params.limit = this.params.limit
            getUserList(params).then(res => {
                this.tableData = res.data;
            });
        }
    }
};
</script>

<style>
</style>