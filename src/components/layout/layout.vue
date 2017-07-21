<template>
    <div class="app-wrapper">
        <side-bar></side-bar>
        <div class="main-wrapper">
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
    }
}
</script>

<style lang="less">

</style>

