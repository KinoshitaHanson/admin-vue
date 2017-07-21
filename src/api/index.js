import $fetch from 'utils/fetch';

//文章管理-查询
export const ArticleSelect = (params) => $fetch.get('/management/article/select', { params: params });

//作者管理-查询
export const AuthorSelect = (params) => $fetch.get('/management/author/select', { params: params });

//作者管理-查询
export const AuthorSelectOne = (params) => $fetch.get('/management/author/selectOne', { params: params });

//作者管理-提交修改or新增
export const AuthorCommit = (params) => $fetch.form('/management/author/insertOrUpdate', params);
