<template>
  <div class="bigBox">
    <div class="leftBox">
      <div class="title">
        <img src="../../assets/titleimg.png" class="titleImg" alt />
        <span class="titleTxt">黑马面面</span>
        <span class="titleLine"></span>
        <span class="titleLogin">用户登录</span>
      </div>
    </div>
    <img src="../../assets/login_banner_ele.png" class="rightImg" alt />
  </div>
</template>

<script>
export default {};
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
  }

  .rightImg {
    width: 633px;
    height: 435px;
  }
}
</style>