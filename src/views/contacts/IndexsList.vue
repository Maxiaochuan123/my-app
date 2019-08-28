<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-25 21:24:42
 * @LastEditTime: 2019-08-28 17:25:45
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
                <div>{{fitem2.Fsinger_name}}</div>
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
  name: "HelloWorld",
  data() {
    return {
      list: [], //  用户列表
      sortList: [], //  侧栏排序列表
      currentSort: "A", //  当前排序的标签
      userTopTag: "A", //  歌手栏头部的标签名字
      mylist:[
        {
          Findex: "A",
          userList: [
            {
              Fsinger_mid: "002J4UUk29y8BY",
              Fsinger_name: "薛之谦"
            },
            {
              Fsinger_mid: "002J4UUk29y8BY",
              Fsinger_name: "薛之谦"
            },
            {
              Fsinger_mid: "002J4UUk29y8BY",
              Fsinger_name: "薛之谦"
            }
          ]
        },
        {
          Findex: "A",
          userList: [
            {
              Fsinger_mid: "0025NhlN2yWrP4",
              Fsinger_name: "周杰伦"
            },
            {
              Fsinger_mid: "0025NhlN2yWrP4",
              Fsinger_name: "周杰伦"
            },
            {
              Fsinger_mid: "0025NhlN2yWrP4",
              Fsinger_name: "周杰伦"
            }
          ]
        },
        {
          Findex: "B",
          userList: [
            {
              Fsinger_mid: "003Nz2So3XXYek",
              Fsinger_name: "陈奕迅"
            },
            {
              Fsinger_mid: "003Nz2So3XXYek",
              Fsinger_name: "陈奕迅"
            },
            {
              Fsinger_mid: "003Nz2So3XXYek",
              Fsinger_name: "陈奕迅"
            }
          ]
        },
        {
          Findex: "C",
          userList: [
            {
              Fsinger_mid: "001BLpXF2DyJe2",
              Fsinger_name: "林俊杰"
            },
            {
              Fsinger_mid: "001BLpXF2DyJe2",
              Fsinger_name: "林俊杰"
            },
            {
              Fsinger_mid: "001BLpXF2DyJe2",
              Fsinger_name: "林俊杰"
            }
          ]
        },
        {
          Findex: "D",
          userList: [
            {
              Fsinger_mid: "000aHmbL2aPXWH",
              Fsinger_name: "李荣浩"
            },
            {
              Fsinger_mid: "000aHmbL2aPXWH",
              Fsinger_name: "李荣浩"
            },
            {
              Fsinger_mid: "000aHmbL2aPXWH",
              Fsinger_name: "李荣浩"
            }
          ]
        },
        {
          Findex: "E",
          userList: [
            {
              Fsinger_mid: "000aHmbL2aPXWH",
              Fsinger_name: "李荣浩"
            },
            {
              Fsinger_mid: "000aHmbL2aPXWH",
              Fsinger_name: "李荣浩"
            },
            {
              Fsinger_mid: "000aHmbL2aPXWH",
              Fsinger_name: "李荣浩"
            }
          ]
        },
        {
          Findex: "F",
          userList: [
            {
              Fsinger_mid: "000aHmbL2aPXWH",
              Fsinger_name: "李荣浩"
            },
            {
              Fsinger_mid: "000aHmbL2aPXWH",
              Fsinger_name: "李荣浩"
            },
            {
              Fsinger_mid: "000aHmbL2aPXWH",
              Fsinger_name: "李荣浩"
            }
          ]
        },
        {
          Findex: "G",
          userList: [
            {
              Fsinger_mid: "000aHmbL2aPXWH",
              Fsinger_name: "李荣浩"
            },
            {
              Fsinger_mid: "000aHmbL2aPXWH",
              Fsinger_name: "李荣浩"
            },
            {
              Fsinger_mid: "000aHmbL2aPXWH",
              Fsinger_name: "李荣浩"
            }
          ]
        }
      ]
    };
  },
  created() {
    this.testData();
  },
  methods: {
    handleScroll(e) {
      let offsetTop = 0;
      let scrollTop = e.target.scrollTop;

      this.list.forEach((item, index) => {
        //  获取每个排序标签的位置
        offsetTop = document.querySelectorAll(".singer-ul-li")[index].offsetTop - 70;
        //  当前滚动条的位置 和 当前的标签偏移顶部的距离进行对比
        //  每一个歌手的li标签的高度必须要保持一致，我这里的高度是70，可以计算自己项目的内容的具体高度进行修改
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
      let res = this.mylist;
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
  background-color: #222;
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
  background: #222;
}

.singer-top-tag {
  position: fixed;
  top: 100px;
  left: 0;
  width: 100%;
  height: 30px;
  line-height: 30px;
  padding-left: 20px;
  font-size: 12px;
  color: hsla(0, 0%, 100%, 0.5);
  background: #333;
}

.singer-tag {
  width: 100%;
  height: 30px;
  margin-bottom: 20px;
  line-height: 30px;
  padding-left: 20px;
  font-size: 12px;
  color: hsla(0, 0%, 100%, 0.5);
  background: #333;
}

.singer-ul-li ul li {
  list-style-type: none;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 0 20px 20px;
  color: rgba(255, 255, 255, 0.5);
}

.singer-ul-li ul li img {
  border-radius: 50%;
  widows: 50px;
  height: 50px;
}

.singer-ul-li ul li div {
  padding-left: 20px;
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
  background: rgba(0, 0, 0, 0.3);
  font-family: Helvetica;
}

ul {
  margin: 0;
  padding: 0;
}

.sort ul {
  color: rgba(255, 255, 255, 0.6);
}

.sort ul li {
  list-style-type: none;
  padding: 3px;
  line-height: 1;
  font-size: 12px;
}

.current {
  color: #ffcd32;
}
</style>