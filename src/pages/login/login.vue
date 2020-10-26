<template>
    <div class="main">
        <div class="top-bg">
            <div class="top-bg-img"></div>
        </div>
        <div class="input-all">
            <div class="input-title">登录</div>
            <div class="input-item">
                <img src="../../static/img/login_name@2x.png" class="left-img" />
                <input type="text" class="content" placeholder="请输入用户名" v-model="userid" />
                <img
                    src="../../static/img/login_delete@2x.png"
                    class="right-img"
                    v-show="userid.length"
                    @click="userid = ''"
                />
            </div>
            <div class="input-item">
                <img src="../../static/img/login_password@2x.png" class="left-img" />
                <input :type="passwordShow" class="content" placeholder="请输入密码" v-model="password" />
                <img
                    src="../../static/img/login_delete@2x.png"
                    class="right-img"
                    v-show="password.length"
                    @click="password = ''"
                />
                <img
                    src="../../static/img/login_dispaly@2x.png"
                    @click="passwordShow = 'password'"
                    class="right-img"
                    style="margin-left: 5px;"
                    v-if="passwordShow == 'text'"
                />
                <img
                    src="../../static/img/login_hide@2x.png"
                    @click="passwordShow = 'text'"
                    class="right-img"
                    style="margin-left: 5px;"
                    v-else
                />
            </div>
            <div class="btn-login" @click="handleLogin">登录</div>
        </div>
    </div>
</template>

<script>
import md5 from "blueimp-md5";
import { Base64 } from "js-base64";
import { ssoUrl, geoSocialId, geoSocialPassword, } from "../../api/url.js";
import { setStorage, getStorage } from "../../util/common.js";

export default {
    name: "login",
    data() {
        return {
            userid: "",
            password: "",
            passwordShow: "password",
            resend: false,
        };
    },
    mounted() {},

    methods: {
        handleLogin() {
            if (!this.userid) {
                this.$dialog.toast({ mes: "请输入用户名", timeout: 1500 });
                return;
            }
            if (!this.password) {
                this.$dialog.toast({ mes: "请输入密码", timeout: 1500 });
                return;
            }
            this.$dialog.loading.open("登录中");
            this.$api
                    .login({
                        userid: this.userid,
                        password: md5(
                            Base64.encode(this.userid) + this.password
                        ),
                    })
                    .then((res) => {
                        this.$dialog.loading.close();
                        if (res.state) {
                            this.setLocalStorage("loginGeoSocial", res.data);
                            this.$router.go(-1);
                        } else {
                            this.$dialog.toast({
                                mes: res.loginMsg,
                                timeout: 1500,
                            });
                        }
                    });
        },
    },
};
</script>

<style lang="scss">
.main {
    width: 100%;
    height: 100%;
    background-color: #f0f2f5;

    input {
        border: none;
    }

    .top-bg {
        background: url(../../static/img/bg.png) no-repeat;
        background-size: 100% 100%;
        // padding-bottom: 58%;
        height: 220px;
        position: relative;

        .top-bg-img {
            background: url(../../static/img/login_bg.png) no-repeat;
            background-size: 100% 100%;
            width: 220px;
            height: 220px;
            position: absolute;
            top: 0;
            left: 50%;
            margin-left: -110px;
        }
    }

    .input-all {
        margin: 0 10px;
        padding: 20px;
        height: 500px;
        margin-top: -40px;
        border-radius: 15px;
        background-color: #fff;
        position: relative;
        z-index: 99;

        .input-title {
            font-size: 30px;
            color: #3369e7;
            text-align: center;
            font-weight: bold;
            margin: 40px 0;
        }

        .input-item {
            display: flex;
            align-items: center;
            margin: 30px 0;
            border: 1px solid #deebfc;
            border-radius: 13px;
            padding: 10px 10px;
            height: 50px;

            .right-text {
                border-left: 1px solid #e6e6e6;
                height: 100%;
                line-height: 46px;
                padding: 0 7px;
                font-size: 16px;
                color: #4a96fd;
                width: 125px;
                text-align: center;
            }

            .placeholder-input {
                color: #e6e6e6;
            }

            .left-img {
                width: 25px;
                height: 25px;
            }

            .left-img-yzm {
                width: 27px;
                height: 27px;
                margin-left: -2px;
            }

            .content {
                flex: 1;
                font-size: 18px;
                padding: 0 5px;
            }

            .right-img {
                width: 25px;
                height: 25px;
            }
        }

        .input-bottom {
            padding: 0;

            .left-img-yzm {
                margin: 10px 0 10px 8px;
            }
        }
    }

    .btn-login {
        height: 45px;
        line-height: 45px;
        background: linear-gradient(
            -90deg,
            rgba(57, 137, 254, 1),
            rgba(111, 191, 255, 1)
        );
        border-radius: 8px;
        margin: 20px 0;
        text-align: center;
        color: #fff;
    }
}
</style>
