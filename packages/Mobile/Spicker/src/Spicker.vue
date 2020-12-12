<template>
  <div>
    <div class="koala-input-box">
      <label class="koala-label">{{label}}</label>
      <div class="koala-input" v-text="text" @click.prevent="showPicker"></div>
      <input type="hidden" class="v-validate" ref=valBridgeS v-bind="$props" />
    </div>
    <div class="content-bottom singlepicker" v-if="enable">
      <div class="singlepicker-content" >
        <ul>
          <li v-for="item in source" @click.prevent="onSelect(item)" :class="{'selected': item == selectedItem}">
            <div>{{item[displayField]}}</div>
          </li>
        </ul>
      </div>
      <button class="btn next submit cancel" @click.prevent="cancelSelect">取消</button>
    </div>
    <div class="spicker-bg" v-if="enable"></div>
  </div>
</template>

<script>
  export default {
    name:'spicker',
    props: {
      value: [String,Number],
      label: String,
      placeholder: String,
      name: String,
      isDisabled:Boolean,
      displayField: {
        type: String,
        default: 'text'
      },
      maskLayerId: {
        type: String,
        default: 'spicker-mask'
      },
      valueField: {
        type: [String, Number],
        default: 'value'
      },
      source: {
        default: function(){
          return null;
        },
        type: Array
      }
    },
    data () {
      return {
        enable: false,
        selectedItem: null,
        text: ''
      }
    },
    mounted () {
      this.setValue(this.value);
    },
    watch: {
      value: function (val) {
        this.setValue(val);
      }
    },
    methods: {
      showPicker(event){
        document.body.style.position = 'fixed';
        document.body.style.overflow = 'hidden';
        if(this.isDisabled){
          return false;
        }
        this.enable = true;
      },
      setValue(value){
        if(value == null || value==='') {
          this.text = '';
        }
        if(this.source == null || this.source.length ==0) {
          this.text = '';
        }else{
          this.selectedItem = this.source.find(item=>item[this.valueField] == value);
          if(this.selectedItem == null) {
            this.text = '';
          }else{
            this.text = this.selectedItem[this.displayField] || '';
          }
        }

        let eventObj = document.createEvent('Event')
        eventObj.initEvent('change', true, true)
        this.$refs.valBridgeS.dispatchEvent(eventObj)
      },
      onSelect(selected){
        document.body.style.position = 'relative';
        document.body.style.overflow = 'auto';
        this.enable = false;
        this.$emit('input', selected[this.valueField])
        this.$emit('changeReset')
      },
      cancelSelect(){
        document.body.style.position = 'relative';
        document.body.style.overflow = 'auto';
        this.enable = false;
      }
    },
  }



</script>

<style lang="css" scoped>
  *{
    margin:0;
    padding:0;
    font-family:"PingFangSC","Arial","Microsoft YaHei",sans-serif;
    box-sizing: border-box;
  }
  .koala-input {
    overflow-x: auto;
    background-image: url('img/CombinedShape.png');
    background-repeat: no-repeat;
    background-size:auto 30%;
    background-position: 100% 42%;
    float: right;
    height: 1.02rem;
    line-height: 0.9rem;
    padding-bottom: 0.12rem;
    width: calc(70% - 0.3rem);
    margin-right:0.3rem;
    text-align: right;
    border: 0;
    outline: 0;
    padding-right: 6%;
    font-size: 0.3rem;
    color: #465582;
  }
  .singlepicker{
    display:block;
    font-size: 0.36rem;
    opacity: 1;
    left: 3%;
    bottom: 4px;
    overflow: hidden;
    position: fixed;
    width: 94%;
    max-width: 750px;
    color: #465582;
    background-color: #999999;
    -webkit-animation-duration: .2s !important;
    -moz-animation-duration: .2s !important;
    animation-duration: .2s !important;
    z-index:9;
    border-radius: 0.18rem;
  }
  .singlepicker-content {
    max-height: 60vh;
    overflow: auto;
    border-radius: 0.18rem;
  }
  .singlepicker ul li {
    list-style: none;
    position: static;
  }
  .singlepicker ul li div {
    line-height: 1rem;
    text-align: center;
    margin: 0px auto;
    background: #FFFFFF;
    border-bottom: 1px solid rgba(70,85,130,0.15);
  }
  .singlepicker button.next.submit {
    margin-top: 0.14rem;
    position: static;
    border-width: 0px;
    line-height: 1rem;
    background: rgba(255,255,255,1);
    color:#6392fe;
    font-size:0.36rem;
    width:100%;
    text-align: center;
    letter-spacing: 1px;
    border-radius: 0.18rem;
  }
  .spicker-bg{
    position: fixed;
    left:0;
    top:0;
    bottom:0;
    right:0;
    background-color: #000000;
    opacity: 0.4;
    z-index: 8;
  }
  label.koala-label{
    font-size: 0.3rem;
    float: left;
    line-height: 0.9rem;
    padding-bottom: 0.12rem;
    width: 30%;
    text-align: left;
    white-space: nowrap;
    color: #465582;
  }
  .koala-input-box{
    overflow: hidden;
    width: 100%;
  }
</style>
