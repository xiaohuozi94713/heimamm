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
            <img src="../../../assets/login_captcha.png" class="codeImg" alt />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="验证码" :label-width="formLabelWidth" prop="registerCode">
        <el-row>
          <el-col :span="17">
            <el-input v-model="form.registerCode" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="7" class="imgBox">
            <el-button class="reg_btn">获取用户验证码</el-button>
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
export default {
  data() {
    return {
      //是否显示对话框
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
        email: [{ required: true, message: "邮箱号不能为空", trigger: "blur" }],
        phone: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          { min: 11, max: 11, message: "手机号长度为11", trigger: "blur" }
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
      }
    };
  },
  methods: {
    onSubmit() {
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