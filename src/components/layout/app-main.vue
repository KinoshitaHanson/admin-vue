<template>
    <div class="app-main-wrapper">
        <!-- <transition> -->
        <router-view></router-view>
        <!-- </transition> -->
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
.app-main-wrapper {
    flex: 1;
    width: 100%;
    display: flex;
    >div {
        margin: 12px;
        background-color: #fefefe;
        padding: 12px;
        border-radius: 6px;
        width: 100%;
    }
}
</style>

