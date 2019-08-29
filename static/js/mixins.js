/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-25 20:38:24
 * @LastEditTime: 2019-08-29 17:33:08
 * @LastEditors: Please set LastEditors
 */
// 点击波纹组件
import waves from '../waves'
export default {
  directives: {
    waves
  },
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
