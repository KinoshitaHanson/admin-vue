<template>
    <div class="nav-bar-wrapper">
        <el-breadcrumb class="nav-bar__bread" separator="/">
            <el-breadcrumb-item v-for="(o,i) in breadcrumbList" :key="o.path" :to="o.path">{{o.text}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>

<script>
export default {

    mounted() {
        console.log()
    },

    computed: {
        breadcrumbList() {
            let matched = this.$route.matched.filter(m => m.meta && m.meta.text);
            let first = matched[0];
            if (first && first.meta.text != '首页') {
                matched = [{ text: '首页', path: '/' }].concat(matched.map((n => { return { text: n.meta.text, path: n.path } })));
            } else {
                matched = [{ text: '首页', path: '/' }];
            }
            return matched;
        }
    },

    methods: {
        initBreadcrumb() {
        }
    }
}
</script>

<style lang="less">

</style>


