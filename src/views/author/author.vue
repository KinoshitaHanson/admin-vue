<template>
    <div>
        <div class="form-container">
            <el-form :inline="true" :model="form" class="demo-form-inline">
                <el-form-item label="Id">
                    <el-input v-model="form.id" placeholder="作者Id"></el-input>
                </el-form-item>
                <el-form-item label="作者名称">
                    <el-input v-model="form.name" placeholder="作者名称"></el-input>
                </el-form-item>
                <el-form-item label="板块归属">
                    <el-cascader :options="sectionTree" v-model="form.category" @change="handleChange">
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
                <el-table-column prop="id" label="Id" width="60">
                </el-table-column>
                <el-table-column prop="name" label="作者名称" width="180">
                </el-table-column>
                <el-table-column prop="category" label="板块归属">
                    <template scope="scope">
                        <div style="margin-bottom:4px;"><span style="color:#00a2d4">旧:</span>{{scope.row.category}}</div>
                        <div><span style="color:#ff0000">新:</span>{{scope.row.categoryNew}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="recommend" label="是否推荐" width="120">
                </el-table-column>
                <el-table-column prop="property" label="属性" width="100">
                </el-table-column>
                <el-table-column label="操作" width="180">
                    <template scope="scope">
                        <el-button type="primary" icon="edit" @click.native.prevent="editRow(scope.row.id)" size="small">编辑</el-button>
                        <!-- <el-button type="primary" icon="delete" @click.native.prevent="deleteRow(scope.row.id)" size="small">删除</el-button> -->
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
import { AuthorSelect,AuthorCommit } from 'api';

export default {
    name: 'Author',

    data() {
        return {
            sourceData: [],
            form: {
                id: '',
                name: '',
                category: [''],
                status: '',
            },
            totalCount: 0,
            pageIndex: 1,
            pageSize: 15,
            loading: true,
            authorTypeEnum: enums.AuthorType,
            recommendEnum: enums.IsRecommend,
            sectionTree: sectionTreeSource
        }
    },

    computed: {
        tableData() {
            return this.sourceData.map(m => {
                return {
                    id: m.authorId,
                    name: m.name,
                    category: [m.father, m.son, m.grandson].filter(m => m).join('/'),
                    categoryNew:m.tagCategoryName,
                    recommend: this.recommendEnum[m.leak],
                    property: this.authorTypeEnum[m.type],
                    loading:false,
                    visible:m.status
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
        deleteRow(id) {
            console.log(id);
        },

        editRow(id) {
            this.$router.push({ path: 'Edit/' + id })
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
                authorId: this.form.id||0,
                name: this.form.name,
                father: this.form.category[0],
                son: this.form.category[1],
                grandson: this.form.category[2],
                status: this.form.status,
                num:this.pageIndex,
                size:this.pageSize
            }
            try {
                let res = await AuthorSelect(params);
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
                this.$log.writeExLog(error)
                this.$message.error('查询异常！');
            }

            loading.close();

        },

        async toggleStatus(o) {
            o.loading = true;
            let toStatus = o.visible == 0 ? 1 : 0;
            let data = {
                status: toStatus,
                authorId: o.id
            };
            try {
                let res = await AuthorCommit(data);
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


