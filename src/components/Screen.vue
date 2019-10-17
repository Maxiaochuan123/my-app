<template>
 <!-- 例子: <Screen slot="drawerContent" :drawerList="drawerList" :screenApi="this.api.getClueList" @resetList="resetList"></Screen> -->

  <div class="drawerContent">
    <div class="drawerTitle">筛选</div>

      <div class="content">
        <div class="screen" v-for="(item,index) in drawerList" :key="index">
          <div class="title" v-if="!(item.mode === 'single' || item.mode === 'multiple')">{{item.fileTitle}}</div>
          <div class="screenInput" v-if="item.type === 'input'">
            <i class="iconfont icon-sousuo1"></i>
            <mu-text-field class="searchInput" v-model="item.val" :placeholder="item.placeholder"></mu-text-field>
          </div>

          <div class="screenInput" v-else-if="item.type === 'searchInput'">
            <i class="iconfont icon-sousuo1"></i>
            <mu-select full-width filterable v-model="item.val" :placeholder="item.placeholder">
              <mu-option
                v-for="(one,index) in item.searchList"
                :key="index"
                :label="one[item.labelField]"
                :value="one[item.valueField]"
              ></mu-option>
            </mu-select>
          </div>
          

          <div class="screenInput" v-else-if="item.type === 'date'">
            <span v-show="!item.val">{{item.placeholder}}</span>
            <i class="iconfont icon-rili"></i>
            <mu-date-input class="timeInput" icon="today" v-model="item.val" type="date" label-float full-width container="bottomSheet"></mu-date-input>
          </div>
           <ArrSingleOrMultiple :ref="`arrSingleOrMultiple${index}`" v-else-if="item.mode === 'single' || item.mode === 'multiple'" @arrSingleOrMultipleChange="arrSingleOrMultipleChange" :type="index" :title="item.fileTitle" :list="item.list" :mode="item.mode" :labelField="item.labelField" :valueField="item.valueField" :defaultValue="item.defaultValue"></ArrSingleOrMultiple>
        </div>
      </div>

      <div class="operation">
        <mu-button class="reset" @click="resetDrawerList">重置</mu-button>
        <mu-button color="primary" @click="drawerSubmit">确定({{number}})</mu-button>
      </div>
  </div>
</template>

<script>
import ArrSingleOrMultiple from './ArrSingleOrMultiple';
export default {
  props:{
    drawerList:{
      type: Object,
      default: () => {}
    },
    screenApi:{
      type: Function,
      default: () => {}
    }
  },
  components:{ArrSingleOrMultiple},
  data(){
    return{
      // drawerList:{
      //   value2:{
      //     fileTitle:'搜索',
      //     type:'searchInput',
      //     placeholder:'搜索线索',
      //     val:'',
      //     searchList:[{name:'张三',val:'zs'},{name:'李四',val:'ls'},{name:'王五',val:'ww'},{name:'牛牛',val:'nn'}]
      //   },
      //   value7:{
      //     fileTitle:'创建时间',
      //     type:'date',
      //     placeholder:'请选择创建时间',
      //     val:''
      //   },
      //   clueList:{
      //     fileTitle:'线索类型',
      //     type:'select',
      //     list:[{
      //       title:'买车',
      //       state:false
      //     },{
      //       title:'车贷',
      //       state:false
      //     },{
      //       title:'车险',
      //       state:false
      //     }]
      //   },
      //   clueStateList:{
      //     fileTitle:'线索状态',
      //     type:'select',
      //     valueField:'',
      //     labelField:'',
      //     list:[{
      //       title:'未跟进',
      //       state:false
      //     },{
      //       title:'已跟进',
      //       state:false
      //     },{
      //       title:'已关闭',
      //       state:false
      //     },{
      //       title:'已转换为联系人',
      //       state:false
      //     },{
      //       title:'已转换为客户',
      //       state:false
      //     },{
      //       title:'已放入公海',
      //       state:false
      //     }]
      //   }
      // },
      submitDrawerList:{},
      number:0
    }
  },
  watch:{
    'drawerList':{
      handler(newVal,oldVal){
        this.getParams();
        this.screenApi(this.submitDrawerList).then(res => {
          this.number = res.data.list.length;
        })
      },
      deep: true
    }
  },
  methods:{
    arrSingleOrMultipleChange({type,value}) {
      this.drawerList[type] = {...this.drawerList[type],val:value,};
    },
    // 筛选 - 重置
    resetDrawerList(){
      for(let item in this.drawerList){
        const onedata = this.drawerList[item];
        if(onedata.list){
          this.$refs[`arrSingleOrMultiple${item}`][0].handlerList(onedata.list);
        }else{
          onedata.val = '';
        }
      
      }
    },
    //筛选 - 确认
    drawerSubmit(){
      this.getParams();
      this.screenApi(this.submitDrawerList).then(res => {
        this.$emit('resetList', res.data)
      })
    },
    getParams(){
      for(let item in this.drawerList){
        this.submitDrawerList[item] = this.drawerList[item].val
      }
    }
  }
}
</script>

<style lang='less' scoped>
  .drawerContent{
    height: 100%;
    .drawerTitle{
      font-size: 20px;
      font-weight: @primary-weight;
      color: @primary-text;
      // background-color: aquamarine;
      // height: 20%;
    }
    .content{
      height: 200px;
      margin-top: 20px;
      background-color: #fff;
      overflow-y: scroll;
      height: 86%;
    }
    .screen{
      &:not(:first-child){
        margin-top: 20px;
      }
      .title{
        font-size: @primary-size;
        color: @primary-text;
        margin-bottom: 10px;
      }
      .screenInput{
        height: 36px;
        border-radius:6px;
        border:1px solid #9f9f9f;
        position: relative;
        >span{
          position: absolute;
          left: 10px;
          height: 36px;
          line-height: 36px;
          font-size: @regular-size;
          color: @regular-text;
        }
        >i{
          position: absolute;
          right: 10px;
          font-size: 24px;
          color: @regular-text;
        }
        .icon-sousuo1{
          font-size: 18px;
          top: 2px;
        }
        .timeInput{
          margin: 0;
          padding: 0;
          min-height: 0;
          /deep/ .mu-input-icon{
            display: none;
          }
          /deep/ .mu-text-field-input{
            padding-left: 10px;
          }
          /deep/ .mu-text-field{
            width: 96%;
            margin: 2px 0 0 4px;
          }
        }
        .searchInput{
          margin: 0;
          padding: 0;
          min-height: 0;
          /deep/ .mu-text-field-input{
            padding-left: 10px;
          }
          /deep/ .mu-text-field{
            width: 76%;
            margin: 2px 0 0 4px;
          }
        }
        .mu-select-input{
          font-size: @regular-size;
          color: @primary-text;
        }
        /deep/ .mu-select-action,
        /deep/ .mu-input-line,
        /deep/ .mu-input-focus-line {
          display: none;
        }
        /deep/ .mu-select-input.is-enable {
          padding-left: 12px;
        }
        /deep/ .mu-select-content input {
          position: absolute;
          top: -2px;
        }
      }
      
    }
    .operation{
      // height: 20%;
      // background-color: cornflowerblue;
      // position: absolute;
      // bottom: 46px;
      // width: 84%;
      display: flex;
      justify-content: space-between;
      .reset{
        color: @primary-text;
        background-color: #EDEDED;
      }
    }
  }
</style>