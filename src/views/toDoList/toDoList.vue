<template>
  <div class="toDoList">
    <AppBar pageTitle="待办事项"></AppBar>
    <div class="content">
      <mu-list>
        <div v-for="(item,index) in list" :key="index">
          <mu-list-item avatar button :ripple="false">
            <mu-list-item-action>
              <mu-avatar>
                <img :src="item.src">
              </mu-avatar>
            </mu-list-item-action>
            <mu-list-item-title>{{item.title}}</mu-list-item-title>
          </mu-list-item>
          <mu-divider shallow-inset v-show="index + 1 !== list.length"></mu-divider>
        </div>
      </mu-list>
    </div>
  </div>
</template>

<script>
import AppBar from '../../components/AppBar'
export default {
  components:{
    AppBar
  },
  data(){
    return{
      list:[{
        src:'../../../static/images/stayClue.png',
        title:'待跟进线索',
      },{
        src:'../../../static/images/configOrganization.png',
        title:'分配给我的线索'
      },{
        src:'../../../static/images/configCustomer.png',
        title:'分配给我的客户'
      },{
        src:'../../../static/images/implement.png',
        title:'待执行的任务'
      },{
        src:'../../../static/images/toExamine.png',
        title:'待审核的任务'
      },{
        src:'../../../static/images/stayDaily.png',
        title:'待批复的日报'
      },{
        src:'../../../static/images/stayVisit.png',
        title:'待批复的拜访'
      }]
    }
  },
  created(){

  },
  methods:{

  }
}
</script>

<style lang="less">
  .toDoList{
    .content{
      padding-top: 56px;
      .mu-item{
        background-color: #fff;
      }
    }
  }
</style>