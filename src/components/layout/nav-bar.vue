<template>
    <div class="nav-bar-wrapper">
        <div class="shrink-btn">
            <i class="el-icon-menu"></i>
        </div>
        <el-breadcrumb class="nav-bar__bread" separator="/">
            <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item> -->
            <el-breadcrumb-item v-for="(o,i) in breadcrumbList" :key="o.path" :to="o.path">{{o.name}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
export default {

    mounted() {
        console.log()
    },

    computed: {
        breadcrumbList() {
            let matched = this.$route.matched.filter(m => m.name);
            let first = matched[0];
            if (first && first.name != '首页') {
                matched = [{ name: '首页', path: '/' }].concat(matched);
            }
            return matched;
        }
    },

    methods: {
        initBreadcrumb() {
        }
    }
}
</script>

<style lang="less">
.nav-bar-wrapper {
    height: 50px;
    width: 100%;
    background-color: #eef1f6;
    display: flex;
    align-items: center;
    background-color: #f3f3f3;
}

.shrink-btn {
    padding: 0 10px;
}

.nav-bar__bread {
    padding-left: 10px;
}
</style>


