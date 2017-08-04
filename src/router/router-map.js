

const layout = r => require.ensure([], () => r(require("@/components/layout/layout.vue")), "layout" );
const login = r => require.ensure([], () => r(require("views/login/login")), "login");

const home = r => require.ensure([], () => r(require("views/home/home")), "home");

const article = r => require.ensure([], () => r(require("views/article/article")), "article");
const articleAdd = r => require.ensure( [], () => r(require("views/article/article-add")), "articleAdd" );

const video = r => require.ensure([], () => r(require("views/video/video")), "video");
const videoAdd = r => require.ensure([], () => r(require("views/video/video-add")), "videoAdd");

const picture = r => require.ensure([], () => r(require("views/picture/picture")), "picture");
const pictureAdd = r => require.ensure([], () => r(require("views/picture/picture-add")), "pictureAdd");

const adGallery = r => require.ensure( [], () => r(require("views/advertisement/gallery")), "ad-gallery" );
const adGalleryAdd = r => require.ensure( [], () => r(require("views/advertisement/gallery-add")), "ad-gallery-add" );

const author = r => require.ensure([], () => r(require("views/author/author")), "author");
const authorAdd = r => require.ensure([], () => r(require("views/author/author-add")), "authorAdd");

const tagRecommendLayout = r => require.ensure([], () => r(require("views/tag-recommend")), "tagRecommend" );
const tagRecommend = r => require.ensure([], () => r(require("views/tag-recommend/recommend")), "tagRecommend" );
const tagRecommendAdd = r => require.ensure([], () => r(require("views/tag-recommend/recommend-add")), "tagRecommendAdd" );

const tag = r => require.ensure([], () => r(require("views/tag/tag")), "tag" );
const tagAdd = r => require.ensure([], () => r(require("views/tag/tag-add")), "tagAdd" );

const robotLayout = r => require.ensure([], () => r(require("views/robot")), "robotLayout" );
const robotGame = r => require.ensure([], () => r(require("views/robot/game/game")), "robotGame" );
const robotGameAdd = r => require.ensure([], () => r(require("views/robot/game/game-add")), "robotGameAdd" );
const robotPicture = r => require.ensure([], () => r(require("views/robot/picture/picture")), "robotPicture");
const robotPictureAdd = r => require.ensure([], () => r(require("views/robot/picture/picture-add")), "robotPictureAdd" );
const robotSticker = r => require.ensure([], () => r(require("views/robot/sticker/sticker")), "robotSticker");
const robotStickerAdd = r => require.ensure([], () => r(require("views/robot/sticker/sticker-add")), "robotStickerAdd");
const robotSong = r => require.ensure([], () => r(require("views/robot/song/song")), "robotSong");
const robotSongAdd = r => require.ensure([], () => r(require("views/robot/song/song-add")), "robotSongAdd");
const robotStory = r => require.ensure([], () => r(require("views/robot/story/story")), "robotStory");
const robotStoryAdd = r => require.ensure([], () => r(require("views/robot/story/story-add")), "robotStoryAdd");
const robotJoke = r => require.ensure([], () => r(require("views/robot/joke/joke")), "robotJoke");
const robotJokeAdd = r => require.ensure([], () => r(require("views/robot/joke/joke-add")), "robotJokeAdd");
const robotIQ = r => require.ensure([], () => r(require("views/robot/iq/iq")), "robotIQ");
const robotIQAdd = r => require.ensure([], () => r(require("views/robot/iq/iq-add")), "robotIQAdd");

const notFound = r => require.ensure([], () => r(require("views/error/404")), "notFound" );

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
      noDropDown: true,
      icon:'star-on',
    },
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
      noDropDown: true,
      icon:'star-on'      
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
      },
      {
        path: "Edit/:Id",
        name: "ArticleEdit",
        component: articleAdd,
        meta: {
          text: "编辑"
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
      noDropDown: true,
      icon:'star-on'      
    },
    children: [
      {
        path: "Index",
        component: video
      },
      {
        path: "Add",
        name: "VideoAdd",
        component: videoAdd,
        meta: {
          text: "新增"
        }
      },
      {
        path: "Edit/:Id",
        name: "VideoEdit",
        component: videoAdd,
        meta: {
          text: "编辑"
        }
      }
    ]
  },
  {
    path: "/Picture",
    component: layout,
    name: "Picture",
    redirect: "/Picture/Index",
    meta: {
      text: "图片管理",
      noDropDown: true,
      icon:'star-on'      
    },
    children: [
      {
        path: "Index",
        component: picture
      },
      {
        path: "Add",
        name: "PictureAdd",
        component: pictureAdd,
        meta: {
          text: "新增"
        }
      },
      {
        path: "Edit/:Id",
        name: "PictureEdit",
        component: pictureAdd,
        meta: {
          text: "编辑"
        }
      }
    ]
  },
  {
    path: "/Tag",
    component: layout,
    name: "Tag",
    redirect: "/Tag/Index",
    meta: {
      text: "标签管理",
      noDropDown: true,
      icon:'menu',            
    },
    children: [
      {
        path: "Index",
        component: tag
      },
      {
        path: "Add",
        name: "TagAdd",
        component: tagAdd,
        meta: {
          text: "新增"
        }
      },
      {
        path: "Edit/:Id",
        name: "TagEdit",
        component: tagAdd,
        meta: {
          text: "编辑"
        }
      }
    ]
  },
  {
    path: "/TagRecommend",
    component: layout,
    redirect: 'noredirect',
    name: "TagRecommend",
    icon: "zujian",
    meta: {
      text: "标签推荐",
      icon:'menu',            
    },
    children: [
      {
        path: "/TagRecommend/Category",
        component: tagRecommendLayout,
        redirect: "/TagRecommend/Category/Index",
        meta: {
          text: "分类页",
          icon:'menu',                
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
          text: "板块页",
          icon:'menu',                
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
            path: "Add",
            component: tagRecommendAdd,
            name: "TagRecommendSectionAdd",
            meta: {
              text: "新增",
              hidden: true
            }
          },
          {
            path: "Edit/:Id",
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
  },
  {
    path: "/Advertisement/Gallery",
    component: layout,
    name: "AdvertisementGallery",
    redirect: "/Advertisement/Gallery/Index",
    meta: {
      text: "广告图管理",
      noDropDown: true,
      icon:'star-on',      
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
      noDropDown: true,
      icon:'menu',            
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
    path: "/Robot",
    component: layout,
    redirect: 'noredirect',
    name: "Robot",
    icon: "zujian",
    meta: {
      text: "机器人管理",
      icon:'menu',            
    },
    children: [
      {
        path: "/Robot/Picture",
        component: robotLayout,
        redirect: "/Robot/Picture/Index",
        meta: {
          text: "美图",
          icon:'menu',                
        },
        children: [
          {
            path: "Index",
            component: robotPicture,
            name: "RobotPicture",
            meta: {
              hidden: true
            }
          },
          {
            path: "Add",
            component: robotPictureAdd,
            name: "RobotPictureAdd",
            meta: {
              text: "新增",
              hidden: true
            }
          },
          {
            path: "Edit/:Id",
            component: robotPictureAdd,
            name: "RobotPictureEdit",
            meta: {
              text: "编辑",
              hidden: true
            }
          }
        ]
      },
      {
        path: "/Robot/Sticker",
        component: robotLayout,
        redirect: "/Robot/Sticker/Index",
        meta: {
          text: "表情包",
          icon:'menu',                
        },
        children: [
          {
            path: "Index",
            component: robotSticker,
            name: "RobotSticker",
            meta: {
              hidden: true
            }
          },
          {
            path: "Add",
            component: robotStickerAdd,
            name: "RobotStickerAdd",
            meta: {
              text: "新增",
              hidden: true
            }
          },
          {
            path: "Edit/:Id",
            component: robotStickerAdd,
            name: "RobotStickerEdit",
            meta: {
              text: "编辑",
              hidden: true
            }
          }
        ]
      },
      {
        path: "/Robot/Song",
        component: robotLayout,
        redirect: "/Robot/Song/Index",
        meta: {
          text: "唱歌",
          icon:'menu',                
        },
        children: [
          {
            path: "Index",
            component: robotSong,
            name: "RobotSong",
            meta: {
              hidden: true
            }
          },
          {
            path: "Add",
            component: robotSongAdd,
            name: "RobotSongAdd",
            meta: {
              text: "新增",
              hidden: true
            }
          },
          {
            path: "Edit/:Id",
            component: robotSongAdd,
            name: "RobotSongEdit",
            meta: {
              text: "编辑",
              hidden: true
            }
          }
        ]
      },
      {
        path: "/Robot/Story",
        component: robotLayout,
        redirect: "/Robot/Story/Index",
        meta: {
          text: "讲故事",
          icon:'menu',                
        },
        children: [
          {
            path: "Index",
            component: robotStory,
            name: "RobotStory",
            meta: {
              hidden: true
            }
          },
          {
            path: "Add",
            component: robotStoryAdd,
            name: "RobotStoryAdd",
            meta: {
              text: "新增",
              hidden: true
            }
          },
          {
            path: "Edit/:Id",
            component: robotStoryAdd,
            name: "RobotStoryEdit",
            meta: {
              text: "编辑",
              hidden: true
            }
          }
        ]
      },
      {
        path: "/Robot/Game",
        component: robotLayout,
        redirect: "/Robot/Game/Index",
        meta: {
          text: "玩游戏",
          icon:'menu',                
        },
        children: [
          {
            path: "Index",
            component: robotGame,
            name: "RobotGame",
            meta: {
              hidden: true
            }
          },
          {
            path: "Add",
            component: robotGameAdd,
            name: "RobotGameAdd",
            meta: {
              text: "新增",
              hidden: true
            }
          },
          {
            path: "Edit/:Id",
            component: robotGameAdd,
            name: "RobotGameEdit",
            meta: {
              text: "编辑",
              hidden: true
            }
          }
        ]
      },
      {
        path: "/Robot/Joke",
        component: robotLayout,
        redirect: "/Robot/Joke/Index",
        meta: {
          text: "讲段子",
          icon:'menu',                
        },
        children: [
          {
            path: "Index",
            component: robotJoke,
            name: "RobotJoke",
            meta: {
              hidden: true
            }
          },
          {
            path: "Add",
            component: robotJokeAdd,
            name: "RobotJokeAdd",
            meta: {
              text: "新增",
              hidden: true
            }
          },
          {
            path: "Edit/:Id",
            component: robotJokeAdd,
            name: "RobotJokeEdit",
            meta: {
              text: "编辑",
              hidden: true
            }
          }
        ]
      },
      {
        path: "/Robot/IQ",
        component: robotLayout,
        redirect: "/Robot/IQ/Index",
        meta: {
          text: "拼智商",
          icon:'menu',                
        },
        children: [
          {
            path: "Index",
            component: robotIQ,
            name: "RobotIQ",
            meta: {
              hidden: true
            }
          },
          {
            path: "Add",
            component: robotIQAdd,
            name: "RobotIQAdd",
            meta: {
              text: "新增",
              hidden: true
            }
          },
          {
            path: "Edit/:Id",
            component: robotIQAdd,
            name: "RobotIQEdit",
            meta: {
              text: "编辑",
              hidden: true
            }
          }
        ]
      }
    ]
  },
  { 
    path: '*', 
    name:'NotFound',
    component: notFound,
    meta: {
      hidden: true
    },
  }
];
