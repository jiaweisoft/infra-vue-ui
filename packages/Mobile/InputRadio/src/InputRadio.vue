<template>
<span style="float: right;">
  <span class="radio-main" v-for="item in dataArr" :key="item.id">
    <span class="radio-img" :class="{'checked':checked2===item.value}"></span>
      <span class="radio-content">
        <input type="radio"
               :id="item.id"
               :value="item.value"
               v-model="checked2"
               :disabled="item.disabled"
               @change="$emit('change', checked2)" />
        <label :for="item.id">{{item.label}}</label>
      </span>
  </span>
</span>
</template>
<script>
  export default {
    name: 'input-radio',
    props: {
      dataArr: {
        type: Array,
        default () {
          return [];
        }
      },
      checked:''
    },
    model: {
      prop: 'checked',
      event: 'change'
    },
    data () {
      return {
        checked2: ''
      }
    },
    mounted: function () {
      this.checked2 = this.checked;
    },
    watch:{
      'checked':function(val){
        this.checked2 = val;
      }
    }
  }
</script>
<style scoped>
  *{
    margin:0;
    padding:0;
    font-family:"PingFangSC","Arial","Microsoft YaHei",sans-serif;
    box-sizing: border-box;
  }
  input,button{box-shadow:none;}
  .radio-main{
    position: relative;
    display:inline-block;
    width:1.7rem;
    line-height: 1.02rem;
    text-align: left;
    padding-left: 0.53rem;
    font-size: 0.3rem;
  }
  .radio-img{
    width:0.36rem;
    height:0.36rem;
    display:inline-block;
    background:url('img/radioIcon.png');
    background-size:cover;
  }
  .radio-img.checked{
    background-image:url('img/radioChecked.png');
  }
  .radio-content{
    position: absolute;
    right:0.3rem;
    top:0;
    line-height: 0.9rem;
    display:inline-block;
    color: #465582;
  }
  input[type="radio"]{
    line-height: 1.02rem;
    width: 0.58rem;
    transform: scale(1.5,1.5);
    -webkit-transform:scale(1.5,1.5); /* Safari 和 Chrome */
    opacity: 0;
  }
</style>
