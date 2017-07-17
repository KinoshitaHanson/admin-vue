<template>
    <div class="tool-bar-wrapper">
        <div class="tool-bar__left">
            <div class="tool-bar__section msg-section">
                <el-badge is-dot class="item">
                    <el-button class="share-button" icon="share" type="primary"></el-button>
                </el-badge>
            </div>
            <div class="tool-bar__section reminder-section">
                <el-badge is-dot class="item">
                    <el-button class="share-button" icon="share" type="primary"></el-button>
                </el-badge>
            </div>
            <div class="tool-bar__section search-section">
                <el-input placeholder="搜索" icon="search" v-model="input2" :on-icon-click="handleIconClick">
                </el-input>
            </div>
        </div>
        <div class="tool-bar__right">
            <div class="user-section">
                <el-badge is-dot class="item">
                    <el-button class="share-button" icon="share" type="primary"></el-button>
                </el-badge>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            input2: ''
        }
    },

    methods: {
        handleIconClick() {

        }
    }
}
</script>

<style lang="less">
.tool-bar-wrapper {
    height: 80px;
    width: 100%;
    background-color: #f9f9f9; //#eef1f6;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.tool-bar__left {
    display: flex;
    margin-left: 48px;
}

.tool-bar__right {
    display: flex;
    margin-right: 24px;
}

.tool-bar__section {
    margin-left: 12px;
}

.msg-section {
    background-color: #fff
}

.reminder-section {}

.search-section {
    margin-left: 12px;
    input {
        border: 1px solid rgba(191, 203, 217, 0);
        background-color: #f3f3f3;
    }
}

.user-section {
    // justify-content: flex-end;
}
</style>


