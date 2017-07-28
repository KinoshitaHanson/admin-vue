<template>
    <div>
        <draggable v-model="tagList" :options="{group:'people'}" @start="drag=true" @end="drag=false">
            <transition-group type="transition" :name="'flip-list'">
                <el-tag type="gray" color="#fff" v-for="(o,i) in tagList" :key="i" :closable="true" :close-transition="false" @close="tagHandleClose(o)">{{o.tagName}}</el-tag>
            </transition-group>
        </draggable>
        <el-popover ref="popover" placement="right" width="400" trigger="click">
            <tag-select :tagList.sync="tagList"></tag-select>
        </el-popover>
        <el-button type="text" v-popover:popover>选择标签</el-button>
        <el-button type="text" @click="dialogVisible=true">新增标签</el-button>
    
        <el-dialog title="新增标签" :visible.sync="dialogVisible" :show-close="false">
            <el-form ref="addForm" :model="addForm" label-width="80px">
                <el-form-item label="标签名称">
                    <el-input v-model="addForm.name" placeholder="标签名称"></el-input>
                </el-form-item>
                <el-form-item label="归属" prop="id">
                    <el-select v-model="addForm.category" placeholder="请选择归属">
                        <el-option v-for="o in tagCategoryList" :key="o.id" :label="o.name" :value="o.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="tagAddSubmit('addForm')">提交</el-button>
                <el-button @click="tagAddCancel">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import Draggable from 'vuedraggable';
import TagSelect from './tag-select';
import { TagAdd, TagCategorySelect } from 'api';

export default {
    name: 'TagForm',

    data() {
        return {
        }
    },

    computed: {

    },

    components: {
        Draggable,
        TagSelect
    },

    props: {
        tagList: Array
    },

    data() {
        return {
            // form: {
            //     tagList: []
            // },
            addForm: {
                name: '',
                category: '',
            },
            tagCategoryList: [],
            dialogVisible: false
        }
    },

    methods: {

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

        async tagAddSubmit() {
            let data = {
                deleteStatus: 0,
                manageCategory: this.addForm.category,
                recommend: 0,
                tagName: this.addForm.name,
                weight: 0
            }

            try {
                let res = await TagAdd(data);
                if (res.code == 0) {
                    this.$message.success('提交成功！');
                    this.dialogVisible = false;
                    this.clearTagAddForm();
                } else {
                    this.$message.error('提交异常！');
                }
            } catch (error) {
                this.$message.error('提交异常！');
            }
        },

        tagAddCancel() {
            this.dialogVisible = false;
            this.clearTagAddForm();
        },

        clearTagAddForm() {
            this.addForm.name = '';
            this.addForm.category = 1;
        },

        tagHandleClose(tag) {
            console.log(tag);
            this.tagList.splice(this.tagList.indexOf(tag), 1)
        },
    },

    mounted() {
        this.initTagCategory();
    }
}
</script>

<style lang="less" scoped>


.el-form-item {
    margin-bottom: 22px;
}
</style>

