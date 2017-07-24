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
                        <img v-bind:src="scope.row.picture" />
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
                        <el-button type="primary" icon="edit" @click.native.prevent="deleteRow(scope.$index)" size="small">编辑</el-button>
                        <el-button type="primary" icon="delete" @click.native.prevent="deleteRow(scope.$index)" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagin-container">
                <el-pagination v-show="sourceData.length>0" @current-change="handleCurrentChange" :current-page="pageIndex" :page-size="pageSize" layout="total, prev, pager, next" :total="totalCount">
                </el-pagination>
            </div>
        </div>
    
    </div>
</template>

<script>
import * as enums from 'utils/enum';

export default {
    name: 'GalleryAd',

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
            adType: enums.AdType
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
                    module: enums.ModuleType[m.type],
                    toId: m.link,
                    sort: m.weight
                }
            });
        }
    },

    methods: {
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.pageIndex = val;
            this.getData(this.pageIndex, this.pageSize);
        },
        onSubmit() {

            if (this.pageIndex == 1) {
                this.getData(this.pageIndex, this.pageSize)
            } else {
                this.pageIndex = 1
            };
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
        async getData(pageIndex, pageSize) {
            let loading = this.$loading({
                target: '.table-container',
                body: true
            })

            let params = {
                bannerId: this.form.id,
                mold: this.form.type,
                status: this.form.status
            }


            try {
                let res = await this.$fetch.get('/management/banner/select', { params: Object.assign(params, { num: pageIndex, size: pageSize }) });
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
                loading.close();

            }
            loading.close();
        }
    },

    created() {


    },
    mounted() {
        this.getData(this.pageIndex, this.pageSize);
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

img {
    width: 100%;
    height: 100%;
    vertical-align: middle;
}
</style>


