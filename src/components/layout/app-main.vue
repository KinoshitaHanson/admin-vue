<template>
    <div class="app-main-wrapper">
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
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
        margin: 0 12px 12px 12px;
        background-color: #fefefe;
        padding: 12px;
        border-radius: 6px;
        width: 100%;
    }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .2s ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>

