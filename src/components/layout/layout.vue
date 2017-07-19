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
.app-wrapper {
    // height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: row;
    background-color: #f3f3f3;
    min-height: 100vh;
}

.main-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow-x: hidden;
    margin-left: 250px;
}


</style>

