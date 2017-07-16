<template>
    <div class="app-wrapper">
        <side-bar></side-bar>
        <div class="main-wrapper">
            <nav-bar></nav-bar>
            <app-main></app-main>
        </div>
    </div>
</template>

<script>
import AppMain from './app-main';
import SideBar from './side-bar';
import NavBar from './nav-bar';

export default {
    name: 'layout',
    components: {
        AppMain,
        SideBar,
        NavBar
    }
}
</script>

<style lang="less">
.app-wrapper {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
}

.main-wrapper {
    display: flex;
    flex-direction: column;
    width:100%;
}



</style>

