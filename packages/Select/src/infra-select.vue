<template>
  <div class="infra-userinfo-item" :class="{'infra-mini' : size === 'mini'}">
    <img v-if="icon" class="infra-iconsize" :src="icon" alt="手机">
    <div @click.prevent="clickEvent" :style="{ marginLeft: icon ? '40px' : '0px' }" class="infra-input-box" :class="{'infra-mini' : size === 'mini'}">
      <input
        :value="currentValue"
        disabled
        class="infra-input"
        :class="{'infra-mini' : size === 'mini'}"
        :placeholder="placeholder"
        type="text"
        :style="{borderLeft: icon ? '1px solid #e6e6e6' : 'none'}"
      >
    </div>
    <ul v-if="isShowList" class="infra-list" :class="{'infra-top30' : size === 'mini'}">
      <li v-for="item in list" :key="item" class="infra-list-item" @click="choiceEvent(item)">{{item}}</li>
      <li v-if="!list.length" class="infra-list-item">无数据</li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'infra-select',
    data () {
      return {
        isShowList: false,
        list: this.dataSource || [],
        isNomalClick: false,
        currentValue: this.value
      };
    },
    props: {
      icon: {},
      placeholder: [String],
      value: [String, Object],
      dataSource: [Array],
      size: {
        type: String,
        default: 'default'
      }
    },
    created () {
      this.bindDocumentClick();
    },
    beforeDestroy () {
      this.clearDocumentClick();
    },
    watch: {
      dataSource: function (val, oldVal) {
        this.list = JSON.parse(JSON.stringify(val));
      },
      value: function (val, oldVal) {
        if (this.currentValue !== val) {
          this.currentValue = val;
        }
      }
    },
    methods: {
      clickEvent: function () {
        this.nomalClickDeal();
        this.isShowList = !this.isShowList;
      },
      choiceEvent: function (item) {
        this.nomalClickDeal();
        this.currentValue = item;
        this.$emit('input', item);
        this.$emit('select', item);
        this.isShowList = false;
      },
      nomalClickDeal: function () {
        this.timer && window.clearTimeout(this.timer);
        this.isNomalClick = true;
        this.timer = setTimeout(() => {
          this.isNomalClick = false;
        }, 300);
      },
      bindDocumentClick () {
        let _this = this;
        document.body.onclick = function () {
          setTimeout(() => {
            if (!_this.isNomalClick) {
              _this.isShowList = false;
            }
          }, 200);
        };
      },
      clearDocumentClick () {
        document.body.onclick = null;
      }
    }
  };
</script>

<style scoped>
  .infra-userinfo-item {
    height: 40px;
    width: 290px;
    display: inline-block;
    position: relative;
    border-radius: 5px;
  }

  .infra-input-box {
    margin-left: 40px;
  }

  .infra-input {
    box-sizing: border-box;
    outline: none;
    border-left: 1px solid #e6e6e6;
    border-bottom: 0;
    border-top: 0;
    border-right: 0;
    background: #f2f2f2;
    height: 40px;
    width: 100%;
    padding-left: 5px;
    display: inline-block;
  }

  .infra-iconsize {
    width: 40px;
    height: 41px;
    float: left;
  }

  .infra-list {
    background: #fefefe;
    position: absolute;
    left: 0;
    top: 40px;
    max-height: 400px;
    width: 100%;
    overflow: auto;
    z-index: 10000;
    border: 1px solid #e6e6e6;
    box-sizing: border-box;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .infra-list-item {
    text-align: center;
    line-height: 28px;
    cursor: pointer;
    margin: 0;
    padding: 0;
  }

  .infra-list-item:hover {
    background-color: #e6e6e6;
  }
  .infra-mini {
    height: 30px;
  }
  .infra-top30 {
    top: 30px;
  }
</style>
