<template>
  <div class="toDoList">
    <AppBar :topLevelPage="true" pageTitle="待办事项"></AppBar>
    <div class="content">
      <mu-list>
        <div v-for="(item,index) in list" :key="index">
          <mu-list-item avatar button :ripple="false" @click="goPage('selectPage',{pageTitle:item.title})">
            <mu-list-item-action>
              <mu-avatar>
                <img :src="item.src">
              </mu-avatar>
            </mu-list-item-action>
            <mu-list-item-title>{{item.title}}</mu-list-item-title>
            <mu-list-item-action>
              <mu-badge :content="item.newNumber.toString()" color="primary"></mu-badge>
            </mu-list-item-action>
            
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
        src:'../../../static/images/configOrganization.png',
        title:'分配给我的线索',
        newNumber:0
      },{
        src:'../../../static/images/configCustomer.png',
        title:'分配给我的客户',
        newNumber:0
      },{
        src:'../../../static/images/implement.png',
        title:'待执行的任务',
        newNumber:0
      },{
        src:'../../../static/images/stayDaily.png',
        title:'待查看的日报',
        newNumber:0
      },{
        src:'../../../static/images/stayVisit.png',
        title:'待查看的拜访',
        newNumber:0
      }]
    }
  },
  created(){
    this.api.getToDuTotal().then(res => {
      this.list[0].newNumber = res.data.agendaLeads;
      this.list[1].newNumber = res.data.agendaCustomer;
      this.list[2].newNumber = res.data.waitExeTaskNum;
      this.list[3].newNumber = res.data.waitReadLogNum;
      this.list[4].newNumber = res.data.waitReadVisitNum;
    })
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
      .mu-list{
        list-style: none; 
      }
    }
  }
</style>