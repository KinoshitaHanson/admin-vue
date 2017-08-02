<template>
    <div class="tag-select__wrapper">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="ABC" name="ABC"></el-tab-pane>
            <el-tab-pane label="DEF" name="DEF"></el-tab-pane>
            <el-tab-pane label="GHI" name="GHI"></el-tab-pane>
            <el-tab-pane label="JKL" name="JKL"></el-tab-pane>
            <el-tab-pane label="MNO" name="MNO"></el-tab-pane>
            <el-tab-pane label="PQR" name="PQR"></el-tab-pane>
            <el-tab-pane label="STU" name="STU"></el-tab-pane>
            <el-tab-pane label="VWX" name="VWX"></el-tab-pane>
            <el-tab-pane label="YZ" name="YZ"></el-tab-pane>
            <el-tab-pane label="$" name="$"></el-tab-pane>
        </el-tabs>
        <ul class="tag-select__content">
            <li v-for="(o,i) in sourceData" :key="i">
                <span class="tag-select__title">{{o.letter}}</span>
                <div class="tag-select__list">
                    <div class="tag-select__item" v-for="(oo,ii) in o.labelList" :key="ii" @click="tagClickHandle(oo)">
                        <el-tag type="gray" color="#fff">{{oo.tagName}}</el-tag>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { GetTagClassification } from 'api';

export default {

    data() {
        return {
            activeName: 'ABC',
            lastActiveName: 'ABC',
            sourceData: [],
        }
    },

    props:{
        tagList:Array
    },

    computed: {

    },

    methods: {
        handleClick() {
            if (this.lastActiveName == this.activeName) return;
            this.getData();
        },

        tagClickHandle(tag) {
            if(this.tagList.find(m=>m.id==tag.id))return;
            this.tagList.push(tag);
        },

        async getData() {
            let loading = this.$loading({
                target: '.tag-select__wrapper',
                body: true
            })

            let params = {
                str: this.activeName
            }

            try {
                let res = await GetTagClassification(params);
                if (res.code == 0) {
                    this.sourceData = res.result.entity;

                } else {
                    this.sourceData = [];
                    console.log(res.des)
                }

            } catch (error) {
                console.log(error)
            }
            this.lastActiveName = this.activeName;
            loading.close();
        },

        onSubmit() {

        },

        onCancel() {

        }
    },

    mounted() {
        this.getData();
    }

}
</script>

<style lang="less" scoped>

.el-tag {
    margin: 0 4px 0 0;    
    cursor: pointer;
}

.tag-select__wrapper {
    user-select: none;
}

.tag-select__content {
    padding-left: 12px;
    margin-top: 0;
    li {
        list-style-type: none;
        display: flex;
        // flex-wrap: wrap;
        align-items: center;
        padding-left: 12px;
        min-height: 48px;
        color: #ff740d
    }
}

.tag-select__title {
    display: block;
    margin-right: 24px;
}

.tag-select__list {
    display: flex;
    flex-wrap: wrap;
    .tag-select__item {
        // margin: 6px;
        cursor: pointer;
    }
}

// .tag-select__footer {
//     display: flex;
//     justify-content: flex-end;
// }
</style>


