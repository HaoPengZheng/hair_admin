<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 交易记录
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                  <el-select v-model="query.type" placeholder="交易进出" class="handle-select mr10">
                    <el-option key="0" label="全部" value=""></el-option>
                    <el-option key="1" label="消费" value="0"></el-option>
                    <el-option key="2" label="充值" value="1"></el-option>
                </el-select>
                <el-date-picker
                    v-model="query.btime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
                总充值：{{addMoney}}元
                <el-divider direction="vertical"></el-divider>
                总消费：{{cutMoney}}元
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
                    :current-page="query.page"
                    :page-size="query.limit"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { transLogs } from '../../api/log';
export default {
    name: 'translogs',
    data() {
        return {
            query:{
                page: 1,
                limit: 50,
                btime:[],
                type:""
            },
            tableData: [],
            multipleSelection: [],
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1,
            cutMoney:0,
            addMoney:0
        };
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            transLogs(this.query).then(res => {
                console.log(res.data);
                this.tableData = res.data;
                this.pageTotal = res.total;
                this.cutMoney = res.total_money.cut;
                this.addMoney = res.total_money.add;
            });
        },
         // 触发搜索按钮
        handleSearch() {
            const d = new Date(this.query.btime[0]);
            const resDate1 = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
            const d1 = new Date(this.query.btime[1]);
            const resDate2 = d1.getFullYear() + '-' + (d1.getMonth() + 1) + '-' + d1.getDate();
            this.query.btime[0] = resDate1;
            this.query.btime[1] = resDate2;
            console.log(resDate1);
            this.$set(this.query, 'page', 1);
            this.getData();
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'page', val);
            this.getData();
        }
        
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
