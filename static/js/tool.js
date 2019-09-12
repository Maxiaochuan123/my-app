/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-03 09:55:54
 * @LastEditTime: 2019-09-09 18:29:09
 * @LastEditors: Please set LastEditors
 */
// node 加密模块
var crypto = require("crypto");
export default {
  // 添加金额千分号
  formatCurrency: function(num) {
    num = num ? num : "0";
    num = num.toString().replace(/\$|\,/g, "");
    if (isNaN(num)) num = "0";
    let sign = num == (num = Math.abs(num));
    num = Math.floor(num * 100 + 0.50000000001);
    let cents = num % 100;
    num = Math.floor(num / 100).toString();
    if (cents < 10) cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
      num =
        num.substring(0, num.length - (4 * i + 3)) +
        "," +
        num.substring(num.length - (4 * i + 3));
    return "￥" + ((sign ? "" : "-") + num + "." + cents) + "(元)";
  },

  /**
   * @aes192加密模块
   * @param str string 要加密的字符串
   * @param secret string 要使用的加密密钥(要记住,不然就解不了密啦)
   * @retrun string 加密后的字符串
   * */
  encAse192: function(str, secret) {
    var cipher = crypto.createCipher("aes192", secret); //设置加密类型 和 要使用的加密密钥
    var enc = cipher.update(str, "utf8", "hex"); //编码方式从utf-8转为hex;
    enc += cipher.final("hex"); //编码方式从转为hex;
    return enc; //返回加密后的字符串
  },

  /**
   * @aes192解密模块
   * @param str string 要解密的字符串
   * @param secret string 要使用的解密密钥(要和密码的加密密钥对应,不然就解不了密啦)
   * @retrun string 解密后的字符串
   * */
  decAse192: function(str, secret) {
    var decipher = crypto.createDecipher("aes192", secret);
    var dec = decipher.update(str, "hex", "utf8"); //编码方式从hex转为utf-8;
    dec += decipher.final("utf8"); //编码方式从utf-8;
    return dec;
  },
  // 退出登录
  signOut() {
    // 清空登录
    localStorage.removeItem("login");
    const ipHost = `${window.location.protocol}//${window.location.host}`;
    window.location.href = `${ipHost}#/login`;
  },
  // 解密登录的信息并返回userInfo的对象
  decUserInfo() {
    let login = localStorage.getItem('login');
    if (typeof login === 'string' && login !== '') {
      return JSON.parse(this.decAse192(login, 'login'));
    } else {
      return {};
    }
  },
};
