<template>
  <el-form ref="form" :model="formData" @submit.native.prevent="submitForm" label-width="0" style="width: 80%;">
    <el-form-item prop="textareaContent" :rules="[{ required: true, message: '内容不能为空' }]">
      <el-input type="textarea" v-model="formData.textareaContent" :rows="16" placeholder="请输入内容"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" native-type="submit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {  getAnnouncement,setAnnouncement } from '@/api/announcement'
export default {
  data() {
    return {
      formData: {
        textareaContent: ''
      }
    };
  },
  created(options){
    this.getAnnouncement()
  },
  methods: {
    getAnnouncement(){
        getAnnouncement().then((res) => {
        if (res.data.code === 1) {
            this.formData.textareaContent = res.data.data
        } else {
            this.$message.error(res.data.msg)
        }
        })
    },
    submitForm() {
        setAnnouncement( this.formData.textareaContent).then((res) => {
        if (res.data.code === 1) {
          this.$message.success('修改成功');
        } else {
          this.$message.error(res.data.msg);
        }
      }).catch((error) => {
        console.error('修改失败：', error);
        this.$message.error('修改失败，请重试');
      });
    }
  }
}
</script>

<style scoped>
.el-form-item {
  margin-top: 20px;
  margin-left: 20px;
}
</style>
