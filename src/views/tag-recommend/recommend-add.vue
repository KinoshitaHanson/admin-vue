<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="归属" prop="id">
                <el-select v-model="form.id" placeholder="请选择归属">
                    <el-option v-for="o in sectionTree2" :key="o.name" :label="o.name" :value="o.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="打标签" prop="tags">
                <tag-form :tagList.sync="form.tagList"></tag-form>
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
import sectionTreeSource2 from 'api/sectionTree2';
import { TagRecommendSelect, TagRecommendUpdate, TagAdd, TagCategorySelect } from 'api';

import TagForm from '@/components/tag-select/tag-form-item';

export default {
    name: 'TagRecommendAdd',

    components: {
        TagForm,
    },

    data() {
        return {
            form: {
                id: 0,
                category: '',
                tagList: [],
                visible: "1"
            },
            addForm: {
                name: '',
                category: 1
            },
            rules: [],
            sectionTree2: sectionTreeSource2,
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
                moduleType: this.moduleType,
                tagCategory: this.form.id
            }

            try {
                let res = await TagRecommendSelect(params);
                if (res.code == 0 && res.result[0]) {
                    this.form.id = (this.sectionTree2.find(m => m.name == res.result[0].categoryName) || {}).value;
                    this.form.tagList = res.result[0].tagList.map(m => { return { id: m.tagId, tagName: m.tagName } });
                    this.form.visible = res.result[0].deleteStatus.toString();

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
                deleteStatus: this.form.visible,
                moduleType: this.moduleType,
                tagCategory: this.form.id,
                tags: this.form.tagList.map(m => m.id).join(',')
            }
            console.log(data);

            try {
                let res = await TagRecommendUpdate(data);
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

    },

    mounted() {
        console.log(this.$route);
        this.form.id = this.$route.params.Id
        if (this.form.id) this.getData();
    },


    created() {
    }
}
</script>


<style lang="less">
.el-tag {
    cursor: pointer;
    margin: 4px 4px 4px 0;
}

.flip-list-move {
    transition: transform 0.5s;
}

.no-move {
    transition: transform 0s;
}

.ghost {
    opacity: .5;
    background: #C8EBFB;
}
</style>

