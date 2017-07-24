<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="归属" prop="category">
                <el-select v-model="form.category" placeholder="请选择新归属">
                    <el-option v-for="o in sectionTree2" :key="o.name" :label="o.name" :value="o.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="打标签" prop="property">
                <el-tag type="gray" color="#fff" v-for="(o,i) in form.tagList" :key="i">{{o.tagName}}</el-tag>
                <el-popover ref="popover" placement="right" width="400" trigger="click">
                    <tag-select :tagList.sync="form.tagList"></tag-select>
                </el-popover>
                <el-button  type="text" v-popover:popover>选择标签</el-button>
                <el-button  type="text" @click="dialogVisible=true">新增标签</el-button>
            </el-form-item>
            <el-form-item label="是否显示" prop="visible">
                <el-radio-group v-model="form.visible">
                    <el-radio label="0">显示</el-radio>
                    <el-radio label="1">隐藏</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit('form')" :loading="btnLoading">提交</el-button>
                <el-button @click="onCancel">返回</el-button>
            </el-form-item>
        </el-form>
        <el-dialog title="新增标签" :visible.sync="dialogVisible">
            666
        </el-dialog>
    
    </div>
</template>

<script>
import sectionTreeSource2 from 'api/sectionTree2';
import tagSelect from './children/tag-select';

export default {
    name: 'TagRecommendAdd',

    components: {
        tagSelect
    },

    data() {
        return {
            form: {
                category: '',
                tagList: [],
                visible: '0'
            },
            rules: [],
            sectionTree2: sectionTreeSource2,
            btnLoading: false,
            dialogVisible: false,
        }
    },

    computed: {

    },

    methods: {

        onSubmit() {

        },

        onCancel() {
            history.go(-1);
        },

        tagSelectSumbit() {
            this.dialogVisible = false;

        },

        tagSelectCancel() {
            this.dialogVisible = false;
        }
    },

    mounted() {
    }
}
</script>


<style lang="less">
.el-tag {
    cursor: pointer;
    margin: 4px 4px 4px 0;
}
</style>

