<template>
    <div id="app" v-loading.fullscreen.lock="fullscreenLoading">
     <el-container>
      <el-aside width="20%"></el-aside>
      <el-aside width="60%">
        <div>
            <h1 id="title">{{ title }}</h1>
            <p v-for="(section, index) in sections" :key="index">{{ section }}</p>
        </div>
      </el-aside>
      <el-aside width="20%"></el-aside>
    </el-container>
    </div>
</template>

<script>
import axios from 'axios'
import { setTimeout } from 'timers';

export default {
    name: 'app',
    created: function(){
        this.loadNewsData();
    },
    data(){
        return {
            title: '',
            sections: [],
            fullscreenLoading: false
        }
    },
    computed:{
        // 将newscontent的内容转为有换行的东西去显示，所以这里应该改为数组比较合适
        finalContent: function(){
            return ""
        }
    },
    methods:{
        loadNewsData(){
            this.fullscreenLoading = true;
            let startIndex = window.location.href.indexOf("=");
            let newsid = window.location.href.substring(startIndex + 1)
            
            // 很奇怪，这里的延时并没有起作用，可能是因为是在dom还没被完全渲染的情况下进行的加载
            axios.get("/news/newsdataraw.do?newsid=" + newsid)
            .then(response => {
                return response.data;
            })
            .then(result => {
                return new Promise(resolve => {
                    setTimeout(() => {
                        resolve(result);
                    }, 1000);
                })
            })
            .then(result => {
                this.title = result.title;
                this.sections = result.sections;
                this.fullscreenLoading = false;
                this.openMessage('success', '新闻内容数据加载完成')
            })
            .catch(error => {
                this.fullscreenLoading = false;
                this.openMessage('error', '新闻数据加载失败，请检查程序')
            });

        },
        //   展示消息框
        openMessage(typ,msg){
            this.$message({
            showClose: true,
            message: msg,
            center: true,
            type: typ
            });
        }
    }

}
</script>

<style scoped>
    #title {
        font-size: 35px;
        font-weight: bold;
        padding: 4px;
    }    
</style>





