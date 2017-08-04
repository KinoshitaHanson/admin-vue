<template>
    <div>
        <div class="form-container">
            <el-form :inline="true" :model="form" class="demo-form-inline">
                <el-form-item label="Id">
                    <el-input v-model="form.id" placeholder="图片Id"></el-input>
                </el-form-item>
                <el-form-item label="标签查询">
                    <el-input v-model="form.tag" placeholder="标签名称"></el-input>
                </el-form-item>
                <el-form-item label="外显时间">
                    <el-date-picker v-model="form.dateRange" type="daterange" placeholder="选择日期范围">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="图片归属">
                    <el-select v-model="form.category" placeholder="图片归属">
                        <el-option label="全部" value=""></el-option>
                        <el-option v-for="o in categoryTree" :key="o.value" :label="o.name" :value="o.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="form.visible" placeholder="有效性">
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
                <el-table-column prop="id" label="Id" width="60">
                </el-table-column>
                <el-table-column prop="picture" label="图片" width="180">
                    <template scope="scope">
                        <img v-bind:src="scope.row.picture" @click="imgPreview(scope.row.picture)" />
                    </template>
                </el-table-column>
                <el-table-column prop="category" label="所属分类" width="120">
                </el-table-column>
                <el-table-column prop="tags" label="所打标签">
                    <template scope="scope">
                        <el-tag type="gray" v-if="tag.tagName" v-for="(tag,index) in scope.row.tags" :key="index" color="#fff">{{tag.tagName}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="releaseTime" label="外显时间">
                </el-table-column>
                <el-table-column prop="sort" label="排序值" width="80">
                </el-table-column>
                <el-table-column label="操作" width="180">
                    <template scope="scope">
                        <el-button type="primary" icon="edit" @click.native.prevent="editRow(scope.row.id)" size="small">编辑</el-button>
                        <el-button :type="scope.row.visible=='0'?'success':'danger'" icon="warning" :loading="scope.row.loading" @click.native.prevent="toggleStatus(scope.row)" size="small">{{scope.row.visible=='0'?'有效':'无效'}}</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagin-container">
                <el-pagination v-show="sourceData.length>0" @current-change="handleCurrentChange" :current-page="pageIndex" :page-size="pageSize" layout="total, prev, pager, next" :total="totalCount">
                </el-pagination>
            </div>
        </div>
        <el-dialog title="预览" :visible.sync="dialogVisible" :lock-scroll="true">
            <el-card :body-style="{ padding: '0px' }">
                <img :src="previewImgUrl" class="image">
            </el-card>
        </el-dialog>
    </div>
</template>

<script>
import * as enums from 'utils/enum';
import { PictureSelect, PictureUpdate } from 'api';
import sectionTreeSource2 from 'api/sectionTree2';

export default {
    name: 'Picture',

    data() {
        return {
            sourceData: [
            ],
            totalCount: 0,
            form: {
                id: '',
                tag: '',
                dateRange: [],
                category: '',
                visible: ''
            },
            loading: true,
            pageIndex: 1,
            pageSize: 15,
            dialogVisible: false,
            previewImgUrl: '',
            categoryTree: sectionTreeSource2,
        }
    },

    computed: {
        tableData() {
            return this.sourceData.map(m => {
                return {
                    id: m.id,
                    category: (sectionTreeSource2.find(t => t.name == m.tagCategory) || {}).value,
                    picture: m.picUrl,
                    releaseTime: m.releaseTime,
                    tags: m.tagBaseList || [],
                    sort: m.weight,
                    loading: false,
                    visible: m.deleteStatus
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

        editRow(id) {
            this.$router.push({ path: 'Edit/' + id })
        },

        deleteRow(i) {
            console.log(i);
        },

        onAdd() {
            this.$router.push({ path: 'Add' })
        },

        handleChange(value) {

        },

        //数据源查询
        async getData() {
            let loading = this.$loading({
                target: '.table-container',
                body: true
            })

            let params = {
                id: this.form.id,
                tagCategory: this.form.category,
                tagBaseName: this.form.tag,
                startTime: this.form.dateRange[0],
                endTime: this.form.dateRange[1],
                deleteStatus: this.form.visible,
                pageNo: this.pageIndex,
                pageSize: this.pageSize
            }

            try {
                let res = await PictureSelect(params);
                if (res.code == 0) {
                    this.sourceData = res.result.entity;

                } else {
                    this.sourceData = [];
                    this.$message.error('提交异常！' + res.des);
                }

                if (this.totalCount != res.result.totalResult && (res.result.totalResult != 0 || !res.result)) {
                    this.totalCount = res.result.totalResult;
                }
            } catch (error) {
                this.$message.error('提交异常！');
                this.$log.writeExLog(error);
            }
            loading.close();
        },

        async toggleStatus(o) {
            o.loading = true;
            let toStatus = o.visible == 0 ? 1 : 0;
            let data = {
                id: o.id,
                picUrl: o.picture,
                releaseTime: o.releaseTime,
                tagBaseIdList: o.tags.map(m=>m.id).join(','),
                deleteStatus: toStatus,
            };
            try {
                let res = await PictureUpdate(data);
                if (res.code==0) {
                    toStatus == 0 ? this.$message.success('已设置为有效！') : this.$message.warning('已设置为无效！');
                    o.visible = toStatus;
                } else {
                    this.$message.error('提交异常！');
                }
            } catch (error) {
                this.$message.error('提交异常！' + error.toString());
                this.$log.writeExLog(error);
            }
            o.loading = false;
        },

        imgPreview(url) {
            this.previewImgUrl = url;
            this.dialogVisible = true;
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
img {
    width: 100%;
    height: 100%;
    vertical-align: middle;
}

.cell>img {
    cursor: pointer;
}
</style>


