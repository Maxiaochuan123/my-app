<!--
 * @Description: 通用表单显示
 * fieldInfo:表示字段的属性
   => fieldId 字段id
   => formType 表单类型(如text)
   1 单行文本 text ; 
   2 多行文本 textarea; 
   3 单选 select;
   4 日期 date;
   5 数字 number;
   6 小数 floatnumber; 
   7 手机 mobile; 
   8 文件 file; 
   9 多选checkbox; 
   10 人员user; 
   11 附件 
   12 部门structure; 
   13 日期时间datetime; 
   14 邮箱email; 
   15客户customer; 
   16 商机business; 
   17 联系人contacts; 
   18 地图 map_address;
   19 产品类型category; 
   20 合同contract; 
   21 回款计划receivables_plan
* isNull 是否必填 1 是 0 否 int
* name 名称 string
* options 如果类型是选项，此处不能为空，多个选项以，隔开 string
* type 对应上面的formType中的数字
* value 值 string
* fieldType 是否是自定义字段 0. 自定义 1. 固定 int
* fieldName 字段名称 string
* setting 设置值 string
 * @Author: shenah
 -->
<template>
  <div class="general-form"></div>
</template>

<script>
export default {
  name: "generalForm",
  components: {},
  data() {
    return {};
  },
  props: {
    fieldList: {
      type: Array,
      default: () => []
    },
    fieldInfo: {
      type: Object,
      default: () => {}
    }
  },
  mounted() {},
  methods: {}
};
</script>
<style lang='less' scoped>
</style>