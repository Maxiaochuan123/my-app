<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-25 11:48:12
 * @LastEditTime: 2019-09-04 14:23:48
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="search-bar">
    <div class="serchInput">
      <mu-icon size="16" value=":iconfont icon-sousuo"></mu-icon>
      <mu-select filterable full-width v-model="search.value" :placeholder="placeholderText">
        <mu-option
          v-for="(item,index) in searchList"
          :key="index"
          :label="item.userName"
          :value="item.userName"
          @click.native="isGoPage ? goPage(pageLink) : goTag(item.tag)"
        ></mu-option>
      </mu-select>
    </div>
  </div>
</template>

<script>
export default {
  name: "search-bar",
  props: {
    list: {
      type: Array,
      default: () => []
    },
    isGoPage: {
      type: Boolean,
      default: false
    },
    pageLink: {
      type: String,
      default: ""
    },
    placeholderText: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      searchList: [],
      search: {
        value: ""
      }
    };
  },
  mounted() {
    this.list.forEach( item => {
      item.userList.forEach( itemUser => {
        this.searchList.push({userName:itemUser.Fsinger_name,tag:item.Findex})
      })
    })
  },
  methods: {
    goTag(tag) {
      document.querySelector(`#${tag}`).scrollIntoView(true);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.search-bar {
  position: fixed;
  top: 44px;
  z-index: 99;
  width: 100%;
  height: 60px;
  padding: 12px 15px;
  background-color: #fff;

  .serchInput {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    padding: 7px 10px;
    display: flex;
    color: @regular-text;
    background-color: @primary-border;

    /deep/ .mu-input {
      min-height: 32px;
      margin-bottom: 0;
      padding-bottom: 0;
      padding-top: 0;

      /deep/ .mu-select-action,
      .mu-input-line,
      .mu-input-focus-line {
        display: none;
      }
      .mu-select-input.is-enable {
        padding-left: 12px;
      }
      .mu-select-content input {
        position: absolute;
        top: -5px;
      }
    }
  }
}
</style>
