import Vue from 'vue';
import Router from 'vue-router';

import { defaultMap } from './router-map';



Vue.use(Router);


export default new Router({
  routes: defaultMap
});
