// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from 'element-ui';
import router from './router';
import store from './store';

import App from './App';

import fetch from './plugins/fetch/fetch';

import 'element-ui/lib/theme-default/index.css';
import 'styles/normalize.css';

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(fetch);


router.beforeEach((to, from, next) => {
  if (store.getters.routesAdd.length == 0) {
    console.log('initRoutes');
    store.dispatch('GenerateRoutes', null).then(() => {
      console.log(store.getters.routesAdd)
      router.addRoutes(store.getters.routesAdd);
      console.log({...to});
      console.log(to);
      next({...to});
    });
  } else {
    next();
  }

});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App,
  },
});
