<template>
    <div class="app-wrapper">
        <side-bar :class="{collapse:!sidebarStatus}"></side-bar>
        <div class="main-wrapper" :class="{collapse:!sidebarStatus}">
            <tool-bar></tool-bar>
            <nav-bar></nav-bar>
            <app-main></app-main>
        </div>
    </div>
</template>

<script>
import './layout.less';
import AppMain from './app-main';
import SideBar from './side-bar';
import NavBar from './nav-bar';
import ToolBar from './tool-bar';

export default {
    name: 'layout',
    components: {
        AppMain,
        SideBar,
        NavBar,
        ToolBar
    },

    computed:{
        sidebarStatus(){
            return this.$store.state.app.sidebarStatus;
        }
    }
}
</script>

<style lang="less">

</style>

