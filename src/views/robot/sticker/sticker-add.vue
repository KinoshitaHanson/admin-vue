<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="图片" prop="picture">
        <el-upload class="avatar-uploader" action="#" :http-request="imgUpload" :auto-upload="true" :show-file-list="false">
          <img v-if="form.picture" :src="form.picture" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="归属" prop="category">
        <el-select v-model="form.category" placeholder="请选择归属">
          <el-option v-for="o in categoryList" :key="o.val" :label="o.label" :value="o.val"></el-option>
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
import { RobotStickerSelectOne, RobotStickerAdd, RobotStickerUpdate, RobotStickerCategorySelect } from 'api';

export default {
  name: 'RobotStickerAdd',

  data() {
    return {
      form: {
        id: '',
        category: '',
        picture: '',
        sort: '',
        visible: '0',
      },
      rules: [],
      categoryList: []
    }
  },

  computed: {

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
        let res = await RobotStickerSelectOne(params);
        if (res.code == 0 && res.result) {
          this.form.picture = res.result.picUrl;
          this.form.category = (this.categoryList.find(m => m.label == res.result.categoryLabel) || {}).val; //res.result.tagCategory;
          this.form.recommend = res.result.recommend;
          this.form.sort = res.result.weight;
          this.form.visible = res.result.deleteStatus.toString();
        } else {
          this.$message.error('查询异常！' + res.des);
        }

      } catch (error) {
        this.$message.error('查询异常！');
      }

      loading.close();
    },

    async onSubmit() {
      let data = {
        id: this.form.id,
        picUrl: this.form.picture,
        deleteStatus: this.form.visible,
        category: this.form.category,
        weight: this.form.sort,
      }

      try {
        let res;
        if (data.id) {
          res = await RobotStickerUpdate(data);
        } else {
          res = await RobotStickerAdd(data);
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
      this.form.picture = url[0].replace('http', 'https');
    },

    async initCategory() {
      try {
        let res = await RobotStickerCategorySelect({});
        if (res.code == 0) {
          this.categoryList = res.result;
        } else {
          this.$message.error('初始化图片分类异常');
        }
      } catch (error) {
        this.$message.error('初始化图片分类异常');
      }
    },
  },

  async mounted() {
    await this.initCategory();

    this.form.id = this.$route.params.Id
    if (this.form.id) this.getData();
  },

  created() {
  }
}
</script>


<style lang="less">

</style>

