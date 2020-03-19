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
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click="showPayDialog(scope.row)"
          >充值</el-button>
          <el-button type="danger" @click="showConsumptionDialog(scope.row)">消费</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 这是充值的弹出框 -->
    <el-dialog
      title="会员充值"
      :visible.sync="payFormVisible"
    >
      <div>
        <div>
          姓名：{{this.activeUser&&this.activeUser.name}}
        </div>
        <div>
          微信名：{{this.activeUser&&this.activeUser.nickname}}
        </div>
        <div>
          手机：{{this.activeUser&&this.activeUser.phone}}
        </div>
        <div>
          会员等级：{{this.activeUser&&this.activeUser.level}}
        </div>
        <!-- <el-tag type="danger">{{this.activeUser}}</el-tag> -->
      </div>
      <el-form :model="payForm">
        <el-input-number
          v-model="payForm.account"
          :min="1"
          label="重置金额"
        ></el-input-number>
        <el-input v-model="payForm.remark"></el-input>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="payFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="handlePay"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUserList } from '@/api/member';
import { pay, consumption } from '@/api/good';
import { Base64 } from 'js-base64';
export default {
    name: 'good-list',
    data() {
        return {
            total: 0,
            page: 1,
            params: {
                phone: '',
                limit: '10'
            },
            tableData: [],
            payFormVisible: false,
            
            activeUser: null, //临时存储用户信息
            payForm: {
                account: 100,
                remark: ''
            },
            formLabelWidth: '120px'
        };
    },
    created() {
        this.doSearch();
    },
    computed() {},
    methods: {
        doSearch() {
            let params = {};
            if (this.params.phone.trim()) {
                params.phone = this.params.phone;
            }
            params.limit = this.params.limit;
            params.page = this.page;
            getUserList(params).then(res => {
                this.tableData = res.data.data;
                this.total = res.data.total;
            });
        },
        handlePageChange(page) {
            this.page = page;
            this.doSearch();
        },
        showPayDialog(user) {
            this.payFormVisible = true;
            this.activeUser = user;
        },
        handlePay() {
            let data = { add: { money: this.payForm.account, remark: this.payForm.remark } };
            if (this.activeUser) {
                pay(this.activeUser.id, { data:Base64.encode(JSON.stringify(data)) }).then(res => {
                    alert('充值成功')
                    this.payFormVisible = false
                });
            }
        },
        showConsumptionDialog(user){
           this.payFormVisible = true;
            this.activeUser = user;
        }
    }
};
</script>
<style>
</style>