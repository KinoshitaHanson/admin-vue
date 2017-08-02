<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="标签名称" prop="name">
                <el-input v-model="form.name" placeholder="标签名称"></el-input>
            </el-form-item>
            <el-form-item label="归属" prop="category">
                <el-select v-model="form.category" placeholder="请选择归属">
                    <el-option v-for="o in tagCategoryList" :key="o.name" :label="o.name" :value="o.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否推荐" prop="recommend">
                <el-select v-model="form.recommend" placeholder="是否推荐">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="是" value="0"></el-option>
                    <el-option label="否" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="排序值" prop="sort">
                <el-input-number v-model="form.sort"></el-input-number>
            </el-form-item>
            <el-form-item label="是否显示" prop="visible">
                <el-radio-group v-model="form.visible">
                    <el-radio label="0">显示</el-radio>
                    <el-radio label="1">隐藏</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit('form')">提交</el-button>
                <el-button @click="onCancel">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { TagSelectOne, TagAdd, TagEdit,TagCategorySelect } from 'api';

export default {
    name: 'TagAdd',

    data() {
        return {
            form: {
                id: '',
                name: '',
                category: '',
                recommend: '',
                sort: '',
                visible: '0',
            },
            rules: [],
            dialogVisible: false,
            tagCategoryList: []
        }
    },

    computed: {
        moduleType() {
            return this.$route.name.indexOf('Category') > -1 ? 1 : 2;//1分类页，2板块页
        },
    },

    methods: {

        async getData() {
            let loading = this.$loading({
                target: '.app-main-wrapper',
                body: true
            })

            let params = {
                id: this.form.id
            }

            try {
                let res = await TagSelectOne(params);
                if (res.code == 0 && res.result) {
                    this.form.name = res.result.tagName;
                    this.form.category = (this.tagCategoryList.find(m => m.name == res.result.tagCategory) || {}).id; //res.result.tagCategory;
                    this.form.recommend = res.result.recommend;
                    this.form.sort = res.result.weight;
                    this.form.visible = res.result.deleteStatus.toString();
                } else {
                    console.log(res.des)
                }

            } catch (error) {
                console.log(error)
            }

            loading.close();
        },

        async onSubmit() {
            let data = {
                id: this.form.id,
                tagName: this.form.name,
                deleteStatus: this.form.visible,
                manageCategory: this.form.category,
                recommend: this.form.recommend,
                weight: this.form.sort,
            }

            try {
                let res;
                if (data.id) {
                    res = await TagEdit(data);
                } else {
                    res = await TagAdd(data);
                }
                if (res.code == 0) {
                    this.$message.success('提交成功！');
                } else {
                    this.$message.error('提交异常！');
                }
            } catch (error) {
                this.$message.error('提交异常！');
            }
        },

        onCancel() {
            history.go(-1);
        },

        async initTagCategory() {
            try {
                let res = await TagCategorySelect({});
                if (res.code == 0) {
                    this.tagCategoryList = res.result.entity;
                } else {
                    this.$message.error('初始化标签归属异常');
                }
            } catch (error) {
                this.$message.error('初始化标签归属异常');
            }
        },
    },

    async mounted() {
        await this.initTagCategory();        
        
        this.form.id = this.$route.params.Id
        if (this.form.id) this.getData();
    },

    created() {
    }
}
</script>


<style lang="less">

</style>

