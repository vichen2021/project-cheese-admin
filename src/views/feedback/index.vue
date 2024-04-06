<template>
  <div>
    <el-table :data="feedbacks" style="width: 100%">
      <el-table-column prop="stuNumber" label="学号"></el-table-column>
      <el-table-column prop="feedback" label="反馈信息"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="showDetails(scope.row)">详情</el-button>
          <el-button type="danger" @click="deleteFeedback(scope.row.stuNumber)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogVisible" title="反馈详情" width="50%">
      <p>{{ currentFeedback.feedback }}</p>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      feedbacks: [],
      dialogVisible: false,
      currentFeedback: null
    };
  },
  created() {
    this.getFeedbacks();
  },
  methods: {
    getFeedbacks() {
      axios.get('/feedbacks')
        .then(response => {
          this.feedbacks = response.data;
        })
        .catch(error => {
          console.error('获取反馈信息失败:', error);
        });
    },
    showDetails(feedback) {
      this.currentFeedback = feedback;
      this.dialogVisible = true;
    },
    deleteFeedback(stuNumber) {
      axios.delete(`/feeback/${stuNumber}`)
        .then(response => {
          if (response.data.success) {
            this.$message.success('删除成功');
            // 删除成功后重新加载反馈信息
            this.getFeedbacks();
          } else {
            this.$message.error('删除失败');
          }
        })
        .catch(error => {
          console.error('删除反馈信息失败:', error);
          this.$message.error('删除失败，请重试');
        });
    }
  }
}
</script>
