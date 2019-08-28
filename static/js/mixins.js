/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-25 20:38:24
 * @LastEditTime: 2019-08-27 15:27:03
 * @LastEditors: Please set LastEditors
 */
export default {
  data() {
    return {
      
    };
  },
  methods: {
    goPage(link){
      this.$router.push({
        path:link
      })
    }
  }
}
