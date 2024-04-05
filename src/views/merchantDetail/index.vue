<template>
  <div class="merchant-info">
    <el-card class="info-card" shadow="hover">
      <div class="info-content">
        <div class="info-left">
          <div class="info-item">
            <label>|&nbsp;商户ID</label>
            <span>{{ merchantInfo.id }}</span>
          </div>
          <div class="info-item">
            <label>|&nbsp;店铺头像</label>
            <el-avatar v-if="!editing" shape="square" :size="100" :fit="fit" :src="merchantInfo.avatar"></el-avatar>
            <div v-else>
              <image-upload :prop-image-url="imageUrl"
                          @imageChange="imageChange">
              图片大小不超过2M<br>仅能上传 PNG JPEG JPG类型图片<br>建议上传200*200或300*300尺寸的图片
            </image-upload>
            </div>
          </div>
          <div class="info-item">
            <label>|&nbsp;店铺名称</label>
            <span v-if="!editing">{{ merchantInfo.name }}</span>
            <el-input v-else v-model="merchantInfo.name" prop="name" :placeholder="merchantInfo.name" clearable></el-input>
          </div>
          <div class="info-item">
            <label>|&nbsp;用户名</label>
            <span v-if="!editing">{{ merchantInfo.username }}</span>
            <el-input v-else v-model="merchantInfo.username" prop="username" :placeholder="merchantInfo.username" clearable></el-input>
          </div>
          <div class="info-item">
            <label>|&nbsp;店主身份证号</label>
            <span v-if="!editing">{{ merchantInfo.idNumber }}</span>
            <el-input v-else v-model="merchantInfo.idNumber" prop="idNumber" :placeholder="merchantInfo.idNumber" clearable></el-input>       
          </div>
        </div>
        <div class="info-right">
        <div class="info-item">
            <label>|&nbsp;账号状态</label>
            <span>{{ merchantInfo.status =="1"?"正常":"冻结" }}</span>
          </div>
          <div class="info-item">
            <label>|&nbsp;联系电话</label>
            <span v-if="!editing">{{ merchantInfo.phone }}</span>
            <el-input v-else v-model="merchantInfo.phone" prop="phone" :placeholder="merchantInfo.phone" clearable></el-input>
          </div>
          <div class="info-item">
            <label>|&nbsp;地址</label>
            <span v-if="!editing">{{ merchantInfo.address || '暂无' }}</span>
             <el-input v-else v-model="merchantInfo.address" prop="name" :placeholder="merchantInfo.address" clearable></el-input>
          </div>
          <div class="info-item">
            <label>|&nbsp;店铺公告</label>
            <span v-if="!editing">{{ merchantInfo.announcement || '暂无' }}</span>
             <el-input v-else v-model="merchantInfo.announcement" prop="announcement" :placeholder="merchantInfo.announcement" clearable></el-input>
          </div>
          <!-- 修改信息按钮 -->
          <div class="info-item edit-button">
            <el-button type="primary" @click="toggleEditMode">{{ editing ? '保存' : '修改信息' }}</el-button>
            <el-button v-if="editing" type="default" @click="cancel">取消</el-button>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { queryMerchantById } from '@/api/merchant'
import { UserModule } from '@/store/modules/user'
import Cookies from 'js-cookie'
import ImageUpload from '@/components/ImgUpload/index.vue'
export default  {
  name: 'MerchantDetail',
  components:{
    ImageUpload
  },
  data() {
    return {
      merchantInfo: null,
      editing: false,
      imageUrl:''
    };
  },
  methods: {
    // 从后端获取商户信息的方法(通过前台获取到的当前登录id获取)
    async fetchMerchantInfo() {
      await queryMerchantById(this.getCurrentId())
        .then((res) =>{
            this.merchantInfo = res.data.data
            this.imageUrl = res.data.data.avatar
        });
    },
    // 获取当前登录商户id
    getCurrentId() {
        return  (UserModule.userInfo as any).name
      ? (UserModule.userInfo as any).name
      : JSON.parse(Cookies.get('user_info') as any).id
      },
    // 修改商户信息的方法
    async toggleEditMode() {

      this.$router.push({ path: '/merchantDetail/edit', query: { id:  this.merchantInfo.id } })
      // if (this.editing) {
      //   // 调用后端接口保存修改后的信息
      //   await this.saveMerchantInfo();
      // }
      //this.editing = !this.editing;
    },
    async saveMerchantInfo() {
      // 调用后端接口保存商户信息
      // 示例中省略调用后端接口的过程，你需要根据实际情况补充此处的保存逻辑
    },
    // 更新图片
    imageChange(value: any) {
      this.merchantInfo.avatar = value
    },
    // 取消编辑
    cancel(){
      this.$router.replace({ path:'/merchantDetail/reload' })
    }
  },
  created() {
    // 在组件创建时获取商户信息
    this.fetchMerchantInfo();
  }
};
</script>

<style scoped>
.merchant-info {
  margin: 20px;
}

.info-card {
  width: 100%;
  margin: auto;
}

.info-content {
  display: flex;
}

.info-left {
  flex: 1;
  margin-left: 100px;
}

.info-right {
  flex: 1;
  margin-left: 30px; /* 调整右侧内容与左侧内容的距离 */
}

.info-item {
  margin-bottom: 30px;
}

.info-item label {
  color: #FEBC4A;
  font-weight: bold;
  font-size: 18px;
  margin-right: 10px;
  margin-top: 10px;
  
}

.info-item span {
  margin-top: 15px;
  margin-left: 5px;
  display: block;
  font-weight: bold;
  color: #8c8d92;
}

.info-right .info-item {
  margin-left: 0; /* 右侧内容的项不需要左边距 */
}

.edit-button {
  text-align: left; /* 将按钮左对齐 */
}

</style>
