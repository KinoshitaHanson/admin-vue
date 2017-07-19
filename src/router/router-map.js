import Hello from '@/components/Hello';
import table from '@/components/table';
import layout from '@/components/layout/layout';
import login from 'views/login/login';
import home from 'views/home/home';
import article from 'views/article/article';
import articleAdd from 'views/article/article-add';

export const defaultMap = [
  {
    path: '/login',
    component: login,
    hidden: true
  },
  {
    path: '/',
    name: '首页',
    component: layout,
    redirect: '/home',
    noDropDown: true,
    children: [{
      path: 'home',
      component: home,
    }],
  },
  {
    path: '/hello',
    component: layout,
    name: '你好',
    redirect: '/hello/index',
    noDropDown: true,
    children: [{
      path: 'index',
      component: Hello,
    }],
  },

]


export const asyncMap = [
  {
    path: '/table',
    component: layout,
    name: '表格',
    redirect: '/table/index',
    noDropDown: true,
    children: [{
      path: 'index',
      component: table,
    }],
  },
  {
    path: '/article',
    component: layout,
    name: '文章',
    redirect: '/article/index',
    noDropDown: true,
    children: [{
      path: 'index',
      component: article,
    }, {
      path: 'add',
      name: '新增',
      component: articleAdd,
    }],
  },
  {
    path: '/viedo',
    component: layout,
    name: '视频',
    redirect: '/viedo/index',
    noDropDown: true,
    children: [{
      path: 'index',
      component: table,
    }, {
      path: 'add',
      component: table,
    }],
  },
  {
    path: '/components',
    component: layout,
    redirect: '/components/index',
    name: '组件',
    icon: 'zujian',
    children: [
      { path: '/index', component: table, name: '介绍 ' },
      { path: '/article', component: article, name: '文章' },
      { path: '/article/add', component: articleAdd, name: '新增' },
    ]
  },
  {
    path: '/components',
    component: layout,
    redirect: '/components/index',
    name: '组件',
    icon: 'zujian',
    children: [
      { path: '/index', component: table, name: '介绍 ' },
      { path: '/article', component: article, name: '文章' },
      { path: '/article/add', component: articleAdd, name: '新增' },
    ]
  },
  {
    path: '/components',
    component: layout,
    redirect: '/components/index',
    name: '组件',
    icon: 'zujian',
    children: [
      { path: '/index', component: table, name: '介绍 ' },
      { path: '/article', component: article, name: '文章' },
      { path: '/article/add', component: articleAdd, name: '新增' },
    ]
  },
]
