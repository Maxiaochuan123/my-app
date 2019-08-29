<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-25 11:48:12
 * @LastEditTime: 2019-08-29 15:48:55
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="bottom-nav">
    <mu-bottom-nav :value.sync="shift" color="primary">
      <mu-bottom-nav-item value="movies" title="Home" icon="ondemand_video" to="/home"></mu-bottom-nav-item>
      <mu-bottom-nav-item value="music" title="MyInfo" icon="music_note" to="/myInfo"></mu-bottom-nav-item>
    </mu-bottom-nav>
  </div>
</template>

<script>
export default {
  name: "bottom-nav",
  data() {
    return {
      shift: 'movies'
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .bottom-nav{
    width: 100vw;
    height: 50px;
    position: fixed;
    bottom: 0;
  }
</style>
