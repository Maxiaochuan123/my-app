/*
 * @Description: 坐标系的转化
 * @Author: shenah
 * @Date: 2020-01-02 09:36:57
 * @LastEditors  : shenah
 * @LastEditTime : 2020-01-02 09:40:16
 */

/**
 * @description: 将腾讯或者高德转化为百度地图经纬度
 * @param {type} 参数名 参数说明
 * @return:
 */
export function qqMapTransBMap(lng, lat) {
    let x_pi = (3.14159265358979324 * 3000.0) / 180.0;
    let x = lng;
    let y = lat;
    let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
    let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
    let lngs = z * Math.cos(theta) + 0.0065;
    let lats = z * Math.sin(theta) + 0.006;
    return {
      lng: lngs,
      lat: lats
    };
  }
  