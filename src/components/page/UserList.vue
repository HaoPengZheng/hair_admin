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
        prop="amount.amount"
        label="余额"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="amount.add_history"
        label="累计消费"
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
          <el-button
            type="danger"
            @click="showConsumptionDialog(scope.row)"
          >消费</el-button>
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
          v-model="payForm.count"
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

    <!-- 这是消费的弹出框 -->
    <el-dialog
      title="会员消费"
      :visible.sync="consumptionVisible"
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
      <el-table
        :data="saleGoodData"
        style="width: 100%"
      >
        <el-table-column
          prop="name"
          label="服务"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="price"
          label="单价"
        >
        </el-table-column>
        <el-table-column
          prop="duration"
          label="会员价"
        >
          <template slot-scope="scope">
            <span>{{(scope.row.price*scope.row.duration*0.01).toFixed(2)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="count"
          label="数量"
        >
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.count"></el-input-number>
          </template>
        </el-table-column>
      </el-table>
      <el-form :model="consumptionForm">
        其他消费 :
        <el-input-number
          v-model="consumptionForm.otherPrice"
          :min="0"
          label="消费金额"
        ></el-input-number>
      </el-form>
      <div>
        总计消费：{{this.consumptionSum}}元
      </div>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="handleConsumptionDialogClose">取 消</el-button>
        <el-button
          type="primary"
          @click="handleConsuption"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUserList } from '@/api/member';
import { pay, consumption, saleGoodsList } from '@/api/good';
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
            consumptionVisible: false,
            activeUser: null, //临时存储用户信息
            payForm: {
                count: 100,
                remark: ''
            },
            consumptionForm: {
                goodList: [],
                otherPrice: 0
            },
            formLabelWidth: '120px',
            saleGoodData: []
        };
    },
    created() {
        this.doSearch();
        this.getSaleGood();
    },
    computed: {
        consumptionData() {
            let data = [];
            this.saleGoodData.forEach(row => {
                if (row.count > 0) {
                    data.push({
                        id: row.id,
                        num: row.count,
                        price: (row.price * row.duration * 0.01).toFixed(2)
                    });
                }
            });
            return data;
        },
        consumptionSum() {
            let sum = 0;
            if (this.consumptionData instanceof Array) {
                this.consumptionData.forEach(data => {
                    if (!isNaN(data.price)) {
                        sum += data.num * data.price;
                    }
                });
            }
            sum += this.consumptionForm.otherPrice;
            return sum;
        }
    },
    methods: {
        getSaleGood() {
            saleGoodsList().then(res => {
                this.saleGoodData = res.data.map(row => {
                    row.count = 0;
                    return row;
                });
            });
        },
        resetGoodCount() {
            this.saleGoodData.forEach(row => {
                row.count = 0;
            });
        },
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
            let data = { add: { money: this.payForm.count, remark: this.payForm.remark } };
            if (this.activeUser) {
                pay(this.activeUser.id, { data: Base64.encode(JSON.stringify(data)) }).then(res => {
                    alert('充值成功');
                    this.payFormVisible = false;
                });
            }
        },
        showConsumptionDialog(user) {
            this.consumptionVisible = true;
            this.activeUser = user;
        },
        handleConsuption(){
          let data = {goods:this.consumptionData}
          consumption(this.activeUser.id,{ data: Base64.encode(JSON.stringify(data)) }).then(res=>{
           
            alert('扣款成功')
             this.resetGoodCount()
          })
        },
        handleConsumptionDialogClose(){
          this.consumptionVisible = false
          this.resetGoodCount()
        }
    }
};
</script>
<style>
</style>