<template>
  <div class="form-wrapper">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="作者名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="简介">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item label="归属">
        <el-select v-model="form.attach" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
        <el-select v-model="form.attach" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
        <el-select v-model="form.attach" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="属性">
        <el-radio-group v-model="form.property">
          <el-radio label="线上品牌商赞助"></el-radio>
          <el-radio label="线下场地免费"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="推荐">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="排序值" prop="sort" :rules="[
              { required: true, message: '排序值不能为空'},
              { type: 'number', message: '排序值必须为数字值'}
            ]">
        <el-input type="sort" v-model.number="form.sort" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="是否显示" :rules="[
              { required: true, message: ''},
            ]">
        <el-radio-group v-model="form.visible">
          <el-radio label="1">显示</el-radio>
          <el-radio label="0">隐藏</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        visible: '1',
        desc: '',
        sort:'',
        attach:'',
        property:''
      },
      imageUrl:''
    }
  },
  methods: {
    handleAvatarSuccess(){

    },

    beforeAvatarUpload(){

    },

    onSubmit() {
      console.log('submit!');
    },

    onCancel(){
      history.go(-1);
    }
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


