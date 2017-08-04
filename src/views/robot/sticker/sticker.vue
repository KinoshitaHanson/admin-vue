<template>
  <div>
    <div class="form-container">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="Id">
          <el-input v-model="form.id" placeholder="表情Id"></el-input>
        </el-form-item>
        <el-form-item label="所属分类">
          <el-select v-model="form.category" placeholder="所属分类">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="(item,index) in categoryList" :key="item.val" :label="item.label" :value="item.val"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker v-model="form.createTime" type="daterange" :editable="false" placeholder="选择日期范围">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="form.visible" placeholder="有效性">
            <el-option label="全部" value=""></el-option>
            <el-option label="有效" value="0"></el-option>
            <el-option label="无效" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="primary" @click="onAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-container">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="id" label="Id" width="60">
        </el-table-column>
        <el-table-column prop="picture" label="图片" width="180">
          <template scope="scope">
            <img v-bind:src="scope.row.picture" @click="imgPreview(scope.row.picture)" />
          </template>
        </el-table-column>
        <el-table-column prop="category" label="所属分类" width="120">
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间">
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template scope="scope">
            <el-button type="primary" icon="edit" @click.native.prevent="editRow(scope.row.id)" size="small">编辑</el-button>
            <el-button :type="scope.row.visible=='0'?'success':'danger'" icon="warning" :loading="scope.row.loading" @click.native.prevent="toggleStatus(scope.row)" size="small">{{scope.row.visible=='0'?'有效':'无效'}}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagin-container">
        <el-pagination v-show="sourceData.length>0" @current-change="handleCurrentChange" :current-page="pageIndex" :page-size="pageSize" layout="total, prev, pager, next" :total="totalCount">
        </el-pagination>
      </div>
    </div>
    <el-dialog title="预览" :visible.sync="dialogVisible" :lock-scroll="true">
      <el-card :body-style="{ padding: '0px' }">
        <img :src="previewImgUrl" class="image">
      </el-card>
    </el-dialog>
  </div>
</template>

<script>
import { RobotStickerSelect, RobotStickerUpdate, RobotStickerCategorySelect } from 'api';

export default {
  name: 'RobotSticker',

  data() {
    return {
      sourceData: [
      ],
      totalCount: 0,
      form: {
        id: '',
        createTime: [],
        category: '',
        visible: ''
      },
      loading: true,
      pageIndex: 1,
      pageSize: 15,
      categoryList: [],
      dialogVisible: false,
      previewImgUrl: ''
    }
  },

  computed: {
    tableData() {
      return this.sourceData.map(m => {
        return {
          id: m.id,
          category: m.categoryLabel,
          picture: m.picUrl,
          createTime: m.createTime,
          sort: m.weight,
          visible: m.deleteStatus,
          loading: false,
        }
      });
    }
  },

  methods: {

    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getData();
    },
    onSubmit() {

      if (this.pageIndex == 1) {
        this.getData()
      } else {
        this.pageIndex = 1
      };
    },

    editRow(id) {
      this.$router.push({ path: 'Edit/' + id })
    },

    deleteRow(i) {
      console.log(i);
    },

    onAdd() {
      this.$router.push({ path: 'Add' })
    },

    handleChange(value) {

    },

    //数据源查询
    async getData(pageIndex, pageSize) {
      let loading = this.$loading({
        target: '.table-container',
        body: true
      })

      let params = {
        id: this.form.id,
        category: this.form.category,
        startTime: this.form.createTime[0],
        endTime: this.form.createTime[1],
        deleteStatus: this.form.visible,
        pageNo: this.pageIndex,
        pageSize: this.pageSize
      }

      try {
        let res = await RobotStickerSelect(params);
        if (res.code == 0) {
          this.sourceData = res.result.entity;

        } else {
          this.sourceData = [];
          this.$message.error('查询异常！' + res.message);
        }

        if (this.totalCount != res.result.totalResult && (res.result.totalResult != 0 || !res.result)) {
          this.totalCount = res.result.totalResult;
        }
      } catch (error) {
        this.$message.error('查询异常！');
      }
      loading.close();
    },

    async toggleStatus(o) {
      o.loading = true;
      let toStatus = o.visible == 0 ? 1 : 0;
      let data = {
        id: o.id,
        category: this.categoryList.find(m => m.label == o.category).val,
        picUrl: o.picture,
        weight: o.sort,
        deleteStatus: toStatus,
      };
      try {
        let res = await RobotStickerUpdate(data);
        if (res.code == 0) {
          toStatus == 0 ? this.$message.success('已设置为有效！') : this.$message.warning('已设置为无效！');
          o.visible = toStatus;
        } else {
          this.$message.error('提交异常！');
        }
      } catch (error) {
        this.$message.error('提交异常！' + error.toString());
      }
      o.loading = false;
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

    imgPreview(url) {
      this.previewImgUrl = url;
      this.dialogVisible = true;
    },


  },

  created() {

  },
  mounted() {
    this.initCategory();
    this.getData();
  }
}
</script>


<style lang="less" scoped>
img {
  width: 100%;
  height: 100%;
  vertical-align: middle;
}

.cell>img {
  cursor: pointer;
}
</style>


