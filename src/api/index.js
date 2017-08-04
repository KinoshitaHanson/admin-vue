import $fetch from 'utils/fetch';

//登录
export const Login = (params) => {return $fetch.form('/management/admin/login', params)};

//文章管理-查询
export const ArticleSelect = (params) => $fetch.get('/management/article/select', { params });

//文章管理-查询
export const ArticleSelectOne = (params) => $fetch.get('/management/article/selectOne', { params });

//文章管理-更新or新增
export const ArticleCommit = (params) => $fetch.form('/management/article/insertOrUpdate', params);

//广告图管理-查询
export const AdGallerySelect = (params) => $fetch.get('/management/banner/select', { params });

//广告图管理-查询
export const AdGallerySelectOne = (params) => $fetch.get('/management/banner/selectOne', { params });

//广告图管理-更新or新增
export const AdGalleryCommit = (params) => $fetch.form('/management/banner/insertOrUpdate', params);

//作者管理-查询
export const AuthorSelect = (params) => $fetch.get('/management/author/select', { params });

//作者管理-查询
export const AuthorSelectOne = (params) => $fetch.get('/management/author/selectOne', {  params });

//作者管理-更新or新增
export const AuthorCommit = (params) => $fetch.form('/management/author/insertOrUpdate', params);

//标签管理-查询
export const TagSelect = (params) => $fetch.get('/management/tagLib/selectTagBase',{params} );

//标签管理-查询
export const TagSelectOne = (params) => $fetch.get('/management/tagLib/selectTagBaseDetail',{params} );

//标签管理-新增
export const TagAdd = (params) => $fetch.post('/management/tagLib/addTagBase',null, {params});

//标签管理-修改
export const TagEdit = (params) => $fetch.post('/management/tagLib/updateTagBase',null, {params});

//标签管理-标签归属查询
export const TagCategorySelect = (params) => $fetch.get('/management/tagLib/getTagCategory',{params} );

//标签推荐-查询
export const TagRecommendSelect = (params) => $fetch.get('/management/tagRecommend/tags', { params });

//标签推荐-更新
export const TagRecommendUpdate = (params)=> $fetch.post('/management/tagRecommend/update',null, {params});

//标签分类-查询
export const GetTagClassification = (params)=> $fetch.get('/management/tagLib/getTagClassification', { params });

//视频管理-查询
export const VideoSelect = (params)=> $fetch.get('/management/video/select', { params });

//视频管理-查询
export const VideoSelectOne = (params)=> $fetch.get('/management/video/selectOne', { params });

//视频管理-更新or新增
export const VideoCommit = (params)=> $fetch.form('/management/video/insertOrUpdate', params);

//图片管理-查询
export const PictureSelect = (params) => $fetch.get('/management/picture/selectPictureList',{params} );

//图片管理-查询
export const PictureSelectOne = (params) => $fetch.get('/management/picture/selectPictureDetail',{params} );

//图片管理-修改
export const PictureUpdate = (params)=> $fetch.form('/management/picture/updatePicture', params );

//机器人管理-美图-分类查询
export const RobotPictureCategorySelect = (params)=> $fetch.get('/management/prettyPic/category', { params });

//机器人管理-美图-查询
export const RobotPictureSelect = (params)=> $fetch.get('/management/prettyPic/selectPrettyPic', { params });

//机器人管理-美图-查询
export const RobotPictureSelectOne = (params)=> $fetch.get('/management/prettyPic/selectPrettyPicDetail', { params });

//机器人管理-美图-新增
export const RobotPictureAdd = (params)=> $fetch.form('/management/prettyPic/add', params );

//机器人管理-美图-修改
export const RobotPictureUpdate = (params)=> $fetch.form('/management/prettyPic/update', params );

//机器人管理-表情包-分类查询
export const RobotStickerCategorySelect = (params)=> $fetch.get('/management/picPackage/category', { params });

//机器人管理-表情包-查询
export const RobotStickerSelect = (params)=> $fetch.get('/management/picPackage/selectPicPackage', { params });

//机器人管理-表情包-查询
export const RobotStickerSelectOne = (params)=> $fetch.get('/management/picPackage/selectPicPackageDetail', { params });

//机器人管理-表情包-新增
export const RobotStickerAdd = (params)=> $fetch.form('/management/picPackage/selectPicPackage',params);

//机器人管理-表情包-修改
export const RobotStickerUpdate = (params)=> $fetch.form('/management/picPackage/update',  params );
