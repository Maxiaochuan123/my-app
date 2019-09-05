<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-25 21:24:42
 * @LastEditTime: 2019-09-04 11:13:57
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="indexs-list" :style="`margin-top:${listSpacing}px;`" @scroll.passive="handleScroll($event)">
    <div class="singer" id="singer">
      <div class="singer-top-tag" :style="`top:${tagTop}`">{{userTopTag}}</div>
      <ul class="singer-ul" :style="`padding-bottom:${listSpacing}px;`" ref="singerUl">

        <li v-for="(item, index) in listTemp" :key="index" class="singer-ul-li">
          <div class="singer-tag" :id="item.tag">{{item.tag}}</div>

          <ul>
            <span v-for="(fitem, findex) in item.data" :key="findex">
              <li  v-for="(fitem2, findex2) in fitem.userList" :key="findex2">
                <img src="../../static/images/默认头像.png" />
                <div>
                  <span>{{fitem2.Fsinger_name}}</span>
                  <span>{{fitem2.describe}}</span>
                  <i class="iconfont icon-dianhua"></i>
                </div>
              </li>
            </span>
          </ul>
          
        </li>

      </ul>
    </div>
    <div class="sort">
      <ul>
        <li v-for="(item, index) in sortList" :key="index" @click="jumpTag(item)" :class="{current:currentSort == item ? true : false}" >
          {{item}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "indexs-listWorld",
  props:{
    tagTop:{
      type:Number,
      default:60
    },
    listSpacing:{
      type:Number,
      default:60
    },
    tagTopoffsetTop:{
      type:Number,
      default:120
    },
    list:{
      type:Array,
      default: ()=>[]
    }
  },
  data() {
    return {
      listTemp: [], //  用户列表
      sortList: [], //  侧栏排序列表
      currentSort: "A", //  当前排序的标签
      userTopTag: "A", //  联系人栏头部的标签名字
    };
  },
  created() {
    this.testData();
  },
  methods: {
    handleScroll(e) {
      let offsetTop = 0;
      let scrollTop = e.target.scrollTop;

      this.listTemp.forEach((item, index) => {
        //  获取每个排序标签的位置
        offsetTop = document.querySelectorAll(".singer-ul-li")[index].offsetTop - this.tagTopoffsetTop;
        //  当前滚动条的位置 和 当前的标签偏移顶部的距离进行对比
        //  每一个联系人的li标签的高度必须要保持一致，我这里的高度是70，可以计算自己项目的内容的具体高度进行修改
        if (
          scrollTop > offsetTop &&
          scrollTop < offsetTop + 70 * item.data.length
        ) {
          this.userTopTag = item.tag;
          this.currentSort = item.tag;
        }
      });
    },

    //  请求数据
    testData() {
      let res = this.list;
      res = res.sort((a, b) => a.Findex.localeCompare(b.Findex));
      res.forEach((item, index) => {
        //　添加侧栏排序
        item.Findex = item.Findex;
        this.sortList.push(item.Findex);
      });
      //  去除重复
      this.sortList = [...new Set(this.sortList)];
      this.sortList = [...this.sortList];
      //  添加排序标签和联系人列表
      this.sortList.forEach(e => {
        this.listTemp.push({
          tag: e,
          data: res.filter(i => i.Findex == e)
        });
      });
    },
    //  跳转标签
    jumpTag(i) {
      this.userTopTag = i;
      this.currentSort = i;
      document.querySelector(`#${i}`).scrollIntoView(true);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.indexs-list {
  /* position: relative; */
  background-color: #fff;
  // margin-top: 50px;
  // width: 90vw;
  height: 100%;
  //     margin-top: 60px;
  //     padding-bottom: 60px;
  // padding-top: 50px;
  overflow-y: scroll;
}

.singer {
  // position: relative;
  width: 100%;
  height: 100%;
  // overflow: hidden;
  background-color: #fff;
}

.singer-top-tag {
  position: fixed;
  z-index: 99;
  // top: 242px;
  left: 0;
  width: 100%;
  height: 30px;
  line-height: 30px;
  padding-left: 20px;
  font-size: 12px;
  color: @regular-text;
  background-color: #fff;
  border-bottom: 1px solid @auxiliary;
}

.singer-tag {
  width: 100%;
  height: 30px;
  // margin-bottom: 20px;
  line-height: 30px;
  padding-left: 20px;
  font-size: 12px;
  color: @regular-text;
  background-color: @auxiliary;
}

.singer-ul-li ul li {
  list-style-type: none;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: @regular-text;
  height: 66px;
  padding: 0 14px;
}

.singer-ul-li ul li img {
  border-radius: 50%;
  width: 40px;
  height: 40px;
}
.singer-ul-li ul li:not(:last-child) div{
  border-bottom: 1px solid @primary-border;
}
.singer-ul-li ul li div {
  width: 86%;
  margin-left: 20px;
  padding: 12px 0;
  position: relative;
  display: flex;
  flex-direction: column;
  
  span:nth-child(1){
    font-size: @primary-size;
    font-weight: 400;
    color: @primary-text;
  }
  span:nth-child(2){
    width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  i{
    font-size: 22px;
    color: @primary;
    position: absolute;
    top: 24px;
    right: 20px;
  }
  
}

.sort {
  position: fixed;
  z-index: 30;
  right: 6px;
  top: 50%;
  z-index: 100;
  transform: translateY(-50%);
  width: 20px;
  padding: 20px 0;
  border-radius: 10px;
  text-align: center;
  background-color: #fff;
  font-family: Helvetica;
}

ul {
  margin: 0;
  padding: 0;
}

.sort ul {
  background-color: #fff;
}

.sort ul li {
  list-style-type: none;
  padding: 3px;
  line-height: 1;
  font-size: 14px;
  font-weight:600;
  color: @regular-text;
}

.current {
  color: #ffcd32 !important;
}
</style>