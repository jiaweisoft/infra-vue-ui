<template>
  <div class="scroll-wrapper" v-if="flag && imgList.length > 0">
    <transition-group
    tag="div"
    v-if="imgList.length > 0"
    class='scroll-parent'
    :name="direction">
      <div
        class="scroll-child"
        v-for="(item, index) in imgList"
        :key="item"
        v-show="currentIndex === index"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
        >
        <img :src="item" alt="哎呦，图片走丢了">
      </div>
    </transition-group>
    <!-- 页码显示 -->
    <div class="pages">{{(currentIndex+1)+'/'+imgList.length}}</div>
    <!-- 关闭按钮 -->
    <span @click="closePreview" class="iconfont iconclose-circle preview-close"></span>
  </div>
</template>
<script>
  export default {
    name: 'infra-carousel-preview',
    props: {
      list: {
        type: Array,
        default: function () {
          return [];
        }
      },
      clickImgIndex: {
        type: [String, Number],
        default: 1
      },
      showPreview: Boolean
    },
    data: function () {
      return {
        imgList: [],
        currentIndex: 0,
        isMoving: false,
        boundary: window.innerWidth / 6, // 触发切换的阈值
        start: {
          x: 0,
          y: 0
        },
        offSet: {
          x: 0,
          y: 0
        },
        direction: 'left',
        flag: null
      }
    },
    mounted () {
      this.flag = this.showPreview;
      this.imgList = this.list;
    },
    watch: {
      clickImgIndex: function (val) {
        this.currentIndex = val * 1 - 1;
      },
      list: function (val) {
        this.imgList = val;
      },
      showPreview: function (val) {
        this.flag = val;
      },
      flag: function (val) {
        if (val === false) {
          this.$parent.showPreview = false;
        }
      }
    },
    methods: {
      handleTouchStart (e) {
        let startTouch = e.touches[0];
        this.start.x = startTouch.pageX;
        this.start.y = startTouch.pageY;
      },
      handleTouchMove (e) {
        e.preventDefault();
        e.stopPropagation();
        this.offSet.x = e.touches[0].pageX - this.start.x;
        this.offSet.y = e.touches[0].pageY - this.start.y;
        if (Math.abs(this.offSet.x) > Math.abs(this.offSet.y)) {
          this.isMoving = true
        }
      },
      handleTouchEnd (e) {
        if (this.isMoving) {
          e.preventDefault();
          e.stopPropagation();
          let distance = this.offSet.x;
          if (distance >= this.boundary) {
            this.currentIndex--;
            this.direction = 'right';
            if (this.currentIndex < 0) {
              this.currentIndex = 0;
            }
          } else if (distance <= -this.boundary) {
            this.currentIndex++;
            this.direction = 'left';
            if(this.currentIndex > this.imgList.length - 1){
              this.currentIndex = this.imgList.length - 1;
            }
          }else{
            // 保持此图片不做滑动操作
          }
          this.isMoving = false;
        }
      },
      closePreview () {
        this.flag = false;
      }
    }
  }
</script>

<style scoped>
  .scroll-wrapper{
    position:fixed;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #000;
  }
  .scroll-parent{
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
  }
  .scroll-child{
    position: absolute;
    left: 0;
    right: 0;
  }
  img{
    max-width: 100%;
    max-height: 100%;
  }
  .pages{
    position: fixed;
    bottom: 1rem;
    left: 48%;
    font-size: .5rem;
    color: gray;
  }
  .preview-close{
    display: inline-block;
    width: 1rem;
    height: 1rem;
    line-height: 1rem;
    position: absolute;
    top: .5rem;
    right: .4rem;
    z-index: 666;
    font-size: .5rem;
    color: gray;
  }
  .preview-close:hover{
    cursor: pointer;
  }
  .left-enter-to {
      transition: all 0.5s ease;
      transform: translateX(0);
  }
  .left-leave-active {
      transition: all 0.5s ease;
      transform: translateX(-100%)
  }
  .left-enter {
      transform: translateX(100%)
  }
  .left-leave {
      transform: translateX(0)
  }
  .right-enter-to {
      transition: all 0.5s ease;
      transform: translateX(0);
  }
  .right-leave-active {
      transition: all 0.5s ease;
      transform: translateX(100%)
  }
  .right-enter {
      transform: translateX(-100%)
  }
  .right-leave {
      transform: translateX(0)
  }
</style>
