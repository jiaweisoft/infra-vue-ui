<template>
  <div>
    <textarea class="text-area v-validate" v-bind="$props" @input="handleInput">
    </textarea>
  </div>
</template>
<script>
  export default{
    name: 'infra-textarea',
    props: {
      value: String,
      placeholder: String,
      name: String,
      id: String,
      maxlength: Number,
      minlength: Number,
      readonly: Boolean,
      disabled: Boolean,
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
      }
    }
  }
</script>
<!-- Add 'scoped' attribute to limit CSS to this component only.-->
<style lang="css">
  .text-area{
    height: 1.02rem;
    padding-top: 0.34rem;
    width: 70%;
    float: right;
    text-align: right;
    border:0;
    outline:0;
    resize: none;
    padding-right:0.67rem;
    font-size: 0.28rem;
    line-height: 0.34rem;
    color:#465582;
  }
  .text-area::-webkit-input-placeholder{
    font-size: 0.3rem;
    color:#CDD4E1;
  }
</style>
