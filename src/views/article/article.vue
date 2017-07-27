<template>
    <div>
        <div class="form-container">
            <el-form :inline="true" :model="form" class="demo-form-inline">
                <el-form-item label="Id">
                    <el-input v-model="form.id" placeholder="文章Id"></el-input>
                </el-form-item>
                <el-form-item label="标题">
                    <el-input v-model="form.title" placeholder="文章标题"></el-input>
                </el-form-item>
                <el-form-item label="创建时间">
                    <el-date-picker v-model="form.dateRange" type="daterange" placeholder="选择日期范围">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="文章归属">
                    <el-cascader :options="options" v-model="form.category" @change="handleChange">
                    </el-cascader>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="form.status" placeholder="有效性">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="有效" value="0"></el-option>
                        <el-option label="无效" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                    <el-button type="primary" @click="onAdd">新增</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table-container">
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="id" label="Id" width="80">
                </el-table-column>
                <el-table-column prop="title" label="标题" min-width="100">
                </el-table-column>
                <el-table-column prop="category" label="文章归属" width="180">
                </el-table-column>
                <el-table-column prop="pv" label="浏览量" width="100">
                </el-table-column>
                <el-table-column prop="upvote" label="点赞数" width="100">
                </el-table-column>
                <el-table-column prop="comment" label="评论数" width="100">
                </el-table-column>
                <el-table-column prop="transmit" label="转发数" width="100">
                </el-table-column>
                <el-table-column prop="tags" label="所打标签">
                    <template scope="scope">
                        <el-tag type="gray" v-if="tag.tagName" v-for="(tag,index) in scope.row.tagList" :key="index" color="#fff">{{tag.tagName}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180">
                    <template scope="scope">
                        <el-button type="primary" icon="edit" @click.native.prevent="editRow(scope.row.id)" size="small">编辑</el-button>
                        <el-button type="primary" icon="delete" @click.native.prevent="deleteRow(scope.row.id)" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagin-container">
                <el-pagination v-show="sourceData.length>0" @current-change="handleCurrentChange" :current-page.sync="pageIndex" :page-size="pageSize" layout="total, prev, pager, next" :total="totalCount">
                </el-pagination>
            </div>
        </div>
    
    </div>
</template>

<script>
import * as enums from 'utils/enum';
import sectionTreeSource from 'api/sectionTree';
import { ArticleSelect } from 'api';

export default {
    name: 'Article',

    data() {
        return {
            sourceData: [
            ],
            form: {
                id: '',
                title: '',
                category: [],
                status: '',
                dateRange: []
            },
            totalCount: 0,
            pageIndex: 1,
            pageSize: 15,
            loading: true,
            options: [],
        }
    },

    computed: {
        tableData() {
            return this.sourceData.map(m => {
                return {
                    id: m.articleId,
                    title: m.title,
                    category: [m.father, m.son, m.grandson].filter(t => t).join('/'),
                    pv: m.viewCount,
                    upvote: m.praiseCount,
                    comment: m.discussCount,
                    transmit: m.shareCount,
                    tagList:m.tagBaseList
                }
            });
        }
    },

    methods: {
        handleCurrentChange(val) {
            this.pageIndex = val;
            this.getData();
        },
        onSubmit() {

            if (this.pageIndex == 1) {
                this.getData()
            } else {
                this.pageIndex = 1
            };
        },

        deleteRow(i) {
            console.log(i);
        },

        editRow(id) {
            this.$router.push({ path: 'Edit/' + id })
        },

        onAdd() {
            this.$router.push({ path: 'Add' })
        },

        handleChange(value) {

        },

        async getData() {
            let loading = this.$loading({
                target: '.table-container',
                body: true
            })

            let params = {
                articleId: this.form.id || 0,
                title: this.form.title,
                start: this.form.dateRange[0],
                end: this.form.dateRange[1],
                status: this.form.status,
                father: this.form.category[0],
                son: this.form.category[1],
                grandson: this.form.category[2],
                // label:this.form.id,
                // editor:this.form.id,
                num: this.pageIndex,
                size: this.pageSize,
            }

            try {
                let res = await ArticleSelect(params);

                if (res.result) {
                    this.sourceData = res.map;

                } else {
                    this.sourceData = [];
                    console.log(res.message)
                }

                if (this.totalCount != res.count && (res.count != 0 || !res.result)) {
                    this.totalCount = res.count;
                }
            } catch (error) {
                console.log(error)
            }

            loading.close();
        }
    },

    created() {


    },
    mounted() {
        this.getData();
    }
}
</script>


<style lang="less" scoped>
.form-container {
    margin-bottom: 12px;
    border-bottom: 1px solid #efefef;
}

.pagin-container {
    margin: 12px 0;
    text-align: center;
}

.table-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center; // height: 100%;
}
</style>


