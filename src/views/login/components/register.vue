<template>
  <el-dialog title="用户注册" class="reg_dialog" :visible.sync="dialogFormVisible">
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="昵称" :label-width="formLabelWidth" prop="nickname">
        <el-input v-model="form.nickname" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机" :label-width="formLabelWidth" prop="phone">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
        <el-input v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="图形码" :label-width="formLabelWidth" prop="codeImg">
        <el-row>
          <el-col :span="17">
            <el-input v-model="form.codeImg" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="7" class="imgBox">
            <img @click="changeImg" :src="imgUrl" class="codeImg" alt />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="验证码" :label-width="formLabelWidth" prop="registerCode">
        <el-row>
          <el-col :span="17">
            <el-input v-model="form.registerCode" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="7" class="imgBox">
            <el-button :disabled="time !== 0" class="reg_btn" @click="getCode">
              {{ time === 0 ? '获取用户验证码' : time }}
            </el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
//导入register.js
import { apiGetCode } from "../../../api/register";

//定义校验方法
/* rule:触发这个验证的相关属性
 * value:当前输入框中的内容
 * callback:代码执行完毕之后，告诉element 的执行结果（回调函数） 
 */
var checkPhone = (rule, value, callback) => {
  //定义一个验证手机的正则
  var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
  if (reg.test(value)) {
    callback();//验证正确，继续向后执行
  } else {
    callback(new Error("手机号不正确"));
  }
};
//验证邮箱函数
var checkEmail = (rule, value, callback) => {
  //定义一个验证邮箱的正则
  var reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  if (reg.test(value)) {
    callback();
  } else {
    callback(new Error("邮箱不合法"));
  }
};

export default {
  data() {
    return {
      // 控制对话框面板的打开和隐藏
      dialogFormVisible: false,
      form: {
        //昵称
        nickname: "",
        //邮箱
        email: "",
        //手机
        phone: "",
        //密码
        password: "",
        //图形码
        codeImg: "",
        //验证码
        registerCode: ""
      },
      //名字距离边框边的距离（昵称，邮箱等）
      formLabelWidth: "67px",
      rules: {
        nickname: [
          { required: true, message: "昵称不能为空", trigger: "blur" },
          { min: 3, max: 5, message: "长度为3~5", trigger: "blur" }
        ],
        email: [
          { required: true, message: "邮箱号不能为空", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" }
        ],
        phone: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" }
        ],
        codeImg: [
          { required: true, message: "图形码不能为空", trigger: "blur" },
          { min: 4, max: 4, message: "长度为4", trigger: "blur" }
        ],
        registerCode: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
          { min: 6, max: 6, message: "长度为6", trigger: "blur" }
        ]
      },
      //定义一个验证码图片的链接
      imgUrl:
        process.env.VUE_APP_ONLINEURL + "/captcha?type=sendsms&t=" + new Date(),
      //定义一个定时器
      timer: null,
      //禁用时间
      time: 0
    };
  },
  methods: {
    onSubmit() {
      // 验证参数的合法性
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$message({
            message: "验证通过",
            type: "success"
          });
        } else {
          this.$message.error("验证不通过");
        }
      });
    },
    //点击切换验证码图片
    changeImg() {
      this.imgUrl =
        process.env.VUE_APP_ONLINEURL + "/captcha?type=sendsms&t=" + new Date();
    },
    // 点击获取验证码按钮得到验证码
    getCode() {
      //将禁用时间设置为60s
      this.time = 60;
      //添加一个定时器：判断当前按钮是否可以点击
      this.timer = setInterval(() => {
        if (this.time > 0) {
          this.time--;
        }
        //当时间为0时，定时器清空
        if (this.time === 0) {
          clearInterval(this.timer);
        }
      }, 1000)
      // 得到手机验证码
      apiGetCode({
        code: this.form.codeImg,
        phone: this.form.phone
      }).then(res => {
        window.console.log(res);
      });
    }
  }
};
</script>

<style lang="less">
.reg_dialog {
  // 设置注册头部样式
  .el-dialog__header {
    text-align: center;
    background: linear-gradient(to right, #0dc1ef, #1394fc);
    padding: 0px;
    height: 53px;
    line-height: 53px;

    .el-dialog__title {
      color: #fff;
    }
  }

  .imgBox {
    height: 40px;
    text-align: right;

    .codeImg {
      width: 143px;
      height: 40px;
      cursor: pointer;
    }
  }

  .reg_btn {
    width: 143px;
    height: 40px;
  }

  .dialog-footer {
    text-align: center;
  }
}
</style>