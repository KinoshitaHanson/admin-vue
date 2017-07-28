// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import ElementUI from "element-ui";
import router from "./router";
import store from "./store";
import nprogress from "nprogress";

import App from "./App";
import fetch from "./plugins/fetch/fetch";

import "styles/normalize.css";
import "styles/common";
import "element-ui/lib/theme-default/index.css";
import "nprogress/nprogress.css"; // Progress 进度条 样式

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(fetch);

let client = new OSS.Wrapper({
  region: "oss-cn-hangzhou",
  accessKeyId: "LTAIKc4SmxqXnWjb",
  accessKeySecret: "n2mZHgH4SfHCaTOips4iuR2h4NOsjo",
  bucket: "ddup-img1"
});

Vue.prototype.$client = client;

const whiteList = ["/Login"];

router.beforeEach((to, from, next) => {
  nprogress.start();
  if (store.getters.token) {
    if (store.getters.routesAdd.length == 0) {
      store.dispatch("GenerateRoutes", null).then(() => {
        router.addRoutes(store.getters.routesAdd);
        next({ ...to });
      });
    } else {
      next();
    }
  } else {
    if (whiteList.indexOf(to.path) > -1) {
      next();
    } else {
      next("/Login");
      nprogress.done(); // 在hash模式下 改变手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
    }
  }
});

router.afterEach(() => nprogress.done());

if (process.env == "production") {
  Vue.config.errorHandler = function(err, vm) {
    console.log(err);
  };
}

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  template: "<App/>",
  components: {
    App
  }
});
