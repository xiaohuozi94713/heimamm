<template>
  <div class="bigBox">
    <div class="leftBox">
      <div class="title">
        <img src="../../assets/titleimg.png" class="titleImg" alt />
        <span class="titleTxt">黑马面面</span>
        <span class="titleLine"></span>
        <span class="titleLogin">用户登录</span>
      </div>
      <!-- 使用表单元素完成结构 -->
      <!-- :model:form 指当前form 绑定的数据源 
           label-width 左侧文本的宽度
      -->
      <el-form :rules="rules" class="loginform" ref="form" :model="form" label-width="0">
        <!-- el-form-item：表单中的一个部分，表单域 -->
        <el-form-item prop="phone">
          <!-- prefix-icon:输入框左侧得小图标 -->
          <el-input v-model="form.phone" prefix-icon="el-icon-user" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" prefix-icon="el-icon-lock" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <!-- 使用栅格系统来添加内容 -->
          <!-- el-row:一行 -->
          <el-row>
            <!-- el-col:一列  span：当前列占这行的份数（栅栏布局把一行总共分为24份） -->
            <el-col :span="17">
              <el-input v-model="form.code" prefix-icon="el-icon-key" placeholder="请输入验证码"></el-input>
            </el-col>
            <el-col :span="7">
              <img :src="imgUrl" class="loginCode" @click="getCode" alt />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item prop="isCheck">
          <el-checkbox v-model="form.isCheck" label="A">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button class="loginBtn" type="primary" @click="onSubmit">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-button class="loginBtn" type="primary" @click="openRegister">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <img src="../../assets/login_banner_ele.png" class="rightImg" alt />
    <!-- 注册组件 -->
    <register ref="register" />
  </div>
</template>

<script>
//导入register组件
import register from "./components/register";
//导入自定义校验规则mycheck.js 按需导入
import { checkPhone } from "@/utils/mycheck.js";
//导入login.js完成登录请求
import { apiLogin } from "@/api/login.js";
//导入mytoken.js处理localstorage
import { setToken } from "../../utils/mytoken";

// var checkPhone = (rule, value, callback) => {
//   //定义一个验证手机号码的正则
//   var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
//   if (reg.test(value)) {
//     callback();
//   } else {
//     callback(new Error("手机号不正确"));
//   }
// };

export default {
  //注册组件
  components: {
    register
  },
  data() {
    return {
      imgUrl: process.env.VUE_APP_URL + "/captcha?type=login&t=" + new Date(),
      form: {
        //手机号
        phone: "18511111111",
        //是否阅读 多选框初始值必须设置为数组，否则会出问题
        isCheck: ['A'],
        //密码
        password: "12345678",
        //验证码
        code: ""
      },
      //设置表单验证规则
      rules: {
        //验证手机号码规则
        phone: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" }
        ],
        //验证密码规则
        password: [
          //验证规则：required 必填项  message 不填时的提示信息 trigger 触发验证码的条件
          { required: true, message: "密码不能为空", trigger: "blur" },
          //验证规则：min 最小长度  max 最大长度 message 提示信息 trigger 触发验证码的条件
          { min: 5, max: 10, message: "密码长度必须是5~10", trigger: "blur" }
        ],
        //验证验证码规则
        code: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
          { min: 4, max: 4, message: "验证码长度必须是4", trigger: "blur" }
        ],
        //是否阅读的验证规则
        isCheck: [
          {
            type: "array",
            required: true,
            message: "请阅读并同意用户协议和隐私条款",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    //点击登录按钮时触发
    onSubmit() {
      //调用form的验证方法
      this.$refs.form.validate(valid => {
        if (valid) {
          apiLogin({
            phone: this.form.phone,
            password: this.form.password,
            code: this.form.code
          }).then(res => {
            //window.console.log(res.data.data.token); 登录token
            //跳转到首页
            this.$router.push('/index');
            //将登录信息保存起来（保存token）
            setToken(res.data.data.token);
          });
        } else {
          this.$message.error("验证不通过");
        }
      });
    },
    //获取验证码
    getCode() {
      this.imgUrl =
        process.env.VUE_APP_URL + "/captcha?type=login&t=" + new Date();
    },
    //打开注册面板
    openRegister() {
      this.$refs.register.dialogFormVisible = true;
    }
  }
};
</script>

<style lang="less">
.bigBox {
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  display: flex;
  justify-content: space-around;
  align-items: center;

  .leftBox {
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
    padding: 48px 42px 86px;

    .title {
      display: flex;
      /* 垂直居中 */
      align-items: center;
      .titleImg {
        width: 22px;
        height: 17px;
      }

      .titleTxt {
        font-size: 24px;
        font-family: SourceHanSansCN;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
        margin-left: 16px;
        margin-right: 14px;
      }

      .titleLine {
        width: 1px;
        height: 28px;
        background: rgba(199, 199, 199, 1);
        margin-right: 12px;
      }

      .titleLogin {
        font-size: 22px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
      }
    }

    .loginform {
      margin-top: 29px;

      .loginCode {
        width: 100%;
        height: 40px;
        cursor: pointer;
      }

      .loginBtn {
        width: 100%;
      }
    }
  }

  .rightImg {
    width: 633px;
    height: 435px;
  }
}
</style>