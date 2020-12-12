<template>
  <div class="koala-input-box">
    <label class="koala-label">{{label}}</label>
    <div class="flex-box input-box">
      <input style="min-width: 35px;" :value="value[0]" :placeholder="placeholder[0]" class="koala-input v-validate" v-bind="$props" @input="handleInput"/>
      <span class="span">-</span>
      <input style="min-width: 100px;" :value="value[1]" :placeholder="placeholder[1]" class="koala-input v-validate" v-bind="$props" @input="handleInputPhone"/>
      <span class="span">-</span>
      <input style="min-width: 30px;" :value="value[2]" :placeholder="placeholder[2]" class="koala-input v-validate" v-bind="$props" @input="handleInputExtension"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'input-phone',
    data: function () {
      return {
        value1: this.value[0],
        value2: this.value[1],
        value3: this.value[2],
      };
    },
    props: {
      value: Array,
      placeholder: Array,
      name: String,
      id: String,
      maxlength: Number,
      minlength: Number,
      readonly: Boolean,
      disabled: Boolean,
      type: {
        type: String,
        default: 'text'
      },
      rows: {
        type: Number,
        default: 2
      },
      autoComplete: {
        type: String,
        default: 'off'
      },
      validateEvent: {
        type: Boolean,
        default: true
      },
      suffixIcon: String,
      label: String
    },
    methods: {
      handleInput (event) {
        const value = event.target.value
        this.value1 = value;
        let data = [this.value1, this.value2, this.value3];
        this.$emit('input', data)
      },
      handleInputPhone (event) {
        const value = event.target.value
        this.value2 = value;
        let data = [this.value1, this.value2, this.value3];
        this.$emit('input', data)
      },
      handleInputExtension (event) {
        const value = event.target.value
        this.value3 = value;
        let data = [this.value1, this.value2, this.value3];
        this.$emit('input', data)
      }
    },
    watch: {
      value: function (val) {
        this.value1 = val[0];
        this.value2 = val[1];
        this.value3 = val[2];
      }
    }
  }
</script>

<style scoped lang="css">
  *{
    margin:0;
    padding:0;
    font-family:"PingFangSC","Arial","Microsoft YaHei",sans-serif;
    box-sizing: border-box;
  }
  .flex-box {
    display: flex;
  }
  .koala-input-box {
    overflow: hidden;
    width: 100%;
    color: #465582;
  }
  .koala-input-box .input-box {
    width: 60%;
    line-height: 0.9rem;
  }
  .koala-input-box .span {
    color: #465582;
    padding-left: 5px;
    font-size: 0.3rem;
  }
  .koala-input-box .koala-input {
    height: 1.02rem;
    padding-bottom: 0.12rem;
    text-align: center;
    border: 0;
    outline: 0;
    width: 30%;
    flex: 1;
    font-size: 0.3rem;
    color: #465582;
  }
  .koala-input-box input::-webkit-input-placeholder {
    font-size: 0.24rem;
    color: #CDD4E1;
  }
  label.koala-label{
    font-size: 0.3rem;
    color: #465582;
    float: left;
    line-height: 0.9rem;
    padding-bottom: 0.12rem;
    width: 30%;
    text-align: left;
    white-space: nowrap;
  }
</style>
