<template>
    <div class="main" :title="'首页'">
        <div class="top-bar">
            <div class="top-bar-title" @click="jump('./map')">测试</div>
        </div>
    </div>
</template>
<script>
import {
    ssoUrl,
    geoSocialId,
    geoSocialPassword,
    isAutoLogin,
} from "../../api/url";
import { Base64 } from "js-base64";
import md5 from "blueimp-md5";
import { setStorage, getStorage } from "../../util/common.js";

export default {
    name: "Home",
    data() {
        return {};
    },
    created() {
        if (!this.getLocalStorage("loginGeoSocial")) {
            if (isAutoLogin) {
                this.$router.push({ path: "./login" });
                return;
            } else {
                this.login();
            }
        }

        // 其他业务逻辑
    },
    methods: {
        jump (paths) {
            // this.$dialog.toast({ mes: "正在开发中", timeout: 1500 });
            this.$router.push({ path: paths });
        },

        login () {
            this.$api
                .login({
                    userid: geoSocialId,
                    password: md5(
                        Base64.encode(geoSocialId) + geoSocialPassword
                    ),
                })
                .then((res) => {
                    this.$dialog.loading.close();
                    console.log("res,", res);
                    if (res.state && res.data.loginCode == "00") {
                        this.setLocalStorage("loginGeoSocial", res.data);
                    } else {
                        this.$dialog.toast({
                            mes: res.data.loginMsg,
                            timeout: 1500,
                        });
                    }
                });
        },
    },
    computed: {},
    watch: {},
};
</script>
<style scoped lang="scss">
.main {
    background-color: #f7f7f7;
    height: 100%;

    .top-bar {
        display: flex;
        align-items: center;

        .top-bar-title {
            display: flex;
            align-items: center;
            text-align: center;
        }
    }
}
</style>
