<template>
  <!-- close-on-click-modal 不可通过遮罩层关闭对话框 -->
  <el-dialog
    :close-on-click-modal="false"
    title="用户注册"
    class="reg_dialog"
    :visible.sync="dialogFormVisible"
  >
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="头像" :label-width="formLabelWidth" prop="avatar">
        <!-- 头像上传 
        action:上传路径
        show-file-list： 是否显示已经上传过的文件信息
        on-success：上传成功后执行的回调函数
        before-upload：上传之前执行的回调函数
        -->
        <el-upload
          class="avatar-uploader"
          name="image"
          :action="imgUpload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <!-- 如果没有图片：就显示下面的 i 标签。如果有图片就显示图片-->
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
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
            <el-button
              :disabled="time !== 0"
              class="reg_btn"
              @click="getCode"
            >{{ time === 0 ? '获取用户验证码' : time }}</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
//导入register.js  按需导入  @相当于"src"目录的别名
import { apiGetCode, apiRegister } from "@/api/register";
//导入自定义校验规则mycheck.js 按需导入
import { checkPhone, checkEmail } from "@/utils/mycheck.js";

//定义校验方法
/* rule:触发这个验证的相关属性
 * value:当前输入框中的内容
 * callback:代码执行完毕之后，告诉element 的执行结果（回调函数）
 */
// var checkPhone = (rule, value, callback) => {
//   //定义一个验证手机的正则
//   var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
//   if (reg.test(value)) {
//     callback(); //验证正确，继续向后执行
//   } else {
//     callback(new Error("手机号不正确"));
//   }
// };
//验证邮箱函数
// var checkEmail = (rule, value, callback) => {
//   //定义一个验证邮箱的正则
//   var reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
//   if (reg.test(value)) {
//     callback();
//   } else {
//     callback(new Error("邮箱不合法"));
//   }
// };

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
        registerCode: "",
        avatar: ""
      },
      //名字距离边框边的距离（昵称，邮箱等）
      formLabelWidth: "67px",
      rules: {
        avatar: [{ required: true, message: "头像不能为空", trigger: "blur" }],
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
          { min: 4, max: 4, message: "长度为4", trigger: "blur" }
        ]
      },
      //定义一个验证码图片的链接
      imgUrl: process.env.VUE_APP_URL + "/captcha?type=sendsms&t=" + new Date(),
      //定义一个定时器
      timer: null,
      //禁用时间
      time: 0,
      //上传图片的路径
      imgUpload: process.env.VUE_APP_URL + "/uploads",
      // 上传之后的图片内容
      imageUrl: ""
    };
  },
  methods: {
    //重置表单
    cancel() {
      //得到form元素，调用resetFields方法重置表单
      this.$refs.form.resetFields();
      //手动重置头像 清除图片url
      this.imageUrl = null;
      this.dialogFormVisible = false;
    },
    onSubmit() {
      // 验证参数的合法性
      this.$refs.form.validate(valid => {
        if (valid) {
          //调用注册方法（axios请求）提交用户注册
          apiRegister({
            username: this.form.nickname,
            phone: this.form.phone,
            password: this.form.password,
            email: this.form.email,
            avatar: this.form.avatar,
            rcode: this.form.registerCode
          }).then(res => {
            window.console.log(res);
            if (res.data.code === 200) {
              this.$message.success("注册成功");
              this.dialogFormVisible = false;
              this.cancel();
            } else {
              this.$message.error(res.data.message);
            }
          });
        } else {
          this.$message.error("验证不通过");
        }
      });
    },
    //点击切换验证码图片
    changeImg() {
      this.imgUrl =
        process.env.VUE_APP_URL + "/captcha?type=sendsms&t=" + new Date();
    },
    // 点击获取验证码按钮得到手机验证码
    getCode() {
      //判断手机是否合法
      //定义一个手机号的正则：
      var phoneReg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      if (!phoneReg.test(this.form.phone)) {
        this.$message.error("手机号不合格");
        return;
      }
      //判断图形验证码是否合法
      if (this.form.codeImg.trim().length !== 4) {
        this.$message.error("图形码不合格");
        return;
      }
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
      }, 1000);
      // 得到手机验证码
      apiGetCode({
        code: this.form.codeImg,
        phone: this.form.phone
      }).then(res => {
        //判断手机号是否重复注册
        if (res.data.code === 200) {
          //window.console.log(res.data.data.captcha)
          //将验证码输出
          this.$message.success("手机验证码为：" + res.data.data.captcha);
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    //上传成功后执行的回调函数
    //res:服务器返回的信息
    //file:上传的文件
    handleAvatarSuccess(res, file) {
      //将已经上传好的图片显示到页面上：file.raw 上传的图片对象
      this.imageUrl = URL.createObjectURL(file.raw);
      //给avatar赋值
      this.form.avatar = res.data.file_path;
      //window.console.log(res.data.file_path)//上传过来的图片的路径
      //上传成功后单独给avatar参数进行验证
      this.$refs.form.validateField("avatar");
    },
    //上传之前执行的回调函数
    //file：上传的文件对象
    beforeAvatarUpload(file) {
      //判断文件类型
      const isJPG = file.type === "image/jpeg" || "image/png" || "image/gif";
      //判断文件大小是否小于2M
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style lang="less">
.reg_dialog {
  text-align: center;
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

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
  }
}
</style>