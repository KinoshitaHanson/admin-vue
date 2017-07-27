import $fetch from 'utils/fetch';
// let $fetch ={}

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

//标签管理-新增
export const TagAdd = (params) => $fetch.post('/management/tagLib/addTagBase',null, {params});

//标签管理-标签归属查询
export const TagCategorySelect = (params) => $fetch.get('/management/tagLib/getTagCategory',{params} );

//标签推荐-查询
export const TagRecommendSelect = (params) => $fetch.get('/management/tagRecommend/tags', { params });

//标签推荐-更新
export const TagRecommendUpdate = (params)=> $fetch.post('/management/tagRecommend/update',null, {params});

//标签分类-查询
export const GetTagClassification = (params)=> $fetch.get('/management/tagLib/getTagClassification', { params });

