import Hello from '@/components/Hello';
import table from '@/components/table';
import layout from '@/components/layout/layout';
import home from 'views/home/home';
import article from 'views/article/article';
import articleAdd from 'views/article/article-add';

export const defaultMap = [
  {
    path: '/',
    name: '首页',
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
    name: '你好',
    redirect: '/hello/index',
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
    children: [{
      path: 'index',
      component: table,
    }, {
      path: 'add',
      component: table,
    }],
  },
]
