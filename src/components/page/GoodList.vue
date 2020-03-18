<template>
  <div>
    <div>
      <el-input
        v-model="name"
        placeholder="搜索姓名"
        style="width:300px"
        @blur="doSearch"
      ></el-input>
      <el-button
        icon="el-icon-search"
        circle
        @click="doSearch"
      ></el-button>
      <!-- <el-switch
        v-model="value1"
        active-text="is_order"
        inactive-text="is_no_order"
      >
      </el-switch>
      <el-switch
        style="display: block"
        v-model="value2"
        active-color="#13ce66"
        inactive-color="#ff4949"
        active-text="is_sale"
        inactive-text="is_no_sale"
      >
      </el-switch> -->
    </div>
    <el-table
      :data="goodData"
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
        prop="price_type"
        label="price_type"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="price"
        label="price"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="is_sale"
        label="is_sale"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="is_order"
        label="is_order"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="image"
        label="image"
      >
       <template slot-scope="scope">
        <img :src="scope.row.image "/>
      </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { goodlist } from '@/api/good';
export default {
    name: 'good-list',
    data() {
        return {
            name:'',
            tableData: [],
            goodData: []
        };
    },
    created() {
        this.doSearch();
    },
    methods: {
        doSearch() {
          let param = {}
          if(this.name!=''){
            param.name = this.name
          }
          param.limit = '20'

          goodlist(param).then(res => {
              this.goodData = res.data.data;
          });
        }
    }
};
</script>

<style>
</style>