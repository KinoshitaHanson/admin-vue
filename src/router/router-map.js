const layout = r =>require.ensure([],()=>r(require('@/components/layout/layout.vue')),'layout');
const login = r =>require.ensure([],()=>r(require('views/login/login')),'login');

const home = r =>require.ensure([],()=>r(require('views/home/home')),'home');
const article = r =>require.ensure([],()=>r(require('views/article/article')),'article');
const articleAdd = r =>require.ensure([],()=>r(require('views/article/article-add')),'articleAdd');
const video = r =>require.ensure([],()=>r(require('views/video/video')),'video');
const galleryAd = r =>require.ensure([],()=>r(require('views/advertisement/gallery')),'galleryAd');
const author = r =>require.ensure([],()=>r(require('views/author/author')),'author');
const authorAdd = r =>require.ensure([],()=>r(require('views/author/author-add')),'authorAdd');

export const defaultMap = [
  {
    path: '/Login',
    name: 'Login',
    component: login,
    hidden: true,
    meta: {
      hidden: true
    },
  },
  {
    path: '/',
    name: 'Index',
    component: layout,
    redirect: '/Home',
    meta: {
      text: '首页',
      noDropDown: true
    },
    noDropDown: true,
    children: [{
      path: 'Home',
      component: home,
    }],
  }

]


export const asyncMap = [
  {
    path: '/Article',
    component: layout,
    name: 'Article',
    redirect: '/Article/Index',
    meta: {
      text: '文章管理',
      noDropDown: true,
    },
    children: [{
      path: 'Index',
      component: article
    }, {
      path: 'Add',
      name: 'ArticleAdd',
      component: articleAdd,
      meta: {
        text: '新增'
      }
    }],
  },
  {
    path: '/Viedo',
    component: layout,
    name: 'Video',
    redirect: '/Viedo/Index',
    meta: {
      text: '视频管理',
      noDropDown: true,
    },
    children: [{
      path: 'Index',
      component: video,
    }, {
      path: 'Add',
      name: 'VideoAdd',
      component: articleAdd,
      meta: {
        text: '新增',
      },
    }],
  },
  {
    path: '/Advertisement/Gallery',
    component: layout,
    name: 'AdvertisementGallery',
    redirect: '/Advertisement/Gallery/Index',
    meta: {
      text: '广告图管理',
      noDropDown: true,
    },
    children: [{
      path: 'Index',
      component: galleryAd,
    }, {
      path: 'Add',
      name: 'AdvertisementGalleryAdd',
      component: articleAdd,
      meta: {
        text: '新增',
      },
    }],
  },
  {
    path: '/Author',
    component: layout,
    name: 'Author',
    redirect: '/Author/Index',
    meta: {
      text: '作者管理',
      noDropDown: true,
    },
    children: [{
      path: 'Index',
      component: author,
    },
    {
      path: 'Add',
      name: 'AuthorAdd',
      component: authorAdd,
      meta: {
        text: '新增',
      },
    },
    {
      path: 'Edit/:Id',
      name: 'AuthorEdit',
      component: authorAdd,
      meta: {
        text: '编辑',
      },
    }],
  },
  // {
  //   path: '/components',
  //   component: layout,
  //   redirect: '/components/index',
  //   name: '组件',
  //   icon: 'zujian',
  //   children: [
  //     { path: '/index', component: author, name: '介绍 ' },
  //     { path: '/article', component: article, name: '文章' },
  //     { path: '/article/add', component: articleAdd, name: '新增' },
  //   ]
  // },
  // {
  //   path: '/components',
  //   component: layout,
  //   redirect: '/components/index',
  //   name: '组件',
  //   icon: 'zujian',
  //   children: [
  //     { path: '/index', component: author, name: '介绍 ' },
  //     { path: '/article', component: article, name: '文章' },
  //     { path: '/article/add', component: articleAdd, name: '新增' },
  //   ]
  // },
  // {
  //   path: '/components',
  //   component: layout,
  //   redirect: '/components/index',
  //   name: '组件',
  //   icon: 'zujian',
  //   children: [
  //     { path: '/index', component: author, name: '介绍 ' },
  //     { path: '/article', component: article, name: '文章' },
  //     { path: '/article/add', component: articleAdd, name: '新增' },
  //   ]
  // },
]
