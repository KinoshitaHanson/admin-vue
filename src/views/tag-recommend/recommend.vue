<template>
    <div>
        <div class="table-container">
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="id" label="Id" width="60">
                </el-table-column>
                <el-table-column prop="category" label="归属分类" width="150">
                </el-table-column>
                <el-table-column prop="tags" label="所打标签">
                    <template scope="scope">
                        <el-tag type="gray" v-if="tag.tagName" v-for="(tag,index) in scope.row.tags" :key="index"  color="#fff">{{tag.tagName}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180">
                    <template scope="scope">
                        <el-button type="primary" icon="edit" @click.native.prevent="editRow(scope.row.id)" size="small">编辑</el-button>
                        <el-button type="primary" icon="delete" @click.native.prevent="deleteRow(scope.row.id)" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import { TagRecommendSelect } from 'api';

export default {
    name: 'TagRecommend',

    data() {
        return {
            sourceData: [],

        }
    },

    computed: {
        isCategory() {
            return this.$route.name == 'TagRecommendCategory';
        },
        tableData() {
            return this.sourceData.map(m => {
                return {
                    id: m.categoryId,
                    category: m.categoryName,
                    tags: m.tagList
                }
            });
        }
    },

    methods: {
        //数据源查询
        async getData() {
            let loading = this.$loading({
                target: '.table-container',
                body: true
            })

            let params = {
                moduleType: this.isCategory ? 1 : 2 //1分类页，2板块页
            }

            try {
                let res = await TagRecommendSelect(params);
                if (res.code == 0) {
                    this.sourceData = res.result;

                } else {
                    this.sourceData = [];
                    console.log(res.des)
                }

            } catch (error) {
                console.log(error)
            }

            loading.close();

        },

        deleteRow(id) {
            console.log(id);
        },

        editRow(id) {
            this.$router.push({ path: 'Edit/' + id })
        },
    },

    mounted() {
        this.getData();
    },

    watch: {
        isCategory() {
            this.getData();
        }
    }
}
</script>


<style lang="less" scoped>
.el-tag {
    margin: 2px 3px;
}
</style>

