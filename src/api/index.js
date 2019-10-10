import customer from "./service/customer";
import common from "./service/common";
import contacts from "./service/contacts";
import sysUser from "./service/sysUser";
import clue from "./service/clue";

export default {
  ...common,
  ...customer,
  ...contacts,
  ...sysUser,
  ...clue
};
