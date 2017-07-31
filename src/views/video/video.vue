<template>
    <div>
        <div class="form-container">
            <el-form :inline="true" :model="form" class="demo-form-inline">
                <el-form-item label="Id">
                    <el-input v-model="form.id" placeholder="视频Id"></el-input>
                </el-form-item>
                <el-form-item label="标题">
                    <el-input v-model="form.title" placeholder="视频标题"></el-input>
                </el-form-item>
                <el-form-item label="创建时间">
                    <el-date-picker v-model="form.dateRange" type="daterange" placeholder="选择日期范围">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="归属">
                    <el-cascader :options="categoryTree" v-model="form.category">
                    </el-cascader>
                </el-form-item>
                <el-form-item label="新归属">
                    <el-select v-model="form.categoryNew" placeholder="新归属">
                        <el-option label="全部" value=""></el-option>
                        <el-option v-for="o in categoryTreeNew" :key="o.value" :label="o.name" :value="o.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="标签">
                    <el-input v-model="form.tag" placeholder="标签"></el-input>
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
                <el-table-column prop="title" label="标题" width="180">
                </el-table-column>
                <el-table-column prop="category" label="文章归属" width="180">
                    <template scope="scope">
                        <div style="margin-bottom:4px;">
                            <span style="color:#00a2d4">旧:</span>{{scope.row.category}}</div>
                        <div>
                            <span style="color:#ff0000">新:</span>{{scope.row.categoryNew}}</div>
                    </template>
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
                        <el-button :type="scope.row.visible=='0'?'success':'danger'" icon="warning" :loading="scope.row.loading" @click.native.prevent="toggleStatus(scope.row)" size="small">{{scope.row.visible=='0'?'有效':'无效'}}</el-button>
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
import sectionTreeSource2 from 'api/sectionTree2';
import { VideoSelect, VideoCommit } from 'api';

export default {
    name: 'Video',

    data() {
        return {
            sourceData: [],//源数据
            form: {//表单
                id: '',
                title: '',
                category: [],
                categoryNew: '',
                status: '',
                dateRange: [],
                tag:''
            },
            totalCount: 0,//总数
            pageIndex: 1,//页码
            pageSize: 15,//页长
            loading: true,//载入画面
            statusLoading: false,//状态修改载入
            categoryTree: sectionTreeSource,
            categoryTreeNew: sectionTreeSource2,
        }
    },

    computed: {
        tableData() {
            return this.sourceData.map(m => {
                return {
                    id: m.videoId,
                    title: m.title,
                    category: [m.father, m.son, m.grandson].filter(t => t).join('/'),
                    categoryNew: m.name,
                    pv: m.viewCount,
                    upvote: m.praiseCount,
                    comment: m.discussCount,
                    transmit: m.shareCount,
                    tagList: m.tagBaseList,
                    visible: m.status,
                    loading: false
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

        async toggleStatus(o) {
            o.loading = true;
            let toStatus = o.visible == 0 ? 1 : 0;
            let data = {
                status: toStatus,
                videoId: o.id
            };
            try {
                let res = await VideoCommit(data);
                if (res.result) {
                    toStatus == 0 ? this.$message.success('已设置为有效！') : this.$message.warning('已设置为无效！');
                    o.visible = toStatus;
                } else {
                    this.$message.error('提交异常！');
                }
            } catch (error) {
                this.$message.error('提交异常！' + error.toString());
            }
            o.loading = false;
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
                videoId: this.form.id || 0,
                title: this.form.title,
                start: this.form.dateRange[0],
                end: this.form.dateRange[1],
                status: this.form.status,
                father: this.form.category[0],
                son: this.form.category[1],
                grandson: this.form.category[2],
                tagName:this.form.tag,
                tagCategory: this.form.categoryNew,
                num: this.pageIndex,
                size: this.pageSize,
            }

            try {
                let res = await VideoSelect(params);

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
    },


}
</script>


<style lang="less" >

</style>


