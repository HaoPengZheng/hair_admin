<template>
    <div>
        <div>
            <el-button type="primary" @click="showAddDialog()" icon="el-icon-plus">新增类型</el-button>
        </div>
        <el-table :data="tableData">
            <el-table-column prop="id" label="ID"></el-table-column>
            <el-table-column prop="type_name" label="类型"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                        @click="showEditDialog(scope.$index, scope.row)"
                        icon="el-icon-edit"
                    >编辑</el-button>
                    <el-button
                        type="danger"
                        @click="delType(scope.$index, scope.row)"
                        icon="el-icon-delete"
                    >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="isShowEdit">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="名称">
                    <el-input v-model="form.type_name" placeholder="请输入分类名"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isShowEdit = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit" icon="el-icon-edit">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 添加弹出框 -->
        <el-dialog title="新增" :visible.sync="isShowAdd">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="名称">
                    <el-input v-model="form.type_name" placeholder="请输入分类名"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isShowAdd = false">取 消</el-button>
                <el-button type="primary" @click="saveAdd" icon="el-icon-plus">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { getGoodsTypes, editGoodsTypes, delGoodsTypes, addGoodsTypes } from '@/api/good';
export default {
    name: 'goodtype',
    data() {
        return {
            tableData: [],
            isShowEdit: false,
            isShowAdd: false,
            form: {}
        };
    },
    methods: {
        getGoodType() {
            getGoodsTypes({}).then(res => {
                console.log('type', res);
                this.tableData = res.data;
            });
        },
        showEditDialog(index, row) {
            this.isShowEdit = true;
            this.form = row;
        },
        saveEdit() {
            editGoodsTypes(this.form.id, { type_name: this.form.type_name })
                .then(res => {
                    if (res.code == 200) {
                        this.$message.success(res.msg);
                        this.isShowEdit = false;
                        this.$set(this.tableData, this.idx, this.form);
                    } else {
                        this.$message.error(res.msg);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
        delType(index, row) {
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    delGoodsTypes(row.id).then(res => {
                        if (res.code == 200) {
                            this.$message.success('删除成功');
                            this.tableData.splice(index, 1);
                        } else {
                            this.$message.error('删除失败');
                        }
                    });
                })
                .catch(() => {});
        },
        showAddDialog() {
            this.isShowAdd = true;
            this.form = {};
        },
        saveAdd() {
            addGoodsTypes({ type_name: this.form.type_name })
                .then(res => {
                    if (res.code == 200) {
                        this.$message.success(res.msg);
                        this.isShowAdd = false;
                        this.getGoodType();
                    } else {
                        this.$message.error(res.msg);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
    },
    created: function() {
        this.getGoodType();
    }
};
</script>