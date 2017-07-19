<template>
    <div class="side-bar-wrapper">
        <div class="side-bar-info">
            <div class="side-bar__img"></div>
            <div class="side-bar__title"></div>
        </div>
    
        <el-menu default-active="2" class="side-bar-menu" @open="handleOpen" @close="handleClose" theme="dark" :router="true">
            <template v-for="(o,i) in routes">
                <el-menu-item v-if="!o.hidden&&o.noDropDown" :index="o.path">
                    <i class="el-icon-menu"></i>{{o.name}}</el-menu-item>
                </el-menu-item>
                <el-submenu :index="o.path" v-if="!o.hidden&&!o.noDropDown">
                    <template slot="title">
                        <i class="el-icon-message"></i>{{o.name}}</template>
                    <el-menu-item-group>
                        <el-menu-item v-for="(oo,ii) in o.children" :key="oo.name" :index="oo.path">{{oo.name}}</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </template>
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
    // flex: 0 0 250px; // height: 100vh;
    // display: flex;
    // flex-direction: column;
    position: fixed;
    width: 250px;
    height: 100vh;
    overflow: hidden;
}

.side-bar-info {
    display: flex;
    justify-content: flex-start;
    align-items: center; // flex: 0 0 80px;
    background-color: #556e94;
    padding-left: 12px;
    height: 80px;
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
    flex: 1;
    border-radius: 0px;
    height: calc(~"100% - 30px");
    width:256px;
    overflow-y: scroll;
}
</style>


