<template>
  <div>
    <div class="form-container">
      <el-form :inline="true" :model="form" class="demo-form-inline">
        <el-form-item label="Id">
          <el-input v-model="form.id" placeholder="标签Id"></el-input>
        </el-form-item>
        <el-form-item label="标签名称">
          <el-input v-model="form.name" placeholder="标签名称"></el-input>
        </el-form-item>
        <el-form-item label="标签归属">
          <el-select v-model="form.category" placeholder="请选择归属">
              <el-option label="全部" value=""></el-option>
              <el-option v-for="o in tagCategoryList" :key="o.id" :label="o.name" :value="o.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="推荐" prop="recommend">
          <el-select v-model="form.recommend" placeholder="是否推荐">
            <el-option label="全部" value=""></el-option>            
            <el-option label="是" value="0"></el-option>
            <el-option label="否" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="form.status" placeholder="有效性">
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
        <el-table-column prop="id" label="Id" width="80">
        </el-table-column>
        <el-table-column prop="name" label="标签名" >
        </el-table-column>
        <el-table-column prop="category" label="所属分类" >
        </el-table-column>
        <el-table-column prop="pv" label="是否推荐" width="100">
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template scope="scope">
            <el-button type="primary" icon="edit" @click.native.prevent="editRow(scope.row.id)" size="small">编辑</el-button>
            <el-button :type="scope.row.visible=='0'?'success':'danger'" icon="warning" :loading="scope.row.loading" @click.native.prevent="toggleStatus(scope.row)" size="small">{{scope.row.visible=='0'?'有效':'无效'}}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagin-container">
        <el-pagination v-show="sourceData.length>0" @current-change="handleCurrentChange" :current-page.sync="pageIndex" :page-size="pageSize" layout="total, prev, pager, next" :total="totalCount">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import * as enums from 'utils/enum';
import sectionTreeSource from 'api/sectionTree';
import sectionTreeSource2 from 'api/sectionTree2';
import { TagSelect, TagEdit, TagCategorySelect } from 'api';

export default {
  name: 'Tag',

  data() {
    return {
      sourceData: [],//源数据
      form: {//表单
        id: '',
        name: '',
        category: '',
        status: '',
        recommend: ''
      },
      totalCount: 0,//总数
      pageIndex: 1,//页码
      pageSize: 15,//页长
      loading: true,//载入画面
      statusLoading: false,//状态修改载入
      tagCategoryList: [],
      recommendEnum: enums.IsRecommend,
    }
  },

  computed: {
    tableData() {
      return this.sourceData.map(m => {
        return {
          id: m.id,
          name: m.tagName,
          category: m.tagCategory,
          recommend: m.recommend,
          visible: m.deleteStatus,
          sort:m.weight,
          loading: false
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

    async toggleStatus(o) {
      o.loading = true;
      let toStatus = o.visible == 0 ? 1 : 0;
      let data = {
        id:o.id,
        deleteStatus: toStatus,
        weight: o.sort
      };
      try {
        let res = await TagEdit(data);
        if (res.code==0) {
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

    editRow(id) {
      this.$router.push({ path: 'Edit/' + id })
    },

    onAdd() {
      this.$router.push({ path: 'Add' })
    },

    handleChange(value) {

    },

    async getData() {
      let loading = this.$loading({
        target: '.table-container',
        body: true
      })

      let params = {
        id: this.form.id,
        tagName: this.form.name,
        tagCategory: this.form.category,
        recommend: this.form.recommend,
        deleteStatus: this.form.status,
        pageNo: this.pageIndex,
        pageSize: this.pageSize,
      }

      try {
        let res = await TagSelect(params);
  
        if (res.result.entity) {
          this.sourceData = res.result.entity;

        } else {
          this.sourceData = [];
          console.log(res.message)
        }

        if (this.totalCount != res.result.totalResult && (res.result.totalResult != 0 || !res.result.entity)) {
          this.totalCount = res.result.totalResult;
        }
      } catch (error) {
        console.log(error)
      }

      loading.close();
    },

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
  },

  created() {


  },
  mounted() {
    // m.o=0;
    this.initTagCategory();
    this.getData();
  },


}
</script>


<style lang="less" >

</style>


