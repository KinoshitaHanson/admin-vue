<template>
    <div class="side-bar-wrapper">
        <div class="side-bar-info">
            <div class="side-bar__img"></div>
            <div class="side-bar__title"></div>
        </div>
    
        <el-menu :default-active="$route.path" class="side-bar-menu" @open="handleOpen" @close="handleClose" theme="dark" :router="true">
            <template v-for="(o,i) in routes">
                <el-menu-item :index="o.path+(o.path=='/'?'':'/')+o.children[0].path" v-if="!o.meta.hidden&&o.meta.noDropDown" >
                    <i class="el-icon-menu"></i>{{o.meta&&o.meta.text}}</el-menu-item>
                </el-menu-item>
                <el-submenu :index="o.path" v-if="!o.meta.hidden&&!o.meta.noDropDown">
                    <template slot="title">
                        <i class="el-icon-message"></i>{{o.meta&&o.meta.text}}</template>
                    <el-menu-item-group>
                        <el-menu-item v-for="(oo,ii) in o.children" :key="oo.name" :index="oo.path">{{oo.meta&&oo.meta.text}}</el-menu-item>
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
        handleOpen(i, ip) {
            console.log(i, ip)
        },

        handleClose() {

        }
    },

    mounted() {
        console.log(this.$route);
    }
}
</script>

<style lang="less">

</style>


