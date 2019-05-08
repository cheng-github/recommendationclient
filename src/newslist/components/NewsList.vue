<template>
    <el-card :body-style="{ padding: '0px' }" class="box-card">
          <div slot="header" class="clearfix">
              <a :href="contentlink"  target="_blank">
               <span>{{ item.news_title }}</span>
              </a>
          </div>
          <div id="newsinfo">
            <span>{{ item.comment_num }}</span>
            <img src="../images/comment.png">
            <span>{{ item.view_count }}</span>
            <img src="../images/views.png">    
            <span style="">{{ news_time }}</span>
          </div>    
    </el-card>
</template>


<script>
// 应该在父组件里往子组件传递数据，所以这里的prop都应该定义
export default {
   props: {
      item: {
        type: Object,
        required: true
      }
    },
   computed: {
     news_time: function(){
        let datetime = new Date(this.item.publish_time);
        let year = datetime.getFullYear();
        let month = datetime.getMonth() + 1;
        let date = datetime.getDate();
        let hour = datetime.getHours();
        let min = datetime.getMinutes();
        let sec = datetime.getSeconds();
        let time =  year + '-' + month + '-' + date + ' ' + hour + ':' + min + ':' + sec;
        return time;
     },
     contentlink: function(){
       return "/news/newscontent.do?newsid=" + this.item.newsurl_id
     }
   }
}

</script>

<style>
 .box-card {
    width: 760px;
    font-size: 20px;
    margin-bottom: 20px;
    padding-bottom: 6px;
  }

  .clearfix{
      padding: 0px;  
  }

  #newsinfo *{
      float: right;
      vertical-align: middle;
      font-size: 14px;
      padding: 5px;
      margin: 0px;
  }

  #newsinfo span{
      padding-left: 0px;
      padding-right: 9px;
      margin-right: 2px;
  }

  #newsinfo span:last-child{
      float: left; 
      padding: 6px;
      margin-left: 4px;
      font-size: 14px;
      font-style:oblique;
      font-weight:lighter;
  }

  a:link {
    text-decoration: none;
    color: #000;
  }

  a:hover {
    color: rgb(63, 191, 157);
  }

   
</style>
