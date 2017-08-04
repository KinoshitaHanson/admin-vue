<template>
    <div class="form-wrapper">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="广告类型" prop="type">
                <el-select v-model="form.type" placeholder="请选择新归属">
                    <el-option v-for="(item,index) in adType" :key="index" :label="item" :value="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="广告图片" prop="avatar">
                <el-upload class="avatar-uploader" action="#" :http-request="upload" :auto-upload="true" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="关联模块" prop="module">
                <el-radio-group v-model="form.module">
                    <el-radio :label="0">文章</el-radio>
                    <el-radio :label="1">视频</el-radio>
                    <el-radio :label="2">活动</el-radio>
                    <el-radio :label="3">H5链接</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="跳转地址" prop="link">
                <el-input v-model="form.link"></el-input>
            </el-form-item>
            <el-form-item label="外显时间" prop="releaseTime">
                <el-date-picker v-model="form.releaseTime" type="datetime" placeholder="选择日期时间">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="广告标题" prop="title">
                <el-input v-model="form.title"></el-input>
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
import { AdGallerySelectOne, AdGalleryCommit } from 'api';

export default {

    name: 'AdvertisementGalleryAdd',

    data() {
        return {
            form: {
                id:0,
                type: '0',
                title: '',
                imageUrl: '',
                module: 0,
                link: '',
                releaseTime: '',
                sort: '',
                visible: '0',
            },
            rules: {
                type: [
                    { required: true, message: '' }
                ],
                releaseTime: [
                    { required: true, message: '' }
                ],
                title: [
                    { required: true, message: '' }
                ],
                visible: [
                    { required: true, message: '' }
                ]
            },
            btnLoading: false,
            adType: enums.AdType

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
                        bannerId: this.form.id,
                        link: this.form.link,
                        title: this.form.title,
                        weight: this.form.sort,
                        releaseTime: this.form.releaseTime,
                        icon: this.form.imageUrl,
                        mold: this.form.module,
                        type: this.form.type,
                        status: this.form.visible,
                    };
                    try {
                        let res = await AdGalleryCommit(data);
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
                bannerId: this.form.id,
            }
            try {
                let res = await AdGallerySelectOne(params);
                if (res.result) {
                    this.form.id=res.data.bannerId;
                    this.form.type = res.data.type.toString();
                    this.form.title = res.data.title;
                    this.form.imageUrl = res.data.icon;
                    this.form.module = res.data.mold;   
                    this.form.link = res.data.link;
                    this.form.releaseTime = res.data.releaseTime;
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
            // history.go(-1);
            this.$router.push({path:'/Advertisement/Gallery'})
        }
    },

    mounted() {
        this.$route.params.Id&&(this.form.id = this.$route.params.Id);
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


