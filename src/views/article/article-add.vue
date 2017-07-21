<template>
  <div class="form-wrapper">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="图片" prop="coverPicture">
        <el-upload class="avatar-uploader" action="#" :http-request="coverImgUpload" :auto-upload="true" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="标题" prop="name">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="作者" prop="name">
        <el-input v-model="form.author"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input type="textarea" v-model="form.content"></el-input>
      </el-form-item>
      <el-form-item label="音频图片" prop="audioPicture">
        <el-upload class="avatar-uploader" action="#" :http-request="audioImgUpload" :auto-upload="true" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="form.audioImageUrl" :src="form.audioImageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-form-item label="音频标题" prop="audioTitle">
          <el-input v-model="form.audioTitle"></el-input>
        </el-form-item>
        <el-form-item label="音频作者" prop="audioAuthor">
          <el-input v-model="form.audioAuthor"></el-input>
        </el-form-item>
      </el-form-item>
      <el-form-item label="上传音频" prop="audio">
        <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove">
          <el-button size="small" type="primary">点击上传</el-button>
          <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
        </el-upload>
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
import { AuthorSelectOne, AuthorCommit } from 'api';

export default {

  name: 'AuthorAdd',

  data() {
    return {
      form: {
        id: 0,
        imageUrl: '',
        title: '',
        author: '',
        content: '',
        audioImageUrl: '',
        audioTitle: '',
        audioAuthor: '',
        audioUrl: '',
        category: [],
        categoryNew: '',
        releaseTime: '',
        sort: '',
        visible: '0',
      },
      rules: {
        name: [
          { required: true, message: '' }
        ],
        category: [
          { required: true, message: '' }
        ],
        categoryNew: [
          { required: true, message: '' }
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

    async coverImgUpload(data) {
      let url = await this.upload(data);
      this.form.imageUrl = url[0].replace('http', 'https');
    },

    async audioImgUpload(data) {
      let url = await this.upload(data);
      this.form.audioImageUrl = url[0].replace('http', 'https');
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
            weight: this.form.sort,
            type: this.form.property,
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
          this.form.name = res.data.name
          this.form.imageUrl = res.data.icon
          this.form.desc = res.data.summary
          this.form.category = [res.data.father, res.data.son, res.data.grandson]
          this.form.categoryNew = res.data.newType
          this.form.property = res.data.type
          this.form.recommend = res.data.leak
          this.form.sort = res.data.weight
          this.form.visible = res.data.status

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
    }
  },

  mounted() {
    this.form.id = this.$route.params.Id
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


