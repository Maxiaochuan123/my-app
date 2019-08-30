<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-25 21:24:42
 * @LastEditTime: 2019-08-30 18:53:17
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="hello" @scroll.passive="handleScroll($event)">
    <div class="singer" id="singer">
      <div class="singer-top-tag">{{userTopTag}}</div>
      <ul class="singer-ul" ref="singerUl">

        <li v-for="(item, index) in list" :key="index" class="singer-ul-li">
          <div class="singer-tag" :id="item.tag">{{item.tag}}</div>

          <ul>
            <span v-for="(fitem, findex) in item.data" :key="findex">
              <li  v-for="(fitem2, findex2) in fitem.userList" :key="findex2">
                <img :src="`https://y.gtimg.cn/music/photo_new/T001R300x300M000${fitem2.Fsinger_mid}.jpg?max_age=2592000`" />
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
import UserList from '../../../static/json/userList'
import { mapState, mapMutations } from "vuex";
export default {
  name: "HelloWorld",
  data() {
    return {
      list: [], //  用户列表
      sortList: [], //  侧栏排序列表
      currentSort: "A", //  当前排序的标签
      userTopTag: "A", //  歌手栏头部的标签名字
    };
  },
  created() {
    this.testData();
  },
  computed:{
    ...mapState(['userList']),
  },
  methods: {
    ...mapMutations(['setUserList']),

    handleScroll(e) {
      let offsetTop = 0;
      let scrollTop = e.target.scrollTop;

      this.list.forEach((item, index) => {
        //  获取每个排序标签的位置
        offsetTop = document.querySelectorAll(".singer-ul-li")[index].offsetTop - 250;
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
      this.$store.commit('setUserList', UserList);
      let res = UserList;
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
        this.list.push({
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
.hello {
  /* position: relative; */
  background-color: #fff;
  // margin-top: 50px;
  // width: 90vw;
  height: 100%;
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
  top: 242px;
  left: 0;
  width: 100%;
  height: 30px;
  line-height: 30px;
  padding-left: 20px;
  font-size: 12px;
  color: #9F9F9F;
  background-color: #fff;
  border-bottom: 1px solid #F8F8F8;
}

.singer-tag {
  width: 100%;
  height: 30px;
  // margin-bottom: 20px;
  line-height: 30px;
  padding-left: 20px;
  font-size: 12px;
  color: #9F9F9F;
  background-color: #F8F8F8;
}

.singer-ul-li ul li {
  list-style-type: none;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #9F9F9F;
  height: 66px;
  padding: 0 14px;
}

.singer-ul-li ul li img {
  border-radius: 50%;
  width: 40px;
  height: 40px;
}

.singer-ul-li ul li div {
  width: 86%;
  margin-left: 20px;
  padding: 12px 0;
  border-bottom: 1px solid #ededed;
  position: relative;
  display: flex;
  flex-direction: column;
  
  span:first-child{
    font-size: 16px;
    font-weight: 400;
    color: rgba(0,0,0,.87);
  }
  i{
    font-size: 22px;
    color: #3F58FD;
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
  color: #9F9F9F;
}

.current {
  color: #ffcd32 !important;
}
</style>