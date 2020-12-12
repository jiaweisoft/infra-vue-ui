<template>
  <div
    :style="{
      width: form.width,
      height: form.height
    }"
  >
    <span @click="clickEvent" class="infra-checkbox-container" role="checkbox">
      <span
        class="infra-checkbox infra-center"
        :style="{
          border: isChecked ? '1px solid ' + form.focusBorderColor : '1px solid #999',
          backgroundColor: isChecked ? form.focusBorderColor: '#fff'
        }"
      >
        <i class="iconfont iconcheck infra-myicon"></i>
      </span>
      <span
        class="infra-padding-left"
        :style="{color: isChecked ? form.activeFontColor : '#333'}"
      >
        <slot></slot>
      </span>
    </span>
  </div>
</template>

<script>
  import { form } from '../../packages.config';
  export default {
    name: 'infra-check-box',
    data: function () {
      return {
        form: { ...form },
        isChecked: this.value
      };
    },
    props: {
      value: Boolean,
      default: () => false
    },
    watch: {
      value: function (val, oldVal) {
         if (val !== oldVal) {
           this.isChecked = val;
         }
      }
    },
    methods: {
      clickEvent () {
        this.isChecked = !this.isChecked;
        this.$emit('input', this.isChecked);
      }
    }
  };
</script>

<style scoped>
  .infra-checkbox-container {
    display: flex;
    align-items: center;
  }
  .infra-checkbox {
    width: 14px;
    height: 14px;
    border: 1px solid #ccc;
    box-sizing: border-box;
    display: inline-block;
  }
  .infra-padding-left {
    padding-left: 5px;
  }
  .infra-isChecked {

  }
  .infra-myicon {
    font-size: 10px;
    color: #fff;
  }
  .infra-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
