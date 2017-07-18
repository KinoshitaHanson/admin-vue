<template>
    <div class="side-bar-wrapper">
        <div class="side-bar-info">
            <div class="side-bar__img"></div>
            <div class="side-bar__title"></div>
        </div>
        <el-menu default-active="2" class="side-bar-menu" @open="handleOpen" @close="handleClose" theme="dark" :router="true">
            <!-- <el-submenu index="1">
                            <template slot="title">
                                <i class="el-icon-message"></i>导航一</template>
                            <el-menu-item-group>
                                <template slot="title">分组一</template>
                                <el-menu-item index="1-1">选项1</el-menu-item>
                                <el-menu-item index="1-2">选项2</el-menu-item>
                            </el-menu-item-group>
                            <el-menu-item-group title="分组2">
                                <el-menu-item index="1-3">选项3</el-menu-item>
                            </el-menu-item-group>
                            <el-submenu index="1-4">
                                <template slot="title">选项4</template>
                                <el-menu-item index="1-4-1">选项1</el-menu-item>
                            </el-submenu>
                        </el-submenu> -->
    
            <el-menu-item v-for="(o,i) in routes" :index="o.path" :key="o.name">
                <i class="el-icon-menu"></i>{{o.name}}</el-menu-item>
            </el-menu-item>
    
            <!-- <el-menu-item index="2">
                            <i class="el-icon-menu"></i>导航二</el-menu-item>
                        <el-menu-item index="3">
                            <i class="el-icon-setting"></i>导航三</el-menu-item> -->
        </el-menu>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    data() {
        return {
            r: [{ name: '1' }]
        }
    },

    computed: {
        ...mapGetters(['routes'])
    },

    methods: {
        handleOpen() {

        },

        handleClose() {

        }
    }
}
</script>

<style lang="less">
.side-bar-wrapper {
    flex: 0 0 250px;
    // height: 100vh;
    display: flex;
    flex-direction: column;
}

.side-bar-info {
    flex: 0 0 80px;
    background-color: #556e94;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 12px;
    .side-bar__title {
        text-align: center;
        padding: 20px;
        font-size: 28px;
        color: #ffffff;
    }
    .side-bar__img {
        width: 60px;
        height: 60px;
        background-color: #fefefe;
        border-radius: 36px;
        background-image: url(../../assets/logo.png);
        background-repeat: no-repeat;
        background-size: 100%;
    }
    .side-bar__user {
        display: flex;
        justify-content: center;
    }

    .side-bar__tool {
        padding: 15px 20px;
    }
}

.side-bar-menu {
    flex:1;
    border-radius: 0px;
}
</style>


