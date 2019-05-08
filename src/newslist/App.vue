<template>
  <div id="app">
      
    <el-container>
      <el-aside width="20%"></el-aside>
      <el-aside width="60%">
        <div id="headerlogo">
         <img src="./images/newsicon.png">  
         <span style="vertical-align：middle;line-height:1.2;">XX新闻</span>
        </div>
        <el-divider></el-divider>
      </el-aside>
      <el-aside width="20%"></el-aside>
    </el-container>
      
    <el-container>
      <el-aside width="20%"></el-aside>
      <el-aside width="60%">
        <NavInfo v-on:fresh-data="navChangeLoad"></NavInfo>     
      </el-aside>
      <el-aside width="20%"></el-aside>
    </el-container>

    <el-container>
      <el-aside width="20%"></el-aside>
      <el-aside width="60%" v-loading="isLoading" element-loading-text="加载数据中..."
       element-loading-background="rgba(0, 0, 0, 0.8)">
          <template v-for="item in items">
            <NewsList :key="item.newsurl_id" :item="item"></NewsList>
          </template>
          <el-pagination
            :page-size= "15" :pager-count="pagecounter" layout="prev, pager, next"
            :total="totalNum" @current-change="handleCurrentChange" 
            :current-page.sync="currentPage" >
          </el-pagination>
      </el-aside>
      <el-aside width="20%"></el-aside>
    </el-container>

    <el-footer>
      <el-container>
        <el-aside width="20%"></el-aside>
        <el-aside width="60%">
            <div id="footer">
              <span>© 2019 Chengshiwei</span>
            </div>
        </el-aside>
        <el-aside width="20%"></el-aside>
      </el-container>
    </el-footer>
    
  </div>
</template>

<script>
import NavInfo from './components/NavInfo.vue'
import NewsList from './components/NewsList.vue'
import axios from 'axios';

export default {
    name: 'app',
    data(){
      return {
        isLoading: false,
        items: [],
        totalNum: 0,
        pagecounter: 7,
        // requestType: 'homepage',
        // requestPageNumber: 0,
        currentPage: 1
      }
    },
    created: function(){
      // 在第一次创建的时候加载首页数据
      this.loadData()
    },
    mounted(){

    },
    components: {
      NavInfo,
      NewsList
    },
    watch:{
      // 监听这个值的变化，但我们只能根据导航的变化去改变，而不可以自行改变，所以我们监听这个
      // 值的变化毫无意义
      // currentPage(newPage, oldPage){
        
      // },
      
    },
    computed:{
      requestType(){
        return this.$store.state.requestType;
      },
      category(){
        return this.$store.state.category;
      },
      requestPageNumber(){
        return this.currentPage - 1;
      }
    },
    methods: {
      loadData(){
        // 根据请求类型和页码加载数据
        this.isLoading = true;
        let requestPath = '/news/newslist.do?';
        switch(this.requestType){
          case 'homepage':
            requestPath += 'requestType=homepage&'
            requestPath += 'requestPageNumber=' + this.requestPageNumber
            break;
          case 'recommendation':
            requestPath += 'requestType=recommendation&'
            requestPath += 'requestPageNumber=' + this.requestPageNumber
            break;
          case 'category':
            requestPath += 'requestType=category&'
            requestPath += 'categoryName=' + this.category + '&'
            requestPath += 'requestPageNumber=' + this.requestPageNumber
            break;
        }
        
        axios.get(requestPath)
        .then(response => {
          return response.data;
        })
        .then(result => {
          this.items =  result.newsListData;
          this.totalNum = result.totalNum;
          this.isLoading = false;
          this.openMessage('success', "数据加载完成");
        })
        .catch(error => {
          this.isLoading = false;
          this.openMessage('error', "数据加载失败，请检查程序")
        });

      },

      // 分页变化的查询，默认从1开始,number类型
      handleCurrentChange(val){
        // this.requestPageNumber = val - 1;
        this.loadData();
      },

      navChangeLoad(){
        // 其实无论我们是否修改这个currentPage的值，都不会触发handleCurrentChange事件
        // 仅当按钮点击的时候才会触发，所以我们直接调用加载数据即可，无需关心当前页面的变化
        // 同步会触发事件加载数据
        this.currentPage = 1;
        this.loadData();
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
    .el-container:nth-child(1) .el-aside:nth-child(2) 
    {
      color: #7AC5CD;
      font-size: 32px;
      padding: 10px;
    }

    .el-container:nth-child(2) {
      margin-top: -40px;
    }


    /* 设置初始加载情况的最小宽度 */
    .el-container:nth-child(3){
      min-height: 520px;
      margin-top: 20px;
    }

    #headerlogo *{
      vertical-align: middle;
    }   
    
    /* 注意了图片和文字的对应 */
    #headerlogo span{
      margin-left: 25px;
    }

    /* 设置页脚样式 */
    #footer{
      font-size: 14px;
      text-align: center;
      margin: 25px 0px;
      padding: 10px 0px;
    }

    .el-pagination{
      text-align: center;
      margin-top: 40px;
    }



    
</style>
