/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-03 09:53:21
 * @LastEditTime: 2019-09-03 11:30:29
 * @LastEditors: Please set LastEditors
 */
import api from './api'
export default{

  // 征信 列表 (公司/详情)
  getCreditReporting(that){
    that.btnLoading = true;
    setTimeout(()=>{ that.btnLoading = false;that.dialogState = false;that.$toast.success('保存成功!');},500);
  },

  // 大数据流水
  getAccountflowList(that){
    this.public_sherchList(that, api.getAccountflowList)
  },


  // 大数据流水账单
  getAccountflowBill(that){
    this.public_sherchList(that, api.getAccountflowBill)
  },
  

  // 大数据流水(导出)
  exportExcel(that, excelName){
    this.public_exportExcel(that, excelName);
  },


  // 获取列表 公共方法
  public_getList(that, apiMethod){
    that.btnLoading = true;
    apiMethod(that.paging.req).then(res=>{
      if(res.code == '200'){
        setTimeout(()=>{ that.btnLoading = false;},500);
      }else{
        setTimeout(()=>{ that.btnLoading = false; that.$message.error('加载失败'); },500);
      }
    })
  },
}