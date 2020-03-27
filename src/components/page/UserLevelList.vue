<template>
  <div>
    <div>
      <!-- <el-input
        v-model="params.name"
        placeholder="搜索姓名"
        style="width:300px"
        @blur="doSearch"
      ></el-input>
      <el-button
        icon="el-icon-search"
        circle
        @click="doSearch"
      ></el-button> -->

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
        prop="deposit"
        label="升级充值额度"
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
import { getUserLevel } from '@/api/member';
export default {
    name: 'good-list',
    data() {
        return {
            tableData: [],
        };
    },
    created() {
        this.doSearch();
    },
    methods: {
        doSearch() {
            getUserLevel().then(res => {
                this.tableData = res.data;
            });
        }
    }
};
</script>

<style>
</style>