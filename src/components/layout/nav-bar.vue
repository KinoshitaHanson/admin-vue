<template>
    <div class="nav-bar-wrapper">
        <div class="shrink-btn">
            <i class="el-icon-menu"></i>
        </div>
        <el-breadcrumb class="nav-bar__bread" separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
export default {

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

.shrink-btn{
    padding: 0 10px;
}

.nav-bar__bread {
    padding-left: 10px;
}
</style>


