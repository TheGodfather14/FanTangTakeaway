<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a
            href="javascript:;"
            :class="{ on: loginWay }"
            @click="loginWay = true"
            >短信登录</a
          >
          <a
            href="javascript:;"
            :class="{ on: !loginWay }"
            @click="loginWay = false"
            >密码登录</a
          >
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <div :class="{ on: loginWay }">
            <section class="login_message">
              <input
                type="tel"
                maxlength="11"
                placeholder="手机号"
                v-model="phone"
              />
              <button
                :disabled="!rightPhone"
                class="get_verification"
                :class="{ right_phone: rightPhone }"
                @click.prevent="getCode"
              >
                {{ computeTime > 0 ? `已发送(${computeTime}s)` : "获取验证码" }}
              </button>
            </section>
            <section class="login_verification">
              <input
                type="tel"
                maxlength="8"
                placeholder="验证码"
                v-model="code"
              />
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{ on: !loginWay }">
            <section>
              <section class="login_message">
                <input
                  type="tel"
                  maxlength="11"
                  placeholder="手机/邮箱/用户名"
                  v-model="name"
                />
              </section>
              <section class="login_verification">
                <input
                  type="text"
                  maxlength="8"
                  placeholder="密码"
                  v-if="showPwd"
                  v-model="pwd"
                />
                <input
                  type="password"
                  maxlength="8"
                  placeholder="密码"
                  v-else
                  v-model="pwd"
                />
                <div
                  class="switch_button"
                  @click="showPwd = !showPwd"
                  :class="showPwd ? 'on' : 'off'"
                >
                  <div class="switch_circle" :class="{ right: showPwd }"></div>
                  <span class="switch_text">{{ showPwd ? "abc" : "..." }}</span>
                </div>
              </section>
              <section class="login_message">
                <input
                  type="text"
                  maxlength="11"
                  placeholder="验证码"
                  v-model="captcha"
                />
                <img
                  class="get_verification"
                  src="http://localhost:4000/captcha"
                  alt="captcha"
                  @click="getCaptcha"
                  ref="captcha"
                />
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-left-angle"></i>
      </a>
    </div>
    <AlertTip
      :alertText="alertText"
      v-show="alertShow"
      @closeTip="closeTip"
    ></AlertTip>
  </section>
</template>

<script>
import AlertTip from "../../components/AlertTip/AlertTip";
import { reqSmsLogin, reqPwdLogin, reqSendCode } from "../../api/index";
export default {
  name: "Login",
  data() {
    return {
      loginWay: true, //true是短信
      computeTime: 0, //计时时间
      showPwd: false, //是否显示密码
      phone: "",
      code: "", //短信验证码
      name: "", //用户名
      pwd: "", //密码
      captcha: "", //图形验证码
      alertText: "", //警告内容
      alertShow: false, //显示警告框
    };
  },
  computed: {
    rightPhone() {
      return /^1\d{10}$/.test(this.phone);
    },
  },
  methods: {
    //异步获取验证码
    async getCode() {
      if (!this.computeTime) {
        //启动倒计时
        this.computeTime = 30;
        this.intervalId = setInterval(() => {
          this.computeTime--;
          if (this.computeTime <= 0) {
            clearInterval(this.intervalId);
          }
        }, 1000);
        //发送ajax请求
        const result = await reqSendCode(this.phone);
        if (result.code === 1) {
          //显示提示
          this.showAlert(result.msg);
          //停止倒计时
          if (this.computeTime) {
            this.computeTime = 0;
            clearInterval(this.intervalId);
            this.intervalId = undefined;
          }
        }
      }
    },
    showAlert(alertText) {
      this.alertShow = true;
      this.alertText = alertText;
    },
    //实现异步登录
    async login() {
      let result;
      //前台表单验证
      if (this.loginWay) {
        //短信登陆
        const { rightPhone, phone, code } = this;
        if (!this.rightPhone) {
          //手机号不对
          this.showAlert("手机号有误");
          return;
        } else if (!/^\d{6}$/.test(this.code)) {
          //验证码必须是六位数字
          this.showAlert("验证码有误");
          return;
        }
        //发送ajax请求短信登陆
        result = await reqSmsLogin(phone, code);
      } else {
        //密码登录
        const { name, pwd, captcha } = this;
        if (!this.name) {
          //用户名必须指定
          this.showAlert("用户名有误");
          return;
        } else if (!this.pwd) {
          //密码必须指定
          this.showAlert("密码有误");
          return;
        } else if (!this.captcha) {
          //验证码必须有
          this.showAlert("验证码有误");
          return;
        }
        //ajax请求密码登录
        result = await reqPwdLogin({ name, pwd, captcha });
      }
      //停止倒计时
      if (this.computeTime) {
        this.computeTime = 0;
        clearInterval(this.intervalId);
        this.intervalId = undefined;
      }
      //根据结果数据处理
      if (result.code === 0) {
        const user = result.data;
        //user保存到state
        this.$store.dispatch('recordUser',user)
        //去profile页面
        this.$router.replace("/profile");
      } else {
        //显示新的图片验证码
        this.getCaptcha();
        //警告提示
        const msg = result.msg; 
        this.showAlert(msg);
      }
    },
    //关闭警告
    closeTip() {
      this.alertShow = false;
      this.alertText = "";
    },
    //获取新的图片验证码
    getCaptcha() {
      //每次指定的src不一样
      this.$refs.captcha.src =
        "http://localhost:4000/captcha?time=" + Date.now();
    },
  },
  components: {
    AlertTip,
  },
};
</script>

<style lang='stylus' rel='stylesheet/stylus'>
.loginContainer
  background #fff
  height 100%
  width 100%
  .loginInner
    margin 0 auto
    padding-top 60px
    width 80%
    .login_header
      .login_logo
        color #02a774
        font-size 40px
        font-weight bold
        text-align center
      .login_header_title
        padding-top 40px
        text-align center
        >a
          color #333
          font-size 14px
          padding-bottom 4px
          &:first-child
            margin-right 40px
          &.on
            border-bottom 2px solid #02a774
            color #02a774
            font-weight 700
    .login_content
      >form
        >div
          display none
          &.on
            display block
          input
            border 1px solid #ddd
            border-radius 4px
            box-sizing border-box
            font 400 14px Arial
            height 100%
            outline 0
            padding-left 10px
            width 100%
            &:focus
              border 1px solid #02a774
          .login_message
            background #fff
            font-size 14px
            height 48px
            margin-top 16px
            position relative
            .get_verification
              background transparent
              border 0
              color #ccc
              font-size 14px
              position absolute
              right 10px
              top 50%
              transform translateY(-50%)
              &.right_phone
                color black
          .login_verification
            background #fff
            font-size 14px
            height 48px
            margin-top 16px
            position relative
            .switch_button
              border 1px solid #ddd
              border-radius 8px
              color #fff
              font-size 12px
              height 16px
              line-height 16px
              padding 0 6px
              position absolute
              right 10px
              top 50%
              transform translateY(-50%)
              transition background-color 0.3s, border-color 0.3s
              width 30px
              &.off
                background #fff
                .switch_text
                  color #ddd
                  float right
              &.on
                background #02a774
              >.switch_circle
                background #fff
                border 1px solid #ddd
                border-radius 50%
                box-shadow 0 2px 4px 0 rgba(0, 0, 0, 0.1)
                height 16px
                left -1px
                position absolute
                top -1px
                transition transform 0.3s
                width 16px
                &.right
                  transform translateX(27px)
          .login_hint
            color #999
            font-size 14px
            line-height 20px
            margin-top 12px
            >a
              color #02a774
        .login_submit
          background #4cd96f
          border 0
          border-radius 4px
          color #fff
          display block
          font-size 16px
          height 42px
          line-height 42px
          margin-top 30px
          text-align center
          width 100%
      .about_us
        color #999
        display block
        font-size 12px
        margin-top 20px
        text-align center
    .go_back
      height 30px
      left 5px
      position absolute
      top 15px
      width 30px
      >.iconfont
        color #999
        font-size 20px
</style>