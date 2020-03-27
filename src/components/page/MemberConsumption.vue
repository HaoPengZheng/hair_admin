<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 会员消费
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="query.phone" placeholder="请输入手机号" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                <el-button type="primary" icon="el-icon-money" @click="payFormVisible = true">充值</el-button>
                <el-button
                    type="primary"
                    icon="el-icon-s-finance"
                    @click="shopCartVisible = true"
                >消费</el-button>
            </div>
            <div class="user_info">
                <span>
                    会员姓名：
                    <span class="blue">{{user.name}}</span>
                </span>
                <el-divider direction="vertical"></el-divider>
                <span>
                    手机：
                    <span class="blue">{{user.phone}}</span>
                </span>
                <el-divider direction="vertical"></el-divider>
                <span>
                    会员等级：
                    <span class="red">{{user.level}}</span>
                </span>
                <el-divider direction="vertical"></el-divider>
                <span>
                    会员折扣：
                    <span class="red">{{user.discount}}折</span>
                </span>
                <el-divider direction="vertical"></el-divider>
                <span>
                    卡内余额：
                    <span class="blue">{{user.money}}</span>
                </span>
                <el-divider direction="vertical"></el-divider>
                <span>
                    累计消费：
                    <span class="blue">{{user.total_money}}</span>
                </span>
                <el-divider direction="vertical"></el-divider>
                <span>总充值：{{user.add_history}}</span>
            </div>
            <el-table :data="tableData" stripe style="width: 100%;height:600px">
                <el-table-column prop="created_at" label="交易日期" width="180"></el-table-column>
                <el-table-column prop="type_name" label="类型" width="180"></el-table-column>
                <el-table-column prop="money" label="消费金额" width="180"></el-table-column>
                <el-table-column prop="remark" label="消费说明"></el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="queryLog.page"
                    :page-size="queryLog.limit"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>
        <!-- 这是充值的弹出框 -->
        <el-dialog title="会员充值" :visible.sync="payFormVisible" class="payDialog">
            <el-row style="margin-bottom: 10px;">
                <el-button v-on:click="add_money=100">100元</el-button>
                <el-button v-on:click="add_money=200">200元</el-button>
                <el-button v-on:click="add_money=300">300元</el-button>
                <el-button v-on:click="add_money=500">500元</el-button>
                <el-button v-on:click="add_money=1000">1000元</el-button>
            </el-row>
            <el-row>
                <el-input placeholder="请输入金额" v-model="add_money" style="width:120px;" clearable></el-input>元
            </el-row>
            <div slot="footer" class="dialog-footer">
                <el-button @click="payFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handlePay">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 这是充值的弹出框 end-->
        <!-- 这是消费的弹出框 -->
        <el-dialog title="会员消费" width="80%" :visible.sync="shopCartVisible">
            <el-container style="height:500px;">
                <el-aside width="200px">
                    <el-input placeholder="输入关键字" v-model="filterText"></el-input>
                    <el-tree
                        class="filter-tree"
                        :data="data"
                        :props="defaultProps"
                        default-expand-all
                        show-checkbox
                        :filter-node-method="filterNode"
                        node-key="id"
                        @check-change="chooseGoods"
                        highlight-current
                        ref="tree"
                    ></el-tree>
                </el-aside>
                <el-container>
                    <el-header style="height:60px">
                        <div class="user_info">
                            <span>
                                姓名：
                                <span class="blue">{{user.name}}</span>
                                手机：
                                <span class="blue">{{user.phone}}</span>
                                等级：
                                <span class="red">{{user.level}}</span>
                                折扣：
                                <span
                                    class="red"
                                >{{user.discount}}</span>
                                余额：
                                <span class="blue">{{user.money}}</span>
                            </span>
                        </div>
                    </el-header>
                    <el-main>
                        <el-table
                            :data="cart_list"
                            selection-change="handleSelectionChange"
                            width="100%"
                        >
                            <el-table-column label="ID" prop='id'></el-table-column>
                            <el-table-column label="商品名称" prop="name"></el-table-column>
                            <el-table-column label="购买数量">
                                <template slot-scope="scope">
                                    <div class="div_number" style="width:100px;">
                                        <el-input-number
                                            :min="1"
                                            size="mini"
                                            v-model="scope.row.num"
                                        ></el-input-number>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="商品单价" prop="per_price"></el-table-column>
                            <el-table-column label="优惠价">
                                <template slot-scope="scope">
                                    <div class="div_number">
                                        <el-input placeholder="请输入内容" v-model="scope.row.price"></el-input>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column fixed="right" label="操作" width="100">
                                <template slot-scope="scope">
                                    <el-button
                                        @click="removeClick(scope.$index, scope.row)"
                                        type="text"
                                        size="small"
                                    >移除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-main>
                    <el-footer>
                        <el-row>
                            <el-col :span="8">
                                <span
                                    style="font-size:12px"
                                >共 {{cart_list.length}}件商品</span>
                            </el-col>
                            <el-col :span="16">
                                合计： {{total_price}}元
                                <el-button type="primary" @click="handleConsuption">去结算</el-button>
                                <el-button @click="clearCart">清空</el-button>
                            </el-col>
                        </el-row>
                    </el-footer>
                </el-container>
            </el-container>
        </el-dialog>
    </div>
</template>
<script>
import { getUserList, getUserTansLog } from '../../api/member';
import { pay, consumption, saleGoodsList } from '@/api/good';
import { Base64 } from 'js-base64';
export default {
    name: 'memberConsumption',
    data() {
        return {
            query: {
                phone: ''
            },
            user: {
                name: '',
                phone: '',
                level: '',
                discount: '',
                money: '',
                add_history: 0,
                total_money: 0
            },
            queryLog: {
                limit: 30,
                page: 1
            },
            tableData: [],
            pageTotal: 0,
            uid: 0,
            payFormVisible: false,
            shopCartVisible: false,
            add_money: 0,
            filterText: '',
            data: [],
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            cart_list: [],
            check_list: []
        };
    },
    created: function() {
        this.getSaleGood();
    },
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val);
        }
    },
    computed: {
        // total_num: function() {
        //     let num = 0;
        //     this.check_list.forEach(item => {
        //         num += item.buy_num;
        //     });
        //     return num;
        // },
        total_price: function() {
            let sum_price = 0;
            this.cart_list.forEach(item => {
                sum_price += item.num * item.price;
            });
            return sum_price;
        }
    },
    methods: {
        //手机查询
        handleSearch() {
            let user = {};
            getUserList(this.query).then(res => {
                user = res.data.data[0];
                this.$set(this.user, 'name', user.nickname);
                this.$set(this.user, 'phone', user.phone);
                this.$set(this.user, 'level', user.level.name);
                this.$set(this.user, 'discount', user.level.discount);
                this.$set(this.user, 'money', user.amount.amount + '元');
                this.$set(this.user, 'add_history', user.amount.add_history + '元');
                this.uid = user.id;
                this.getLogs();
            });
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.queryLog, 'page', val);
            this.getLogs();
        },
        getLogs() {
            getUserTansLog(this.uid, this.queryLog).then(res => {
                this.tableData = res.data;
                this.$set(this.user, 'total_money', res.total_money + '元');
                this.pageTotal = res.total;
            });
        },
        // 充值
        handlePay() {
            let data = { add: { money: this.add_money, remark: '' } };
            if (this.uid) {
                pay(this.uid, { data: Base64.encode(JSON.stringify(data)) }).then(res => {
                    this.$message({
                        showClose: true,
                        message: '充值成功',
                        type: 'success'
                    });
                    this.handleSearch();
                    this.payFormVisible = false;
                });
            } else {
                this.$message({
                    showClose: true,
                    message: '错了哦，请先查找用户',
                    type: 'error'
                });
            }
        },
        // 消费弹窗
        filterNode(value, data) {
            if (!value) return true;
            console.log(data);
            return data.name.indexOf(value) !== -1;
        },
        handleSelectionChange: function(val) {
            this.check_list = val;
        },
        // handleChange: function(val) {
        //     console.log(val);
        // },
        //获取商品
        getSaleGood() {
            saleGoodsList().then(res => {
                this.data = res.data;
            });
        },
        chooseGoods(item, node, data) {
            if (node == true&&item.id > 0) {
                //加入购物车
                console.log('node', node);
                console.log(item);
                this.addCart(item);
            } else {
                console.log(item);  
            }
            // console.log("item",item);
            // console.log("node",node);
            // console.log("data",data);
        },
        //添加购物车
        addCart(data) {
            // if (this.cart_list.length == 0) {
                console.log(this.user.discount);
                let cut_price = data.price * this.user.discount*0.1;
                this.cart_list.push({
                    id:data.id,
                    name: data.name,
                    num: 1,
                    per_price: data.price ? data.price : 0,
                    price: cut_price
                });
            // }
        },
        removeClick(index, row){
            this.cart_list.splice(index, 1)
        },
        handleConsuption(){
          let data = {goods:this.cart_list}
          consumption(this.uid,{ data: Base64.encode(JSON.stringify(data)) }).then(res=>{
            this.$message({
                        showClose: true,
                        message: '消费成功',
                        type: 'success'
                    });
             this.resetGoodCount()
          })
        },
        resetGoodCount(){
            this.cart_list =[];
            this.handleSearch();
            this.shopCartVisible = false;
            this.$refs.tree.setCheckedKeys([]);
        },
        clearCart(){
            this.cart_list =[];
            this.$refs.tree.setCheckedKeys([]);
        }
    }
};
</script>
<style scoped>
.handle-input {
    width: 200px;
    margin-right: 10px;
}
.user_info {
    line-height: 30px;
}
.user_info span .blue {
    color: blue;
    margin-right: 20px;
}
.user_info span .red {
    color: red;
    margin-right: 20px;
}

/* 消费弹窗 */
.el-header {
    color: #333;
    height: auto;
}

.el-aside {
    color: #333;
}

.el-main {
}

body > .el-container {
    margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
    line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
    line-height: 320px;
}
</style>