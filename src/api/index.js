/*
 * @Description: api模块合起来
 * @Author: shenah
 * @Date: 2019-09-25 15:57:26
 * @LastEditors: shenah
 * @LastEditTime: 2019-10-12 10:23:35
 */
import customer from "./service/customer";
import common from "./service/common";
import contacts from "./service/contacts";
import sysUser from "./service/sysUser";
import clue from "./service/clue";
import task from "./service/task";

export default {
  ...common,
  ...customer,
  ...contacts,
  ...sysUser,
  ...clue,
  ...task
};
