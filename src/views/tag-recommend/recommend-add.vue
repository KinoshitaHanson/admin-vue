<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="归属" prop="id">
                <el-select v-model="form.id" placeholder="请选择归属">
                    <el-option v-for="o in sectionTree2" :key="o.name" :label="o.name" :value="o.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="打标签" prop="property">
                <draggable v-model="form.tagList" :options="{group:'people'}" @start="drag=true" @end="drag=false">
                    <transition-group type="transition" :name="'flip-list'">
                        <el-tag type="gray" color="#fff" v-for="(o,i) in form.tagList" :key="i" :closable="true" :close-transition="false" @close="tagHandleClose(o)">{{o.tagName}}</el-tag>
                    </transition-group>
                </draggable>
                <el-popover ref="popover" placement="right" width="400" trigger="click">
                    <tag-select :tagList.sync="form.tagList"></tag-select>
                </el-popover>
                <el-button type="text" v-popover:popover>选择标签</el-button>
                <el-button type="text" @click="dialogVisible=true">新增标签</el-button>
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
import draggable from 'vuedraggable'

import sectionTreeSource2 from 'api/sectionTree2';
import { TagRecommendSelect, TagRecommendUpdate,TagAdd,TagCategorySelect } from 'api';

import TagSelect from './children/tag-select';

export default {
    name: 'TagRecommendAdd',

    components: {
        TagSelect,
        draggable
    },

    data() {
        return {
            form: {
                id: 0,
                category: '',
                tagList: [],
                visible: "1"
            },
            addForm:{
                name:'',
                category:1
            },
            rules: [],
            sectionTree2: sectionTreeSource2,
            dialogVisible: false,
            tagCategoryList:[]
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

        tagSelectSumbit() {
            this.dialogVisible = false;

        },

        tagSelectCancel() {
            this.dialogVisible = false;
        },

        tagHandleClose(tag) {
            console.log(tag);
            this.form.tagList.splice(this.form.tagList.indexOf(tag), 1)
        },

        async tagAddSubmit(){
            let data = {
                deleteStatus:0,
                manageCategory:this.addForm.category,
                recommend:0,
                tagName:this.addForm.name,
                weight:0
            }

            try {
                let res = await TagAdd(data);
                if (res.code == 0) {
                    this.$message.success('提交成功！');
                    this.dialogVisible=false;
                    this.clearTagAddForm();
                } else {
                    this.$message.error('提交异常！');
                }
            } catch (error) {
                this.$message.error('提交异常！');
            }
        },

        tagAddCancel(){
            this.dialogVisible=false;
            this.clearTagAddForm();
        },

        clearTagAddForm(){
            this.addForm.name='';
            this.addForm.category=1;
        },

        async initTagCategory(){
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
        }
    },

    mounted() {
        console.log(this.$route);
        this.form.id = this.$route.params.Id
        if (this.form.id) this.getData();
    },


    created(){
        this.initTagCategory();
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

