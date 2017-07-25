

const layout = r => require.ensure([], () => r(require("@/components/layout/layout.vue")), "layout" );
const login = r => require.ensure([], () => r(require("views/login/login")), "login");

const home = r => require.ensure([], () => r(require("views/home/home")), "home");
const article = r => require.ensure([], () => r(require("views/article/article")), "article");
const articleAdd = r => require.ensure( [], () => r(require("views/article/article-add")), "articleAdd" );
const video = r => require.ensure([], () => r(require("views/video/video")), "video");
const adGallery = r => require.ensure( [], () => r(require("views/advertisement/gallery")), "ad-gallery" );
const adGalleryAdd = r => require.ensure( [], () => r(require("views/advertisement/gallery-add")), "ad-gallery-add" );
const author = r => require.ensure([], () => r(require("views/author/author")), "author");
const authorAdd = r => require.ensure([], () => r(require("views/author/author-add")), "authorAdd");
const tagRecommendLayout = r => require.ensure([], () => r(require("views/tag-recommend")), "tagRecommend" );
const tagRecommend = r => require.ensure([], () => r(require("views/tag-recommend/recommend")), "tagRecommend" );
const tagRecommendAdd = r => require.ensure([], () => r(require("views/tag-recommend/recommend-add")), "tagRecommendAdd" );

export const defaultMap = [
  {
    path: "/Login",
    name: "Login",
    component: login,
    hidden: true,
    meta: {
      hidden: true
    }
  },
  {
    path: "/",
    name: "Index",
    component: layout,
    redirect: "/Home",
    meta: {
      text: "首页",
      noDropDown: true
    },
    noDropDown: true,
    children: [
      {
        path: "Home",
        component: home
      }
    ]
  }
];

export const asyncMap = [
  {
    path: "/Article",
    component: layout,
    name: "Article",
    redirect: "/Article/Index",
    meta: {
      text: "文章管理",
      noDropDown: true
    },
    children: [
      {
        path: "Index",
        component: article
      },
      {
        path: "Add",
        name: "ArticleAdd",
        component: articleAdd,
        meta: {
          text: "新增"
        }
      }
    ]
  },
  {
    path: "/Viedo",
    component: layout,
    name: "Video",
    redirect: "/Viedo/Index",
    meta: {
      text: "视频管理",
      noDropDown: true
    },
    children: [
      {
        path: "Index",
        component: video
      },
      {
        path: "Add",
        name: "VideoAdd",
        component: articleAdd,
        meta: {
          text: "新增"
        }
      }
    ]
  },
  {
    path: "/Advertisement/Gallery",
    component: layout,
    name: "AdvertisementGallery",
    redirect: "/Advertisement/Gallery/Index",
    meta: {
      text: "广告图管理",
      noDropDown: true
    },
    children: [
      {
        path: "Index",
        component: adGallery
      },
      {
        path: "Add",
        name: "AdvertisementGalleryAdd",
        component: adGalleryAdd,
        meta: {
          text: "新增"
        }
      },
      {
        path: "Edit/:Id",
        name: "AdvertisementGalleryEdit",
        component: adGalleryAdd,
        meta: {
          text: "编辑"
        }
      }
    ]
  },
  {
    path: "/Author",
    component: layout,
    name: "Author",
    redirect: "/Author/Index",
    meta: {
      text: "作者管理",
      noDropDown: true
    },
    children: [
      {
        path: "Index",
        component: author
      },
      {
        path: "Add",
        name: "AuthorAdd",
        component: authorAdd,
        meta: {
          text: "新增"
        }
      },
      {
        path: "Edit/:Id",
        name: "AuthorEdit",
        component: authorAdd,
        meta: {
          text: "编辑"
        }
      }
    ]
  },
  {
    path: "/TagRecommend",
    component: layout,
    redirect: "/TagRecommend/Category",
    name: "TagRecommend",
    icon: "zujian",
    meta: {
      text: "标签推荐"
    },
    children: [
      {
        path: "/TagRecommend/Category",
        component: tagRecommendLayout,
        redirect: "/TagRecommend/Category/Index",
        meta: {
          text: "分类页"
        },
        children: [
          {
            path: "Index",
            component: tagRecommend,
            name: "TagRecommendCategory",
            meta: {
              // text: "分类页",
              hidden: true
            }
          },
          {
            path: "Add",
            component: tagRecommendAdd,
            name: "TagRecommendCategoryAdd",
            meta: {
              text: "新增",
              hidden: true
            }
          },
          {
            path: "Edit/:Id",
            component: tagRecommendAdd,
            name: "TagRecommendCategoryEdit",
            meta: {
              text: "编辑",
              hidden: true
            }
          }
        ]
      },
      {
        path: "/TagRecommend/Section",
        component: tagRecommendLayout,
        redirect: "/TagRecommend/Section/Index",
        meta: {
          text: "板块页"
        },
        children: [
          {
            path: "Index",
            component: tagRecommend,
            name: "TagRecommendSection",
            meta: {
              // text: "板块页",
              hidden: true
            }
          },
          {
            path: "/TagRecommend/Section/Add",
            component: tagRecommendAdd,
            name: "TagRecommendSectionAdd",
            meta: {
              text: "新增",
              hidden: true
            }
          },
          {
            path: "/TagRecommend/Section/Edit/:Id",
            component: tagRecommendAdd,
            name: "TagRecommendSectionEdit",
            meta: {
              text: "编辑",
              hidden: true
            }
          }
        ]
      }
    ]
  }
];
