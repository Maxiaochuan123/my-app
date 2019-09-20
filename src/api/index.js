import customer from "./service/customer";
import common from "./service/common";
import contacts from "./service/contacts";

export default {
  ...common,
  ...customer,
  ...contacts
};
