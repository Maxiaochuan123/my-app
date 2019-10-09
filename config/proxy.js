/*
 * @Description: 分离出来反向代理
 * @Author: shenah
 * @Date: 2019-10-09
 * @LastEditors: shenah
 * @LastEditTime: 2019-10-09
 */
module.exports = {
  "/api": {
    target: "http://192.168.0.92:6080",
    changeOrigin: true,
    pathRewrite: {
      "^/api": ""
    }
  },
  "/mock/*": {
    target: "http://127.0.0.1:9000",
    secure: false,
    pathRewrite: {
      "^/mock": ""
    }
  }
};
