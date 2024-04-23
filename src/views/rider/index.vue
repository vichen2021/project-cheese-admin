<template>
  <div class="dashboard-container">
    <div class="container"> 
      <div class="tableBar"  style="display: inline-block; width: 100%">
        <label style="margin-right: 5px">配送员姓名：</label>
        <el-input
          v-model="input"
          placeholder="请输入配送员姓名"
          style="width: 15%"
          clearable
          @clear="init"
          @keyup.enter.native="initFun"
        />
        <label style="margin-right: 5px; margin-left: 20px">身份证号：</label>
        <el-input
          v-model="idNumber"
          placeholder="请输入身份证号"
          style="width: 15%"
          clearable
          @clear="init"
          @keyup.enter.native="initFun"
        />
        <label style="margin-right: 5px; margin-left: 20px">手机号：</label>
        <el-input
          v-model="phone"
          placeholder="请输入手机号"
          style="width: 15%"
          clearable
          @clear="init"
          @keyup.enter.native="initFun"
        />
        <el-checkbox v-model="checked" style="margin-right: 5px; margin-left: 20px">只看本店</el-checkbox>
        <el-button class="normal-btn continue" @click="init(true)"
          >查询</el-button
        >
        <el-button
          type="primary"
          style="float: right"
          @click="addRiderHandle('add')"
        >
          + 添加配送员
        </el-button>
      </div>
      <el-table
        :data="tableData"
        stripe
        v-if="tableData.length"
        class="tableBox"
      >
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="stuNumber" label="学号" />
        <el-table-column prop="phone" label="手机号" />
        <el-table-column prop="sex" label="性别" />
        <el-table-column prop="idNumber" label="身份证号" />
        <el-table-column label="账号状态">
          <template slot-scope="scope">
            <div
              class="tableColumn-status"
              :class="{ 'stop-use': String(scope.row.status) === '0' }"
            >
              {{ String(scope.row.status) === '0' ? '禁用' : '启用' }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="updateTime" label="最后操作时间" />
        <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              class="blueBug"
              :class="{ 'disabled-text': merchantId < 101 }"
              :disabled="merchantId < 101"
              @click="addRiderHandle(scope.row.id, scope.row.ridername)"
              :style="{display:merchantId > 100 ?'none':''}"
            >
              修改
            </el-button>
            <el-button
              :disabled="merchantId < 101"
              type="text"
              size="small"
              class="non"
              :class="{
                'disabled-text': merchantId < 100,
                blueBug: scope.row.status == '0',
                delBut: scope.row.status != '0',
              }"
              @click="statusHandle(scope.row)"
              :style="{display:merchantId > 100 ?'none':''}"
            >
              {{ scope.row.status == '1' ? '禁用' : '启用' }}
            </el-button>
            <el-button
              :disabled="merchantId < 101"
              type="text"
              size="small"
              class="non"
              :class="{
                'disabled-text': merchantId < 101,
                blueBug: scope.row.status == '0',
                delBut: scope.row.status != '0',
              }"
              @click="bindRider(scope.row)"
              :style="{display:merchantId < 101 ?'none':''}"
            >
              {{ scope.row.isBound == 0 ? '绑定' : '解绑' }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <Empty v-else :is-search="isSearch" />
      <el-pagination
        class="pageList"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="counts"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HeadLable from '@/components/HeadLable/index.vue'
import {getRiderPage,enableOrDisableRider,bindRider} from '@/api/rider'
import { UserModule } from '@/store/modules/user'
import InputAutoComplete from '@/components/InputAutoComplete/index.vue'
import Empty from '@/components/Empty/index.vue'
import Cookies from 'js-cookie'
@Component({
  name: 'Rider',
  components: {
    HeadLable,
    InputAutoComplete,
    Empty,
  },
})
export default class extends Vue {
  private input: any = ''
  private phone = '' //搜索条件的手机号
  private idNumber = '' //搜索条件的身份证号码
  private counts: number = 0
  private page: number = 1
  private pageSize: number = 10
  private tableData = []
  private id = ''
  private status = ''
  private isBound :number = 0
  private isSearch: boolean = false
  private merchantId :number = 101
  private checked:Boolean = true

  created() {
    // 获取用户权限
const userInfoCookie = Cookies.get('user_info');
if (userInfoCookie) {
  const userInfo = JSON.parse(userInfoCookie);
  this.merchantId = userInfo.id;
  console.log(this.merchantId)
  }
    this.init()
  }

  initProp(val) {
    this.input = val
    this.initFun()
  }

  initFun() {
    this.page = 1
    this.init()
  }

  get riderName() {
    return UserModule.username
  }

  private async init(isSearch?: boolean) {
    this.isSearch = isSearch
    const params = {
      page: this.page,
      pageSize: this.pageSize,
      name: this.input ? this.input : undefined,
      idnumber: this.idNumber || undefined,
      phone: this.phone || undefined,
      isCurrent:this.checked ? 1 : 0 
    }
    await getRiderPage(params)
      .then((res: any) => {
        if (String(res.data.code) === '1') {
          this.tableData = res.data && res.data.data && res.data.data.records
          this.counts = res.data.data.total
        }
        // if (!res.data.data.records.length && type === 'search') {
        //   this.$message.error('未搜索到相关商户，请核对商户名称是否正确')
        // }
      })
      .catch((err) => {
        this.$message.error('请求出错了：' + err.message)
      })
  }

  // 添加
  private addRiderHandle(st: string, ridername: string) {
    if (st === 'add') {
      this.$router.push({ path: '/rider/add' })
    } else {
      if (ridername === 'admin') {
        return
      }
      this.$router.push({ path: '/rider/add', query: { id: st } })
    }
  }

  //状态修改
  private statusHandle(row: any) {
    if (row.ridername === 'admin') {
      return
    }
    this.id = row.id
    this.status = row.status
    this.$confirm('确认调整该账号的状态?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(() => {
      enableOrDisableRider({ id: this.id, status: !this.status ? 1 : 0 })
        .then((res) => {
          if (String(res.status) === '200') {
            this.$message.success('账号状态更改成功！')
            this.init()
          }
        })
        .catch((err) => {
          this.$message.error('请求出错了：' + err.message)
        })
    })
  }
  private bindRider(row: any) {
    this.id = row.id
    this.isBound = row.isBound
    this.$confirm('确认调整与该配送员的绑定状态?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(() => {
      bindRider({ id: this.id, isBound:this.isBound == 1 ? 0 : 1 })
        .then((res) => {
          if (String(res.status) === '200') {
            this.$message.success('账号状态更改成功！')
            this.init()
          }
        })
        .catch((err) => {
          this.$message.error('请求出错了：' + err.message)
        })
    })
  }
  private handleSizeChange(val: any) {
    this.pageSize = val
    this.init()
  }

  private handleCurrentChange(val: any) {
    this.page = val
    this.init()
  }
}
</script>

<style lang="scss" scoped>
.disabled-text {
  color: #bac0cd !important;
}
</style>
