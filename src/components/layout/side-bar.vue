<template>
    <div class="side-bar-wrapper">
        <div class="side-bar-info">
            <div class="side-bar__title"></div>
            <div class="side-bar__img"></div>
        </div>
        <!-- <div @click="isCollapse=true">true</div>
            <div @click="isCollapse=false">false</div> -->
        <el-menu :default-active="$route.path" class="side-bar-menu" mode="vertical" @open="handleOpen" @close="handleClose" theme="dark" :router="true">
            <template v-for="(o,i) in routes">
                <el-menu-item :index="o.path+(o.path=='/'?'':'/')+(o.children?o.children[0].path:'')" v-if="!o.meta.hidden&&o.meta.noDropDown">
                    <i class="el-icon-menu"></i>
                    <span slot="title">{{o.meta&&o.meta.text}}</span>
                </el-menu-item>
                </el-menu-item>
                <el-submenu :index="o.path" v-if="!o.meta.hidden&&!o.meta.noDropDown">
                    <template slot="title">
                        <i class="el-icon-message"></i>
                        <span slot="title">{{o.meta&&o.meta.text}}</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item v-for="(oo,ii) in o.children" v-if="oo.meta&&!oo.meta.hidden" :key="oo.name" :index="oo.path+(oo.path=='/'?'':'/')+(oo.children?oo.children[0].path:'')">
                            <span slot="title">{{oo.meta&&oo.meta.text}}</span>
                        </el-menu-item>
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
            r: [{ name: '1' }],
            isCollapse: true
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

<style lang="less" scoped>

</style>


