<template>
  <div class="upLoad">
    <div class="enclosure">
      <div class="title">附件</div>
      <div class="content">
        <UpLoadImages ref="imageRef" @parentImgLoad="parentImgLoad" @getImgSuccessList="getImgSuccessList"></UpLoadImages>
        <UpLoadEnclosure ref="enclosureRef" @parentEnclosureLoad="parentEnclosureLoad"></UpLoadEnclosure>
      </div>
    </div>

    <PreviewImage :previewView="previewView" :imagesList="imgPreviewList" :previewSrc="previewSrc" :previewIndex="previewIndex" @closePreview="closePreview"></PreviewImage>
    <div class="preview">
      <div class="imgPreview">
        <div class="imgList" :class="[isAlimatin?'animation-in':'']" v-for="(item,index) in imgPreviewList" :key="index">
          <img class="imgItem" :src="item.src" @click="openPreview(item, index)">
          <img class="delete" :src="loadingImg('delete.png')"  v-show="item.progress.progressState == 1" @click="deleteImageItem(item)">
          <div class="reUpload" v-show="item.progress.progressState == 2">
            <i class="iconfont icon-shangchuan" @click="$refs.imageRef.oneUpLoad(item)"></i>
          </div>
          <div class="loading" v-show="item.progress.isProgress">
            <span>{{item.progress.progressNum}}%</span>
          </div>
        </div>
      </div>

      <mu-divider v-show="imgPreviewList.length > 0 && enclosureList.length > 0"></mu-divider>

      <div class="enclosurePreview">
        <div class="enclosureList" :class="[isAlimatin?'animation-in':'']" v-for="(listItem ,index) in enclosureList" :key="index">
          <img src="../../../static/images/附件.png">
          <div class="reUpload" v-show="listItem.progress.progressState == 2">
            <i class="iconfont icon-shangchuan" @click="$refs.imageRef.oneUpLoad(listItem)"></i>
          </div>
          <div class="loading" v-show="listItem.progress.isProgress">
            <span>{{listItem.progress.progressNum}}%</span>
          </div>
          <div class="describe">
            <div class="title">{{listItem.file.name}}</div>
            <div class="size">{{listItem.size}}</div>
          </div>
          <mu-menu placement="left-start" :open.sync="listItem.openMenu">
            <i class="iconfont icon-gengduovertical"></i>
            <mu-list slot="content">
              <mu-list-item button v-show="/^image/.test(listItem.file.type)" @click="operation(listItem, '查看')">
                <mu-list-item-title>查看</mu-list-item-title>
              </mu-list-item>
              <mu-list-item button @click="operation(listItem, '下载')">
                <mu-list-item-title>下载</mu-list-item-title>
              </mu-list-item>
              <mu-list-item button @click="operation(listItem, '删除')">
                <mu-list-item-title>删除</mu-list-item-title>
              </mu-list-item>
            </mu-list>
          </mu-menu>
        </div>
        <div class="enclosureImgPreview" v-show="previewView2">
          <span class="switch-close" @click="closePreview2"><i class="iconfont icon-cuo"></i></span>
          <img :src="previewSrc2">
        </div>
      </div>
    </div>
    <!-- <mu-divider class="bottomDivider"></mu-divider> -->

  </div>
</template>

<script>
import UpLoadImages from './components/uploadListImages'
import UpLoadEnclosure from './components/uploadListEnclosure'
import PreviewImage from './components/PreviewImage'
import tool from './components/js/tool'
import tools from '../../../static/js/tool'
export default {
  name:"upLoad",
  components:{ UpLoadImages,UpLoadEnclosure,PreviewImage},
  data(){
    return{
      guid:'', // 用于文件上传的标志
      isAlimatin:true, //是否开启动画
      imgPreviewList:[],
      previewView:false, //预览视窗
      previewSrc:'', //预览图 src
      previewIndex:0, //预览图 下标
      // openMenu:false,

      enclosureList:[],
      menuList:[{
        title:'查看',
        isLink:false
      },{
        title:'下载',
        isLink:false
      },{
        title:'删除',
        isLink:false
      }],

      previewView2:false,
      previewSrc2:''
    }
  },
  mounted() {
    this.guid = tools.guid();
  },
  methods:{
    getImgSuccessList(data){
      this.$emit('getImgSuccessList',data);
    },
    parentImgLoad(data){
      this.imgPreviewList = data;
    },
    deleteImageItem(item){
      this.$refs.imageRef.deleteImageItem(item);
    },
    // 显示查看图片 view
    openPreview(item, index){
      this.previewView = true;
      this.previewSrc = item.src;
      this.previewIndex = index;
    },
    // 关闭 图片预览 view
    closePreview(val){
      this.previewView = val;
    },

    parentEnclosureLoad(data){
      this.enclosureList = data;
    },
    operation(listItem, typeTest){
      listItem.openMenu = false;

      switch(typeTest){
        case '查看':
            if(/^image/.test(listItem.file.type)){
              this.previewView2 = true;
              this.previewSrc2 = listItem.dataUrl;
            }else{
              console.log('其他类型')
            }
          break;
        case '下载':
          tool.downloadExcel(this, listItem.file, listItem.file.name)
          break;
        case '删除':
            this.$refs.enclosureRef.deleteImageItem(listItem);
          break;
      }
    },
    closePreview2(){
      this.previewView2 = false;
    },
    openPreview2(item){
      this.previewView2 = true;
      this.previewSrc2 = item;
    }
  }
}
</script>

<style scoped lang="less">
  .upLoad{
    background-color: #fff;
    // padding: 0 16px;
    padding:0 16px 0 0;
    .bottomDivider{
      width: 104%;
    }

    @keyframes animation-in {
      from{
        top:-48px;
        opacity: .2;
      }
      to{
        top:0px;
        opacity: 1;
      }
    }

    .animation-in{
      animation: animation-in .3s ease-out;
    }

    .enclosure{
      min-height: 44px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title{
        color: @primary-text;
        font-size: @primary-size;
        font-weight: @regular-weight;
      }
      .content{
        width: 58px;
        background-color: #fff;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }
    }

    .preview{
      .imgPreview{
        display: flex;
        flex-wrap: wrap;
        justify-content: start;

        .imgList{
          width: 48px;
          height: 48px;
          margin: 0 8px 18px 0;
          position: relative;
          .imgItem{
            width: 48px;
            height: 48px;
            border-radius: 2px;
            border: 1px solid @primary-border;
          }
          .delete{
            position: absolute;
            z-index: 20;
            width: 20px;
            height: 20px;
            top: -10px;
            right: -8px;
          }
          .loading,.reUpload{
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            background-color: rgba(0,0,0,.3);
          }
          .loading{
            display: flex;
            justify-content: center;
            align-items: center;
            span{
              color: #fff;
            }
          }
          .reUpload{
            z-index: 11;
            display: flex;
            justify-content: center;
            align-items: center;
            i{
              color: #FFF;
              font-size: 24px;
            }
          }
        }
      }
      
      .enclosurePreview{
        display: flex;
        flex-wrap: wrap;
        .enclosureImgPreview{
          position: fixed;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background-color: rgba(0,0,0,.5);
          z-index: 1000;
          display: flex;
          justify-content: center;
          align-items: center;
          
          img{
            width: 100%;

            position: absolute;
          }
          .switch-close{
            position: absolute;
            top: 10px;
            right: 10px;
            width: 28px;
            height: 28px;
            z-index: 999;
            font-size: 24px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: rgba(202, 202, 202, 0.8);

            i{
              font-size: 24px;
              color: #fff;
            }
          }
        }
        

        .enclosureList{
          width: 100%;
          height: 40px;
          margin: 10px 0 10px;
          display: flex;
          position: relative;

          &:first-child{
            margin-top: 20px;
          }

          img{
            width: 40px;
            height: 40px;
          }
          .describe{
            margin-left: 10px;
            .title{
              color: @primary-text;
            }
            .size{
              color: @regular-text;
            }
          }
          .mu-menu{
            position: absolute;
            right: 0;
            bottom: 0;
          }
          .loading,.reUpload{
            width: 100%;
            height: 100%;
            border-radius: 4px;
            position: absolute;
            top: 0;
            left: 0;
            background-color: rgba(0,0,0,.3);
          }
          .loading{
            display: flex;
            justify-content: center;
            align-items: center;
            span{
              color: #fff;
            }
          }
          .reUpload{
            z-index: 11;
            display: flex;
            justify-content: center;
            align-items: center;
            i{
              color: #FFF;
              font-size: 24px;
            }
          }
        }
      }
    }
  }
</style>