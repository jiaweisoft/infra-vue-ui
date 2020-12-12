<template>
  <div class="koala-input-box">
    <label class="koala-label">{{label}}</label>
    <input :style="{width: inputWidth}" class="koala-input v-validate" v-bind="$props" @input="handleInput" @blur="blur" />
  </div>
</template>
<script>
  export default{
    name: 'input-field',
    props: {
      value: [String, Number],
      placeholder: String,
      name: String,
      id: String,
      maxlength: Number,
      minlength: Number,
      readonly: Boolean,
      disabled: Boolean,
      inputWidth: {
        type: String
      },
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
    mounted () {

    },
    methods: {
      handleInput (event) {
        const value = event.target.value;
        this.$emit('input', value);
      },
      blur () {
        this.$emit('blur');
        //      window.scroll(0,0);
      }
    }
  }
</script>
<!-- Add 'scoped' attribute to limit CSS to this component only.-->
<style scoped lang="css">
  *{
    margin:0;
    padding:0;
    font-family:"PingFangSC","Arial","Microsoft YaHei",sans-serif;
    box-sizing: border-box;
  }
  .koala-input-box{
    overflow:hidden;
  }
  .koala-input-box .koala-input{
    float: right;
    height: 1.02rem;
    padding-bottom: 0.12rem;
    width: 70%;
    text-align: right;
    border:0;
    outline:0;
    padding-right:0.67rem;
    font-size: 0.3rem;
    color: #465582;
  }
  .koala-input-box input::-webkit-input-placeholder{
    font-size: 0.3rem;
    color:#CDD4E1;
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
