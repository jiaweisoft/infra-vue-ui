<template>
  <div class="infra-pc-userinfo-item">
    <img v-if="icon" class="infra-pc-iconsize" :src="icon" alt="手机">
    <div :style="{ marginLeft: icon ? '40px' : '0px' }" class="infra-pc-input-box">
      <input
        :disabled="disabled"
        :value="value"
        :style="{borderLeft: icon ? '1px solid #e6e6e6' : 'none'}"
        @input="inputEvent"
        @blur="blurEvent"
        class="infra-pc-input"
        :placeholder="placeholder"
        type="text"
      >
    </div>
  </div>
</template>

<script>
  export default {
    name: 'infra-input',
    props: {
      icon: {},
      placeholder: {
        type: String
      },
      value: {
        type: String
      },
      disabled: {
        type: Boolean
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
    border-radius: 5px;
    overflow: hidden;
  }

  .infra-pc-input-box {
    margin-left: 40px;
    height: 100%;
  }

  .infra-pc-input {
    outline: none;
    border-left: 1px solid #e6e6e6;
    border-bottom: 0;
    border-top: 0;
    border-right: 0;
    background: #f2f2f2;
    height: inherit;
    width: 100%;
    padding-left: 5px;
    display: inline-block;
  }

  .infra-pc-iconsize {
    width: 40px;
    height: 41px;
    float: left;
  }
</style>
