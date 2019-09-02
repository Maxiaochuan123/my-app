/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-29 15:04:00
 * @LastEditTime: 2019-08-29 15:04:48
 * @LastEditors: Please set LastEditors
 */
import waves from './waves'

const install = function(Vue) {
  Vue.directive('waves', waves)
}

if (window.Vue) {
  window.waves = waves
  Vue.use(install); // eslint-disable-line
}

waves.install = install
export default waves

