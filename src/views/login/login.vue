<template>
    <div class="login-section">
        <div class="section__logo"></div>
        <div class="section__text">
            <h1>New</h1>
        </div>
        <div class="section__form">
            <el-form label-position="left" :model="form" style="width:300px;">
                <el-form-item prop="account">
                    <el-input type="text" v-model="form.account" auto-complete="on" placeholder="用户名" style="width:100%"></el-input>
                </el-form-item>
                <el-form-item prop="pwd">
                    <el-input type="password" v-model="form.pwd" auto-complete="off" placeholder="密码" style="width:100%"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button :loading="loading" type="primary" @click="submitForm('ruleForm2')" style="width:100%">提交</el-button>
                    <!-- <el-button @click="resetForm('ruleForm2')">重置</el-button> -->
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                account: '',
                pwd: ''
            },
            loading: false

        }
    },

    methods: {
        submitForm() {
            this.loading = true;
            setTimeout(() => {
                this.$router.push({ path: '/' });
                this.loading = false;
            }, 5000);
        }
    }
}
</script>

<style lang="less" scoped>
.login-section {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center; // margin-top: 120px;
    height: 100vh;
    background-color: #f7f7f7;
    .section__logo {
        margin-top: 120px;
    }
    .section__text {
        h1 {
            font-size: 120px;
            margin-top: 0;
            color: #b5b5b5;
        }
    }
    .section__form {
        // margin-top: 36px;
    }
}
</style>


