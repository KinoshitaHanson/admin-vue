<template>
    <div class="tool-bar-wrapper">
        <div class="tool-bar__left">
            <div class="tool-bar__collapse" @click="toggleSidebar">
                <svg data-v-5b0a45a4="" t="1492500959545" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1691" xmlns:xlink="http://www.w3.org/1999/xlink" width="64" height="64" class="wscn-icon hamburger is-active">
                    <path data-v-5b0a45a4="" d="M966.8023 568.849776 57.196677 568.849776c-31.397081 0-56.850799-25.452695-56.850799-56.850799l0 0c0-31.397081 25.452695-56.849776 56.850799-56.849776l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.849776l0 0C1023.653099 543.397081 998.200404 568.849776 966.8023 568.849776z" p-id="1692"></path>
                    <path data-v-5b0a45a4="" d="M966.8023 881.527125 57.196677 881.527125c-31.397081 0-56.850799-25.452695-56.850799-56.849776l0 0c0-31.397081 25.452695-56.849776 56.850799-56.849776l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.849776l0 0C1023.653099 856.07443 998.200404 881.527125 966.8023 881.527125z" p-id="1693"></path>
                    <path data-v-5b0a45a4="" d="M966.8023 256.17345 57.196677 256.17345c-31.397081 0-56.850799-25.452695-56.850799-56.849776l0 0c0-31.397081 25.452695-56.850799 56.850799-56.850799l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.850799l0 0C1023.653099 230.720755 998.200404 256.17345 966.8023 256.17345z" p-id="1694"></path>
                </svg>
            </div>
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
                <el-dropdown trigger="click" class="user__info" @command="handleMoreClick">
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
                this.$store.commit('CLEAR_USER_INFO');
                this.$router.push({ path: '/Login' })
            }
        },

        toggleSidebar() {
            // console.log(this.$store.state.app.sidebar.opened)
            this.$store.commit('TOGGLE_SIDEBAR');
            console.log(this.$store.state.app.sidebarStatus)
        }
    }
}
</script>

<style lang="less">
.hamburger {
    display: inline-block;
    cursor: pointer;
    width: 20px;
    height: 20px;
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
    transition: .38s;
    -webkit-transform-origin: 50% 50%;
    transform-origin: 50% 50%;
}

.tool-bar__collapse {
    line-height: 40px;
    height: 36px;
    margin-right: 36px;
    transition: 0.5s all;
    margin-left:12px;
}

.tool-bar__collapse.collapse {}
</style>


