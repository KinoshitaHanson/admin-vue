<template>
    <div class="form-wrapper">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="作者名称" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="头像" prop="avatar">
                <el-upload class="avatar-uploader" action="#" :http-request="upload" :auto-upload="true" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="简介" prop="desc">
                <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="老归属" prop="category">
                        <el-cascader :options="sectionTree" v-model="form.category" @change="handleChange">
                        </el-cascader>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="新归属" prop="categoryNew">
                        <el-select v-model="form.categoryNew" placeholder="请选择新归属">
                            <el-option v-for="o in sectionTree2" :key="o.name" :label="o.name" :value="o.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="属性" prop="property">
                <el-radio-group v-model="form.property">
                    <el-radio label="0">文章</el-radio>
                    <el-radio label="1">视频</el-radio>
                    <el-radio label="2">图片</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="推荐" prop="recommend">
                <el-select v-model="form.recommend" placeholder="">
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
                <el-button type="primary" @click="onSubmit('form')" :loading="btnLoading">提交</el-button>
                <el-button @click="onCancel">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import * as enums from 'utils/enum';
import sectionTreeSource from 'api/sectionTree';
import sectionTreeSource2 from 'api/sectionTree2';
import { AuthorSelectOne, AuthorCommit } from 'api';

export default {

    name: 'AuthorAdd',

    data() {
        return {
            form: {
                id: 0,
                name: '',
                imageUrl: '',
                desc: '',
                category: [],
                categoryNew: '',
                property: '',
                recommend: '1',
                sort: '',
                visible: '0',
            },
            rules: {
                name: [
                    { required: true, message: '请输入作者名称' }
                ],
                category: [
                    { required: true, message: '请选择老归属' }
                ],
                categoryNew: [
                    { required: true, message: '请选择新归属' }
                ],
                sort: [
                    { required: true, message: '排序值不能为空' },
                    { type: 'number', message: '排序值必须为数字值' }
                ],
                visible: [
                    { required: true, message: '' }
                ]
            },
            authorType: enums.AuthorType,
            isRecommend: enums.IsRecommend,
            sectionTree2: sectionTreeSource2,
            sectionTree: sectionTreeSource,
            btnLoading: false
        }
    },
    methods: {
        handleAvatarSuccess(res, file) {


        },

        beforeAvatarUpload(file) {

        },

        handleChange() {

        },

        async upload(data) {
            try {
                let file = data.file;
                let endName = file.name.split('.')[1];
                let storeAs = Date.parse(new Date()) + (new Date().getMilliseconds()) + '.' + endName;

                let result = await this.$client.multipartUpload(storeAs, file);
                let url = result.res.requestUrls[0].split('?');
                this.form.imageUrl = url[0].replace('http', 'https');

            } catch (error) {
                console.log(error);
            }
        },

        async onSubmit(formName) {
            this.btnLoading = true;
            this.$refs[formName].validate(async valid => {
                if (valid) {
                    let data = {
                        authorId: this.form.id,
                        name: this.form.name,
                        summary: this.form.desc,
                        icon: this.form.imageUrl,
                        father: this.form.category[0],
                        son: this.form.category[1],
                        grandson: this.form.category[2],
                        tagCategory: this.form.categoryNew,
                        weight: this.form.sort,
                        type: this.form.property,
                        newType: this.form.property,
                        leak: this.form.recommend,
                        status: this.form.visible
                    };
                    try {
                        let res = await AuthorCommit(data);
                        if (res.result) {
                            this.$message.success('提交成功！');
                        } else {
                            this.$message.error('提交异常！');
                        }
                    } catch (error) {
                        this.$message.error('提交异常！');

                    }
                } else {
                    this.$message.error('表单验证失败！');
                }
            })
            this.btnLoading = false;

        },

        async getData() {
            let loading = this.$loading({
                target: '.form-wrapper',
                body: true
            })
            let params = {
                authorId: this.form.id,
            }
            try {
                let res = await AuthorSelectOne(params);
                if (res.result) {
                    this.form.name = res.data.name;
                    this.form.imageUrl = res.data.icon;
                    this.form.desc = res.data.summary;
                    this.form.category = [res.data.father, res.data.son, res.data.grandson];
                    this.form.categoryNew = res.data.tagCategory == 0 ? '' : res.data.tagCategory;
                    this.form.property = res.data.type;
                    this.form.recommend = res.data.leak;
                    this.form.sort = res.data.weight;
                    this.form.visible = res.data.status;

                } else {
                    this.$message.error(res.message);
                }
            } catch (error) {
                this.$message.error('数据获取异常！');
                console.log(error);
            }
            loading.close();
        },

        onCancel() {
            this.$router.push({ path: '/Author' })
        }
    },

    mounted() {
        this.$route.params.Id && (this.form.id = this.$route.params.Id);
        if (this.form.id) this.getData();

    }
}
</script>

<style lang="less">
.form-wrapper {
    // padding: 24px;
    // max-width: 1000px;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>


