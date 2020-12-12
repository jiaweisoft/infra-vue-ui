<template>
  <div ref="dom" class="infra-box">
    <input style="overflow: hidden;" :accept="accept" ref="input" @change="fileChange" type="file" hidden>
    <!--居左展示的部分-->
    <div class="upload-box" v-if="previewPosition === 'left'">
      <div :key="item.previewSrc" v-for="item in list" class="infra-item" v-bind:style="{height: height}">
        <img @click="previewEvent(item.previewSrc)" class="infra-itemImage" :src="item.previewSrc" alt="">
        <i @click="closeEvent(item)" class="iconfont iconclose-circle infra-close"></i>
      </div>
      <!--相机上传的图标-->
      <div @click="clickEvent" class="infra-item" v-bind:style="{height: height}">
        <div class="infra-upload infra-center infra-relative">
          <i :style="{fontSize: fontSize}" class="iconfont iconcamera infra-camera"></i>
          <p class="infra-p">{{list.length}}/{{limit}}</p>
        </div>
      </div>
    </div>
    <div class="upload-box" v-if="previewPosition === 'right'">
      <!--相机上传的图标-->
      <div @click="clickEvent" class="infra-item" v-bind:style="{height: height}">
        <div class="infra-upload infra-center infra-relative">
          <i :style="{fontSize: fontSize}" class="iconfont iconcamera infra-camera"></i>
          <p class="infra-p">{{list.length}}/{{limit}}</p>
        </div>
      </div>
      <!--居右展示的部分-->
      <div :key="item.previewSrc" v-for="item in list" class="infra-item" v-bind:style="{height: height}">
        <img @click="previewEvent(item.previewSrc)" class="infra-itemImage" :src="item.previewSrc" alt="">
        <i @click="closeEvent(item)" class="iconfont iconclose-circle infra-close"></i>
      </div>
    </div>
  </div>
</template>

<script>
  /**
   * 向上暴露主要的接口，change事件。
   */
  import PreviewImage from '../../PreviewImage/index'; // 用于大图浏览图片的组件
  import DomSize from 'wd-domsize-monitor';
  export default {
    name: 'infra-upload',
    props: {
      accept: {
        type: String,
        default: 'image/*'
      },
      limit: {
        type: Number,
        default: 4
      },
      previewPosition: {
        validator: function (val) {
          return ['left', 'right'].indexOf(val) !== -1;
        },
        default: 'left'
      },
      previewBgColor: String
    },
    data: function () {
      return {
        list: [],
        height: null,
        fontSize: '70px'
      };
    },
    computed: {
      fileList: function () {
        return this.list.map(item => item.file);
      }
    },
    watch: {
      fileList: function () {
        this.$emit('change', [...this.fileList]);
      }
    },
    mounted () {
      this.callback();
      DomSize.bind(this.$refs.dom, this.callback);
    },
    beforeDestroy () {
      DomSize.remove(this.$refs.dom);
    },
    methods: {
      clearFiles () {
        this.list = [];
      },
      callback () {
        let style = window.getComputedStyle(this.$refs.dom, null);
        this.height = parseInt(style.width) / 3 + 'px';
        this.fontSize = parseInt(style.width) / 6 + 'px';
      },
      previewEvent (item) {
        if (this.previewBgColor) {
          PreviewImage({
            imageSrc: item,
            backgroundColor: this.previewBgColor
          });
        } else {
          PreviewImage.info(item);
        }
      },
      closeEvent (item) {
        this.list = this.list.filter(obj => {
          return obj.previewSrc !== item.previewSrc;
        });
      },
      fileChange (e) {
        let files = e.target.files;
        let list = [];
        for (let i = 0; i < files.length; i++) {
          let src = URL.createObjectURL(files[i]);
          list.push({
            file: files[i],
            previewSrc: src
          });
        }
        this.list = [...this.list, ...list];
      },
      clickEvent () {
        if (this.limit <= this.list.length) {
          return;
        }
        this.$refs.input.click();
      }
    }
  };
</script>

<style scoped>
  .infra-box {
    width: 100%;
  }
  .upload-box {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: flex-start;
  }
  .infra-item {
    width: 33.3%;
    height: 100px;
    padding: 3px;
    box-sizing: border-box;
    position: relative;
  }
  .infra-itemImage {
    width: 100%;
    height: 100%;
  }
  .infra-upload {
    background-color: #eee;
    height: 100%;
  }
  .infra-relative {
    position: relative;
  }
  .infra-p {
    margin: 0;
    padding: 0;
    position: absolute;
    left: 50%;
    top: 80%;
    transform: translate(-50%, -50%);
    font-size: 12px;
    color: #939DA6;
  }
  .infra-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .infra-close {
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 20px;
    color: gray;
  }
  .infra-camera {
    font-size: 70px;
    color: #999;
  }
</style>
