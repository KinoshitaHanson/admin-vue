<template>
    <div>
        <div class="form-container">
            <el-form :inline="true" :model="form" class="demo-form-inline">
                <el-form-item label="Id">
                    <el-input v-model="form.id" placeholder="广告Id"></el-input>
                </el-form-item>
                <el-form-item label="广告类型">
                    <el-select v-model="form.type" placeholder="广告类型">
                        <el-option label="全部" value=""></el-option>
                        <el-option v-for="(item,index) in adType" :key="index" :label="item" :value="index"></el-option>
                    </el-select>
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
                <el-table-column prop="id" label="Id" width="60">
                </el-table-column>
                <el-table-column prop="type" label="广告类型" width="120">
                </el-table-column>
                <el-table-column prop="picture" label="图片" width="180">
                    <template scope="scope">
                        <img v-bind:src="scope.row.picture" @click="imgPreview(scope.row.picture)" />
                    </template>
                </el-table-column>
                <el-table-column prop="releaseTime" label="外显时间">
                </el-table-column>
                <el-table-column prop="module" label="关联模块">
                </el-table-column>
                <el-table-column prop="toId" label="跳转ID">
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
import { AdGallerySelect, AdGalleryCommit } from 'api';

export default {
    name: 'AdvertisementGallery',

    data() {
        return {
            sourceData: [
            ],
            totalCount: 0,
            form: {
                id: '',
                type: '',
                status: ''
            },
            loading: true,
            pageIndex: 1,
            pageSize: 15,
            adType: enums.AdType,
            dialogVisible: false,
            previewImgUrl: ''
        }
    },

    computed: {
        tableData() {
            return this.sourceData.map(m => {
                return {
                    id: m.bannerId,
                    type: enums.AdType[m.mold],
                    picture: m.icon,
                    releaseTime: m.releaseTime,
                    module: enums.ModuleType[m.type.toString()],
                    toId: m.link,
                    sort: m.weight,
                    loading: false,
                    visible: m.status
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
                bannerId: this.form.id,
                mold: this.form.type,
                status: this.form.status,
                num: this.pageIndex,
                size: this.pageSize
            }


            try {
                let res = await AdGallerySelect(params);
                if (res.result) {
                    this.sourceData = res.map;

                } else {
                    this.sourceData = [];
                    this.$message.error('提交异常！' + res.message);
                }

                if (this.totalCount != res.count && (res.count != 0 || !res.result)) {
                    this.totalCount = res.count;
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
                status: toStatus,
                bannerId: o.id
            };
            try {
                let res = await AdGalleryCommit(data);
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


