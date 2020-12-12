<template>
  <div
    :style="{
      width: width || form.width,
      height: computedHeight
    }"
    class="infra-pc-userinfo-item"
  >
    <input
      :disabled="disabled"
      :value="value"
      :style="{border: '1px solid ' + form.borderColor, cursor: disabled ? 'no-drop' : 'default'}"
      @input="inputEvent"
      @blur="blurEvent"
      class="infra-pc-input"
      :placeholder="placeholder"
      type="text"
    >
  </div>
</template>

<script>
  import { form } from '../../packages.config';
  export default {
    name: 'infra-input1',
    data: function () {
      return {
        form: { ...form }
      };
    },
    props: {
      icon: {},
      placeholder: {
        type: String
      },
      value: {
        type: [String, Number]
      },
      disabled: {
        type: Boolean,
        default: false
      },
      size: {
        default: 'default',
        validator (val) {
          return ['default', 'medium', 'small', 'mini'].indexOf(val) !== -1;
        }
      },
      width: [String]
    },
    computed: {
      computedHeight: function () {
        return this.form.size[this.size];
      }
    },
    methods: {
      inputEvent (e) {
        this.$emit('input', e.target.value);
      },
      blurEvent (e) {
        this.$emit('blur', e);
      }
    }
  };
</script>

<style scoped>
  .infra-pc-userinfo-item {
    height: 40px;
    width: 290px;
    display: inline-block;
    position: relative;
    box-sizing: border-box;
  }

  .infra-pc-input {
    outline: none;
    border-left: 1px solid #e6e6e6;
    border-bottom: 0;
    border-top: 0;
    border-right: 0;
    background: #fff;
    height: inherit;
    width: 100%;
    padding-left: 5px;
    display: inline-block;
    box-sizing: border-box;
  }
  .infra-pc-input:focus {
    border: 1px solid #6392fe !important;
  }
</style>
