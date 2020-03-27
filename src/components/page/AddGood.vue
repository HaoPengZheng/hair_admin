<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 服务管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>新增服务</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="服务名称">
                        <el-input v-model="form.name" placeholder="请输入名称"></el-input>
                    </el-form-item>
                    <el-form-item label="服务分类">
                        <el-select v-model="form.good_type" placeholder="请选择">
                            <el-option
                                v-for="item in types"
                                :key="item.id"
                                :label="item.type_name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
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
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">表单提交</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import VueCropper from 'vue-cropperjs';
import { addGood, getGoodsTypes } from '@/api/good';
export default {
    name: 'upload',
    data() {
        return {
            defaultSrc: require('../../assets/img/img.jpg'),
            fileList: [],
            imgSrc: '',
            cropImg: '',
            dialogVisible: false,
            pricedDisplay: true,
            form: {
                name: '',
                price: '',
                price_type: 0,
                duration: '',
                is_order: true,
                is_sale: true,
                desc: '',
                good_type:''
            },
            types: [] //商品类型
        };
    },
    components: {
        VueCropper
    },
    methods: {
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
        },
        imageuploaded(res) {
            console.log(res);
        },
        handleError() {
            this.$notify.error({
                title: '上传失败',
                message: '图片上传接口上传失败，可更改为自己的服务器接口'
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
        onSubmit() {
            this.form.image = this.cropImg;
            addGood(this.form).then(res => {
                console.log(res);
                this.$message.success('提交成功！');
                this.$router.push('/good/list');
            });

            // this.$message.success('提交成功！');
        },
        getGoodType() {
            getGoodsTypes({}).then(res => {
                console.log('type', res);
                this.types = res.data;
            });
        }
    },
    created: function() {
        this.cropImg = this.defaultSrc;
        this.getGoodType();
    }
};
</script>

<style scoped>
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