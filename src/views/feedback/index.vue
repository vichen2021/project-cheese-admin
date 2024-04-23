<template>
  <div>
    <el-table :data="feedbacks" style="width: 100%">
      <el-table-column prop="stuNumber" label="学号"></el-table-column>
      <el-table-column prop="feedback" label="反馈信息"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="showDetails(scope.row)">详情</el-button>
          <el-button type="danger" @click="confirmDelete(scope.row.stuNumber)">处理</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogVisible" title="反馈详情" width="50%">
      <p v-if="currentFeedback">{{ currentFeedback.feedback }}</p>
    </el-dialog>
  </div>
</template>

<script>
import { getFeedbacks, deleteFeedback } from '@/api/feedback'

export default {
  data() {
    return {
      feedbacks: [],
      dialogVisible: false,
      currentFeedback: null,
    };
  },
  created() {
    this.getFeedbacks();
  },
  methods: {
    getFeedbacks() {
      getFeedbacks().then((res) => {
        if (res.data.code === 1) {
          this.feedbacks = Object.entries(res.data.data).map(([stuNumber, feedback]) => ({
            stuNumber,
            feedback
          }));
        } else {
          this.$message.error(res.data.msg);
        }
      }).catch((error) => {
        console.error('获取反馈信息失败:', error);
      });
    },
    showDetails(feedback) {
      this.currentFeedback = feedback;
      this.dialogVisible = true;
    },
    confirmDelete(stuNumber) {
      this.$confirm(`确定已经处理完成该反馈吗？<br><span style="color: red;">注意：操作后记录将无法撤销和恢复，请谨慎操作。</span>`, '提示', {
        dangerouslyUseHTMLString: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        // 在确认对话框中添加额外的描述文字
        type: 'warning'
      }).then(() => {
        this.deleteFeedback(stuNumber);
      }).catch(() => {
        this.$message.info('已取消处理');
      });
    },
    deleteFeedback(stuNumber) {
      console.log(stuNumber)
      deleteFeedback(stuNumber).then((response) => {
        if (response.data.code ==1) {
          this.$message.success('处理成功');
          this.getFeedbacks();
        } else {
          this.$message.error('处理失败');
        }
      }).catch((error) => {
        console.error('处理反馈信息失败:', error);
        this.$message.error('处理失败，请重试');
      });
    },
  },
};
</script>
