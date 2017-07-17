import Vue from 'vue';
import Router from 'vue-router';
import Hello from '@/components/Hello';
import table from '@/components/table';
import layout from '@/components/layout/layout';
import home from 'views/home/home';

Vue.use(Router);


export default new Router({
  routes: [{
      path: '/',
      name: 'index',
      component: layout,
      redirect: '/home',
      children: [{
        path: 'home',
        component: home,
      }],
    },
    {
      path: '/hello',
      component: layout,
      name: '首页',
      redirect: '/hello/index',
      children: [{
        path: 'index',
        component: Hello,
      }],
    },
    {
      path: '/table',
      component: layout,
      name: '首页',
      redirect: '/table/index',
      children: [{
        path: 'index',
        component: table,
      }],
    },
  ]
});
