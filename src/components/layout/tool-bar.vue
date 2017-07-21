<template>
    <div class="tool-bar-wrapper">
        <div class="tool-bar__left">
            <div class="tool-bar__section msg-section" style="display:none">
                <el-badge is-dot class="item">
                    <el-button class="share-button" icon="share" type="primary"></el-button>
                </el-badge>
            </div>
            <div class="tool-bar__section reminder-section" style="display:none">
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
                <el-dropdown trigger="click" class="user__info"  @command="handleMoreClick">
                    <div class="avatar-wrapper">
                        <div class="user__avatar"></div>
                        <div class="user__hello">Hi,Makiyo！</div>
                        <i class="el-icon-caret-bottom"></i>
                    </div>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>帮助</el-dropdown-item>
                        <el-dropdown-item>设置</el-dropdown-item>
                        <el-dropdown-item divided command="logout">登出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <!-- <div class="user__avatar"></div>
                                        <div class="user__hello">Hi,Makiyo！</div> -->
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

        },

        handleMoreClick(command) {
            console.log('command')
            if (command == 'logout') {
                this.$router.push({ path: '/Login' })
            }
        }
    }
}
</script>

<style lang="less">

</style>


