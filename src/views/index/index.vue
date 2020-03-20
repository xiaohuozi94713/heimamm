<template>
  <el-container class="indexBox">
    <!-- 头部区域 -->
    <el-header>
      <div class="left">
        <i class="el-icon-s-fold" @click="isCollapse=!isCollapse"></i>
        <img src="../../assets/index_logo.png" alt />
        <span>黑马面面</span>
      </div>
      <div class="right">
        <img :src="userIcon" alt />
        <span class="username">{{userInfo.username}}，您好</span>
        <el-button type="primary" size="mini" @click="logOut">退出</el-button>
      </div>
    </el-header>
    <!-- 菜单导航栏 -->
    <el-container>
      <!-- 设置width=auto，意思是有内容撑开 -->
      <el-aside width="auto">
        <el-menu class="el-menu-vertical-demo" :collapse="isCollapse" :router="true">
          <el-menu-item index="/index/chart">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <el-menu-item index="/index/user">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="/index/question">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="/index/enterprise">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="/index/subject">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 内容区域 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
//导入方法
import { apiInfo, apiLogout } from "@/api/index";
//导入操作token的方法
import { removeToken } from "@/utils/mytoken";
export default {
  data() {
    return {
      //用户信息
      userInfo: {},
      //用户头像
      userIcon: "",
      //是否折叠
      isCollapse: false
    };
  },
  created() {
    apiInfo().then(res => {
      //window.console.log(res);
      this.userInfo = res.data.data;
      this.userIcon = process.env.VUE_APP_URL + "/" + this.userInfo.avatar;
    });
  },
  methods: {
    logOut() {
      //弹出提示框
      this.$confirm("您是否确定退出？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //向服务器发送请求，告知退出
          apiLogout().then(res => {
            window.console.log(res);
            if (res.data.code === 200) {
              //删除用户token
              removeToken();
              //跳转到登录页
              this.$router.push("/login");
              //提示用户退出成功
              this.$message({
                type: "success",
                message: "退出成功!"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消退出"
          });
        });
    }
  }
};
</script>

<style lang="less">
.indexBox {
  height: 100%;

  .el-header {
    background-color: #fff;
    color: #333;
    line-height: 60px;
    display: flex;
    justify-content: space-between;

    .left {
      display: flex;
      align-items: center;

      i {
        font-size: 24px;
        margin-right: 22px;
      }

      img {
        width: 33px;
        height: 28px;
        margin-right: 11px;
      }

      span {
        font-size: 22px;
        font-family: Microsoft YaHei;
        color: #49a1ff;
      }
    }

    .right {
      display: flex;
      align-items: center;

      img {
        width: 43px;
        height: 43px;
        border-radius: 50%;
        margin-right: 9px;
      }

      .username {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(99, 99, 99, 1);
        margin-right: 38px;
      }
    }
  }

  .el-aside {
    background-color: #fff;
    color: #333;

    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
      min-height: 400px;
    }
  }

  .el-main {
    background-color: #e8e9ec;
    color: #333;
  }
}
</style>