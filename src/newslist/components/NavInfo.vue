<template>
    <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#ffffff"
    text-color="#000000"
    active-text-color="#20B2AA">
    <el-menu-item index="1">首页</el-menu-item>
    <el-menu-item index="2">推荐</el-menu-item>
    <el-submenu index="3">
        <template slot="title">分类</template>
        <el-menu-item index="娱乐">娱乐</el-menu-item>
        <el-menu-item index="社会">社会</el-menu-item>
        <el-menu-item index="财经">财经</el-menu-item>
        <el-menu-item index="汽车">汽车</el-menu-item>
        <el-menu-item index="体育">体育</el-menu-item>
        <el-menu-item index="房产">房产</el-menu-item>
        <el-menu-item index="美食">美食</el-menu-item>
        <el-menu-item index="健康">健康</el-menu-item>
        <el-menu-item index="科技">科技</el-menu-item>
        <el-menu-item index="军事">军事</el-menu-item>
        <el-menu-item index="数码">数码</el-menu-item>
        <el-menu-item index="育儿">育儿</el-menu-item>
        <el-menu-item index="宠物">宠物</el-menu-item>
        <el-menu-item index="情感">情感</el-menu-item>
        <el-menu-item index="女性">女性</el-menu-item>
        <el-menu-item index="游戏">游戏</el-menu-item>
        <el-menu-item index="时政">时政</el-menu-item>
        <el-menu-item index="文化">文化</el-menu-item>
        <el-menu-item index="科学">科学</el-menu-item>
        <!-- <el-submenu index="3-4">
        <template slot="title">类别4</template>
        <el-menu-item index="3-4-1">类别4-1</el-menu-item>
        <el-menu-item index="3-4-2">类别4-2</el-menu-item>
        <el-menu-item index="3-4-3">类别4-3</el-menu-item>
        </el-submenu> -->
    </el-submenu>
    </el-menu>
</template>

<script>

export default {
    data() {
      return {
        activeIndex: '1',
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        // console.log(key, keyPath);// keyPath是一个数组，分层表示
        // 这里是自组件，如果要触发数据的更新，我们可以发起一个事件，或者是使用vuex
        // 我们没有使用符号去绑定dispathch对应的action方法，但是熟练之后应该
        let obj = {}
        switch(keyPath[0]){
          case "1":
            obj.requestType = "homepage" 
            break;
          case "2":
            obj.requestType = "recommendation"
            break;
          case "3":
            obj.requestType = "category"
            obj.category = keyPath[1]
            break;
        }
        this.$store.dispatch('changeNavCondition', obj)
        // 发出请求刷新数据的事件
        this.$emit('fresh-data')
      }
    }
}

</script>


<style scoped>

</style>



