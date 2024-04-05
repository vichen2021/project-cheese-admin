<template>
    <div class="addBrand-container">
        <HeadLable :title="title" :goback="true" />
        <div class="container">
            <el-form
                ref="ruleForm"
                :model="ruleForm"
                :rules="rules"
                :inline="false"
                label-width="180px"
                class="demo-ruleForm"
            >
                <div>
                    <el-form-item label="店铺头像:" prop="avatar">
                        <image-upload :prop-image-url="imageUrl" @imageChange="imageChange">
                            图片大小不超过2M
                            <br />仅能上传 PNG JPEG JPG类型图片
                            <br />建议上传200*200或300*300尺寸的图片
                        </image-upload>
                    </el-form-item>
                </div>
                <el-form-item label="账号:" prop="username">
                    <el-input v-model="ruleForm.username" placeholder="请输入账号" maxlength="20" />
                </el-form-item>
                <el-form-item label="店铺名称:" prop="name">
                    <el-input v-model="ruleForm.name" placeholder="请输入店铺名称" maxlength="12" />
                </el-form-item>
                <el-form-item label="手机号:" prop="phone">
                    <el-input v-model="ruleForm.phone" placeholder="请输入手机号" maxlength="11" />
                </el-form-item>
                <el-form-item label="身份证号:" prop="idNumber" class="idNumber">
                    <el-input v-model="ruleForm.idNumber" placeholder="请输入身份证号" maxlength="20" />
                </el-form-item>
                <el-form-item label="店铺位置:" prop="address" class="address">
                    <el-input v-model="ruleForm.address" placeholder="请输入位置" maxlength="30" />
                </el-form-item>
                <el-form-item label="店铺公告:" prop="announcement" class="announcement">
                    <el-input
                        type="textarea"
                        :rows="3"
                        placeholder="请输入内容"
                        prop="announcement"
                        class="announcement"
                        maxlength="255"
                        style="width:500px"
                        v-model="ruleForm.announcement"
                    ></el-input>
                </el-form-item>
                <div class="subBox address">
                    <!-- <el-form-item> -->
                    <el-button @click="() => $router.push('/merchantDetail')">取消</el-button>
                    <el-button
                        type="primary"
                        :class="{ continue: actionType === 'add' }"
                        @click="submitForm('ruleForm', false)"
                    >保存</el-button>
                    <!-- </el-form-item> -->
                </div>
            </el-form>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HeadLable from '@/components/HeadLable/index.vue'
import { queryMerchantById, editMerchant } from '@/api/merchant'
import ImageUpload from '@/components/ImgUpload/index.vue'

@Component({
    name: 'eidtMerchant',
    components: {
        HeadLable,
        ImageUpload,
    },
})
export default class extends Vue {
    private imageUrl: string = ''
    private title = '添加店铺'
    private actionType = ''
    private ruleForm = {
        name: '',
        phone: '',
        address: '',
        idNumber: '',
        username: '',
        avatar: '',
    }

    private isCellPhone(val: any) {
        // if (!/^1(3|4|5|6|7|8)\d{9}$/.test(val)) {
        //   return false
        // } else {
        return true
        // }
    }

    private checkphone(rule: any, value: any, callback: any) {
        // let phoneReg = /(^1[3|4|5|6|7|8|9]\d{9}$)|(^09\d{8}$)/;
        if (value == '') {
            callback(new Error('请输入手机号'))
        } else if (!this.isCellPhone(value)) {
            //引入methods中封装的检查手机格式的方法
            callback(new Error('请输入正确的手机号!'))
        } else {
            callback()
        }
    }

    private validID(rule: any, value: any, callback: any) {
        // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
        let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
        if (value == '') {
            callback(new Error('请输入身份证号码'))
            //reg.test(value)
        } else if (true) {
            callback()
        } else {
            callback(new Error('身份证号码不正确'))
        }
    }

    get rules() {
        return {
            name: [
                {
                    required: true,
                    // 'message': '请输入店铺名称',
                    validator: (
                        rule: any,
                        value: string,
                        callback: Function
                    ) => {
                        if (!value) {
                            callback(new Error('请输入店铺名称'))
                        } else {
                            // const reg = /^[\u4e00-\u9fa5_a-zA-Z]{1,12}$/
                            // if (!reg.test(value)) {
                            //   callback(new Error('姓名输入不符，请输入1-12个字符'))
                            // } else {
                            //   callback()
                            // }
                            callback()
                        }
                    },
                    trigger: 'blur',
                },
            ],
            username: [
                {
                    required: true,
                    // message: '请输入账号',
                    validator: (
                        rule: any,
                        value: string,
                        callback: Function
                    ) => {
                        if (!value) {
                            callback(new Error('请输入账号'))
                        } else {
                            const reg = /^([a-z]|[0-9]){3,20}$/
                            if (!reg.test(value)) {
                                callback(
                                    new Error('账号输入不符，请输入3-20个字符')
                                )
                            } else {
                                callback()
                            }
                        }
                    },
                    trigger: 'blur',
                },
            ],
            phone: [
                { required: true, validator: this.checkphone, trigger: 'blur' },
            ],
            idNumber: [
                { required: true, validator: this.validID, trigger: 'blur' },
            ],
        }
    }

    created() {
        this.actionType = this.$route.query.id ? 'edit' : 'add'
        if (this.$route.query.id) {
            this.title = '修改店铺信息'
            this.init()
        }
    }

    private async init() {
        const id = this.$route.query.id
        queryMerchantById(id).then((res: any) => {
            // String(res.status) === '200'
            if (res.data.code === 1) {
                this.ruleForm = res.data.data
                // this.ruleForm.password = ''
                this.imageUrl = res.data.data.avatar
            } else {
                this.$message.error(res.data.msg)
            }
            // if (res.data.code == 200) {
            //   const { data } = res.data
            //   this.ruleForm = data
            //   this.ruleForm.password = ''
            //   // this.ruleForm.rePassword = '' //JSON.parse(JSON.stringify(data.password));
            // } else {
            //   this.$message.error(res.data.desc)
            // }
        })
    }

    private submitForm(formName: any, st: any) {
        ;(this.$refs[formName] as any).validate((valid: any) => {
            if (valid) {
                const params = {
                    ...this.ruleForm,
                }
                editMerchant(params)
                    .then((res: any) => {
                        if (res.data.code === 1) {
                            this.$message.success('店铺信息修改成功！')
                            this.$router.push({ path: '/merchantDetail' })
                        } else {
                            this.$message.error(res.data.msg)
                        }
                    })
                    .catch((err) => {
                        this.$message.error('请求出错了：' + err.message)
                    })
            } else {
                return false
            }
        })
    }
    imageChange(value: any) {
        this.ruleForm.avatar = value
    }
}
</script>

<style lang="scss" scoped>
.addBrand {
    &-container {
        margin: 30px;
        margin-top: 0px;
        .HeadLable {
            background-color: transparent;
            margin-bottom: 0px;
            padding-left: 0px;
        }
        .container {
            position: relative;
            z-index: 1;
            background: #fff;
            padding: 30px;
            border-radius: 4px;
            // min-height: 500px;
            .subBox {
                padding-top: 30px;
                text-align: center;
                border-top: solid 1px $gray-5;
            }
        }
        .idNumber {
            margin-bottom: 39px;
        }

        .el-form-item {
            margin-bottom: 29px;
        }
        .el-input {
            width: 293px;
        }
    }
}
</style>
