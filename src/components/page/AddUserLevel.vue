<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 服务管理
        </el-breadcrumb-item>
        <el-breadcrumb-item>新增会员等级</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="form-box">
        <el-form
          ref="form"
          :model="form"
          label-width="80px"
        >
          <el-form-item label="会员等级名称">
            <el-input
              v-model="form.name"
              placeholder="请输入名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="会员等级金钱">
            <el-input
              v-model="form.add_money"
              placeholder="请输入会员等级金钱"
            ></el-input>
          </el-form-item>
          <el-form-item label="会员等级折扣">
            <el-input
              v-model="form.discount"
              placeholder="请输入会员等级折扣"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="onSubmit"
            >表单提交</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { addUserLevel } from '@/api/member';
export default {
    data: function() {
        return {
            form: {
                name: '',
                add_money: '',
                discount: ''
            }
        };
    },
    methods: {
       
        onSubmit() {
            addUserLevel(this.form).then(res => {
                console.log(res);
                this.$message.success('提交成功！');
            });

            // this.$message.success('提交成功！');
        }
    }
};
</script>
