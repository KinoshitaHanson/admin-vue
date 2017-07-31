<template>
  <div class="form-wrapper">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="图片" prop="coverPicture">
        <el-upload class="avatar-uploader" action="#" :http-request="imgUpload" :auto-upload="true" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="Up主" prop="author">
        <el-input v-model="form.author"></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="content" style="height:500px;">
        <!-- <el-input
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 10}"
          placeholder="请输入内容"
          v-model="form.content">
        </el-input> -->
        <quill-editor v-model="form.content" ref="myQuillEditor" :options="quillOption" style="height:400px;">
        </quill-editor>
      </el-form-item>
      <el-form-item label="链接" prop="url">
        <el-input v-model="form.url"></el-input>
      </el-form-item>
      <el-form-item label="视频时长" prop="videoTime">
        <el-input-number v-model="form.videoTime[0]"></el-input-number> -
        <el-input-number v-model="form.videoTime[1]"></el-input-number> -
        <el-input-number v-model="form.videoTime[2]"></el-input-number>
      </el-form-item>
      <el-form-item label="老归属" prop="category">
        <el-cascader :options="sectionTree" v-model="form.category" @change="handleChange">
        </el-cascader>
      </el-form-item>
      <el-form-item label="新归属" prop="categoryNew">
        <el-select v-model="form.categoryNew" placeholder="请选择新归属">
          <el-option v-for="o in sectionTree2" :key="o.name" :label="o.name" :value="o.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="打标签" prop="tags">
        <tag-form :tagList.sync="form.tagList"></tag-form>
      </el-form-item>
      <el-form-item label="外显时间" prop="releaseTime">
        <el-date-picker v-model="form.releaseTime" type="datetime" placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="排序值" prop="sort">
        <el-input type="sort" v-model.number="form.sort" auto-complete="off"></el-input>
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
import { VideoSelectOne, VideoCommit } from 'api';
import TagForm from '@/components/tag-select/tag-form-item';
import { quillEditor } from 'vue-quill-editor';

export default {

  name: 'VideoAdd',

  components: {
    TagForm,
    quillEditor
  },

  data() {
    return {
      form: {
        id: 0,
        imageUrl: '',
        title: '',
        author: '',
        content: '',
        url:'',
        videoTime:[],
        category: [],
        categoryNew: '',
        releaseTime: '',
        sort: '',
        visible: '0',
        tagList: []
      },
      rules: {
        title: [
          { required: true, message: '请输入标题' }
        ],
        url: [
          { required: true, message: '请输入链接' }
        ],
        categoryNew: [
          { required: true, message: '请选择新归属' }
        ],
        visible: [
          { required: true, message: '' }
        ]
      },
      sectionTree2: sectionTreeSource2,
      sectionTree: sectionTreeSource,
      btnLoading: false,
      quillOption: {
        
      }
    }
  },

  methods: {
    handleAvatarSuccess(res, file) {


    },

    beforeAvatarUpload(file) {

    },

    handleChange() {

    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },

    handlePreview(file) {
      console.log(file);
    },

    async upload(data) {
      try {
        let file = data.file;
        let endName = file.name.split('.')[1];
        let storeAs = Date.parse(new Date()) + (new Date().getMilliseconds()) + '.' + endName;

        let result = await this.$client.multipartUpload(storeAs, file);
        let url = result.res.requestUrls[0].split('?');
        return url;

      } catch (error) {
        console.log(error);
      }
    },

    async imgUpload(data) {
      let url = await this.upload(data);
      this.form.imageUrl = url[0].replace('http', 'https');
    },

    async onSubmit(formName) {
      this.btnLoading = true;
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let data = {
            videoId: this.form.id,
            title: this.form.title,
            icon: this.form.imageUrl,
            authorId: this.form.author,
            summary: this.form.content,
            link: this.form.url,
            length: this.form.videoTime.join(':'),
            father: this.form.category[0],
            son: this.form.category[1],
            grandson: this.form.category[2],
            tagCategory: this.form.categoryNew,
            releaseTime: this.form.releaseTime,
            weight: this.form.sort,
            status: this.form.visible,
            tagBaseIdList: this.form.tagList.map(m => m.id).join(',')
          };
          try {
            let res = await VideoCommit(data);
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
        videoId: this.form.id,
      }
      try {
        let res = await VideoSelectOne(params);
        if (res.result) {

          this.form.title = res.data.title;
          this.form.imageUrl = res.data.icon;
          this.form.author = res.data.authorId;
          this.form.url = res.data.link;
          this.form.videoTime = res.data.length.split(':');
          this.form.content = res.data.summary;
          this.form.category = [res.data.father, res.data.son, res.data.grandson];
          this.form.categoryNew = res.data.tagCategory;
          this.form.tagList = res.data.tagBaseList;
          this.form.releaseTime = res.data.releaseTime;
          this.form.sort = res.data.weight;
          this.form.visible = res.data.status;
          res.data.tagBaseIdList && (this.form.tagList = Array.of(res.data.tagBaseIdList));

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
      history.go(-1);
    },

    tagHandleClose(tag) {
      console.log(tag);
      this.form.tagList.splice(this.form.tagList.indexOf(tag), 1)
    },

  },

  mounted() {
    this.form.id = this.$route.params.Id
    if (this.form.id) this.getData();

  }
}
</script>

<style lang="less">

</style>


