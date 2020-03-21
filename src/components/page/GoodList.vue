<template>
    <div>
        <div>
            <el-input v-model="name" placeholder="商品名" style="width:300px" @blur="doSearch"></el-input>
            <el-button icon="el-icon-search" circle @click="doSearch"></el-button>
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
            </el-switch>-->
        </div>
        <el-table
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)"
            :data="goodData"
            style="width: 100%"
        >
            <el-table-column prop="id" label="Id" sortable></el-table-column>
            <el-table-column prop="name" label="商品名" sortable></el-table-column>
            <el-table-column prop="image" label="图片">
                <template slot-scope="scope">
                    <img :src="scope.row.image " style="width:30px" />
                </template>
            </el-table-column>
            <el-table-column prop="price" label="价格" sortable></el-table-column>
            <el-table-column prop="is_sale_name" label="上下架" sortable></el-table-column>
            <el-table-column prop="is_order_name" label="是否预约" sortable></el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button
                        type="text"
                        size="small"
                        @click="editClick(scope.$index, scope.row)"
                    >编辑</el-button>
                    <el-button @click="handleClick(scope.row)" type="text" size="small">上下架</el-button>
                </template>
            </el-table-column>
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
        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="60%">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="服务名称">
                    <el-input v-model="form.name" placeholder="请输入名称"></el-input>
                </el-form-item>
                <el-form-item label="服务价格">
                    <el-input
                        v-model="form.price"
                        placeholder="请输入价格（人民币）"
                        style="width:35%;margin-right: 20px;"
                    ></el-input>
                    <el-radio-group v-model="form.price_type" size="mini" @change="chooseType">
                        <el-radio-button label="0">自定义</el-radio-button>
                        <el-radio-button label="1">面议</el-radio-button>
                        <el-radio-button label="2">不显示</el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="服务封面">
                    <div class="crop-demo">
                        <img :src="cropImg" class="pre-img" />
                        <div class="crop-demo-btn">
                            选择图片
                            <input
                                class="crop-input"
                                type="file"
                                name="image"
                                accept="image/*"
                                @change="setImage"
                            />
                        </div>
                    </div>

                    <el-dialog title="裁剪图片" :visible.sync="dialogVisible" width="30%">
                        <vue-cropper
                            ref="cropper"
                            :src="imgSrc"
                            :ready="cropImage"
                            :zoom="cropImage"
                            :cropmove="cropImage"
                            style="width:100%;height:300px;"
                        ></vue-cropper>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="cancelCrop">取 消</el-button>
                            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                        </span>
                    </el-dialog>
                </el-form-item>
                <el-form-item label="服务时长">
                    <el-input v-model="form.duration" placeholder="请输入服务时长"></el-input>
                </el-form-item>
                <el-form-item label="设置库存">
                    <el-input v-model="form.stock" placeholder="请输入库存"></el-input>
                </el-form-item>
                <el-form-item label="是否上架">
                    <el-switch v-model="form.is_sale"></el-switch>
                </el-form-item>
                <el-form-item label="是否预约">
                    <el-switch v-model="form.is_order"></el-switch>
                </el-form-item>
                <el-form-item label="服务简介">
                    <el-input type="textarea" rows="5" v-model="form.desc"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import VueCropper from 'vue-cropperjs';
import { goodlist, updateGoods } from '@/api/good';
export default {
    name: 'good-list',
    data() {
        return {
            query: {
                page: 1,
                limit: 30
            },
            name: '',
            tableData: [],
            goodData: [],
            loading: false,
            pageTotal: 1,
            editVisible: false,
            form: {},
            cropImg: '',
            dialogVisible: false,
            pricedDisplay: true,
            imgSrc: '',
            defaultSrc: ''
        };
    },
    created() {
        this.doSearch();
        // this.cropImg = this.defaultSrc;
    },
    components: {
        VueCropper
    },
    methods: {
        doSearch() {
            let param = this.query;
            if (this.name != '') {
                param.name = this.name;
            }
            goodlist(param).then(res => {
                res.data.data.forEach(item => {
                    if (item.price_type == 1) {
                        item.price = '面议';
                    }else if (item.price_type == 2){
                      item.price = item.price+"(不显示)";
                    }
                    if (item.is_sale == 1) {
                        item.is_sale_name = '上架中';
                        item.is_sale = true;
                    } else {
                        item.is_sale_name = '已下架';
                        item.is_sale = false;
                    }
                    if (item.is_order == 1) {
                        item.is_order = true;
                        item.is_order_name = '可预约';
                    } else {
                        item.is_order = false;
                        item.is_order_name = '不可预约';
                    }
                });
                this.goodData = res.data.data;
                this.pageTotal = res.data.total;
                this.query.page = res.data.current_page;
            });
        },
        handleClick(e) {
            console.log(e);
            if (e.is_sale == 1) {
                var msg = '是否下架' + e.name + '?';
            } else {
                var msg = '是否上架' + e.name + '？';
            }
            this.$confirm(msg, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                //点击确定按钮的操作
                this.loading = true;
                let param = {};
                param.is_sale = e.is_sale == 1 ? 0 : 1;
                updateGoods(e.id, param)
                    .then(res => {
                        e.is_sale = param.is_sale;
                        e.is_sale_name = e.is_sale == 0 ? '上架中' : '已下架';
                        this.$message.success(res.msg);
                    })
                    .catch(err => {
                        this.$message.error('更新异常');
                    });
                this.loading = false;
                this.doSearch();
            });
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'page', val);
            this.doSearch();
        },
        // 编辑操作
        editClick(index, row) {
            console.log(row);
            this.idx = index;
            this.form = row;
            this.editVisible = true;
            this.cropImg = row.image;
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            if (this.form.is_sale == true) {
                this.form.is_sale_name = '上架中';
            } else {
                this.form.is_sale_name = '已下架';
            }
            if (this.form.is_order == true) {
                this.form.is_order_name = '可预约';
            } else {
                this.form.is_order_name = '不可预约';
            }
            let params = {};
            params.name = this.form.name;
            params.price_type = this.form.price_type;
            params.price = this.form.price;
            params.duration = this.form.duration;
            params.stock = this.form.stock;
            params.is_sale = this.form.is_sale;
            params.is_order = this.form.is_order;
            params.desc = this.form.desc;
            var reg = /^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s]*?)\s*$/i;
            if (reg.test(this.cropImg)) {
                params.image = this.cropImg;
            }
            updateGoods(this.form.id, params)
                .then(res => {
                    this.form.is_sale_name = this.form.is_sale == 0 ? '上架中' : '已下架';
                    this.form.is_order_name = this.form.is_order_name == 0 ? '可预约' : '不可预约';
                    this.$message.success(res.msg);
                    // this.$set(this.tableData, this.idx, this.form);
                    this.doSearch();
                })
                .catch(err => {
                    this.$message.error('更新异常');
                });
        },
        chooseType(value) {
            console.log(value);
            if (value == 1) this.price = '';
            else if (value == 2) {
                this.price = '面议';
            } else if (value == 3) {
                this.price = '不显示';
            }
        },
        setImage(e) {
            const file = e.target.files[0];
            if (!file.type.includes('image/')) {
                return;
            }
            const reader = new FileReader();
            reader.onload = event => {
                this.dialogVisible = true;
                this.imgSrc = event.target.result;
                this.$refs.cropper && this.$refs.cropper.replace(event.target.result);
            };
            reader.readAsDataURL(file);
        },
        cropImage() {
            this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
        },
        cancelCrop() {
            this.dialogVisible = false;
            this.cropImg = this.defaultSrc;
        }
    }
};
</script>

<style>
.pre-img {
    width: 100px;
    height: 100px;
    background: #f8f8f8;
    border: 1px solid #eee;
    border-radius: 5px;
}
.crop-demo {
    display: flex;
    align-items: flex-end;
}
.crop-demo-btn {
    position: relative;
    width: 100px;
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    margin-left: 30px;
    background-color: #409eff;
    color: #fff;
    font-size: 14px;
    border-radius: 4px;
    box-sizing: border-box;
}
.crop-input {
    position: absolute;
    width: 100px;
    height: 40px;
    left: 0;
    top: 0;
    opacity: 0;
    cursor: pointer;
}
</style>