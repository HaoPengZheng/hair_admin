<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 操作日志
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-date-picker
                    v-model="query.btime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                </el-date-picker>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="operator_name" label="操作人"></el-table-column>
                <el-table-column prop="created_at" label="时间"></el-table-column>
                <el-table-column prop="ip" label="ip"></el-table-column>
                <el-table-column prop="action" label="操作"></el-table-column>
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
import { logData } from '../../api/log';
export default {
    name: 'basetable',
    data() {
        return {
            query:{
                page: 1,
                limit: 5,
                btime:[]
            },
            tableData: [],
            multipleSelection: [],
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
            logData(this.query).then(res => {
                console.log(res);
                this.tableData = res.data.data;
                this.pageTotal = res.data.total;
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
