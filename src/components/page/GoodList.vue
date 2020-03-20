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
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
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
        label="商品名"
        sortable
      >
      </el-table-column>
        <el-table-column
        prop="image"
        label="图片"
      >
       <template slot-scope="scope">
        <img :src="scope.row.image " style="width:30px"/>
      </template>
      </el-table-column>
      </el-table-column>
      <el-table-column
        prop="price"
        label="价格"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="is_sale_name"
        label="上下架"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="is_order"
        label="是否预约"
        sortable
      >
      </el-table-column>
      <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="editClick(scope.row)">编辑</el-button>
        <el-button @click="handleClick(scope.row)" type="text" size="small">上下架</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { goodlist,updateGoods } from '@/api/good';
export default {
    name: 'good-list',
    data() {
        return {
            name:'',
            tableData: [],
            goodData: [],
            loading: false
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
              res.data.data.forEach(item=>{
                if(item.price_type == 1)
                {
                  item.price = "面议";
                }
                item.is_sale_name = item.is_sale==1?"上架中":"已下架";
                item.is_order = item.is_order==1?"可预约":"不可预约";
              })
              this.goodData = res.data.data;
          });
        },
        handleClick(e)
        {
          console.log(e);
          if(e.is_sale == 1){
             var msg = "是否下架"+e.name+"?";
          }else{
              var msg = "是否上架"+e.name+"？";
          }
          this.$confirm(msg, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
              //点击确定按钮的操作
              this.loading = true;
              let param = {}
              param.is_sale = e.is_sale == 1?0:1
              updateGoods(e.id,param).then(res=>{
                        e.is_sale = param.is_sale
                        e.is_sale_name = e.is_sale==0?"上架中":"已下架";
                        this.$message.success(res.msg);
                    }).catch(err=>{
                        this.$message.error("更新异常");
                    })
            this.loading = false;
            this.doSearch();
          });
        },
        editClick(row){
          console.log(row);
          this.$router.push({
            path:'/addGood',
            params:{
              id:1
            }
          })
        } 
    }
};
</script>

<style>
</style>