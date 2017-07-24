<template>
    <div class="todo-wrapper">
        <div class="td__title">TodoList</div>
        <div class="td__tool-bar">
            <el-input placeholder="请输入搜索内容" icon="search" v-model="searchKey" :on-icon-click="handleIconClick"></el-input>
        </div>
        <div class="td__content"></div>
    </div>
</template>

<script>
export default {
    name: 'TodoList',

    data() {
        return {
            searchKey:''
        }
    },

    methods: {
        handleIconClick() {

        }
    }
}
</script>


<style lang="less" scoped>
.todo-wrapper {
    width: 100%;
    height: 100%;
}

.td__title {
    font-size: 48px;
    color: #666;
}

.td__tool-bar {
    .el-input{
        width:200px;
    }
}

.td__content {}
</style>


