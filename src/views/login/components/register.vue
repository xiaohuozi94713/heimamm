<template>
  <el-dialog title="用户注册" class="reg_dialog" :visible.sync="dialogFormVisible">
    <el-form :model="form">
      <el-form-item label="昵称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="图形码" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="17">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="7" class="imgBox">
            <img src="../../../assets/login_captcha.png" class="codeImg" alt />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="验证码" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="17">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="7" class="imgBox">
            <el-button class="reg_btn">获取用户验证码</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
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
        name: "",
        region: ""
      },
      //名字距离边框边的距离（昵称，邮箱等）
      formLabelWidth: "67px"
    };
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