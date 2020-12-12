<template lang="html">
  <div>
    <div class="koala-input-box">
      <label class="koala-label">{{label}}</label>
      <div ref="dom" class="koala-input select-input-right"></div>
      <input type="hidden" class="v-validate" ref=valBridgeT v-bind="$props" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import generateDateData  from './js/timeProps.js'
import Picker from './js/PickerClass.js';
import './css/popicker.css';

export default {
  name:'tpicker',
	props: {
    value: String,
	  label: String,
	  placeholder: String,
    name: String,
    date: {
      type: Boolean,
      default: false
    },
	  start: {
      type: String,
      default: ''
    },
    end: {
      type: String,
      default: ''
    },
    maxDate: {
      type: [String, Date]
    },
	  // end: String,
	  displayField: {
	  	type: String,
	  	default: 'text'
	  },
	  valueField: {
	  	type: String,
	  	default: 'value'
	  },
	  dataType: {
	  	type: String,
	  	default: null
	  },
	  source: {
	  	default: function(){
	  		return null;
	  	},
	  	type: Array
	  },
	  target:{
	  	default: function(){
	  		return [];
	  	},
	  	type: Array
	  },
	  ptype: {
	  	default: 3,
	  	type: [Number,String]
	  },
	  text: {
	  	default: '',
	  	type: String
	  }
	},
	data () {
		return {
      picker: null,
      sourceData: this.source
		}
	},
	computed: {

	},
	watch:{
    value: function (val) {
      if (this.picker) {
        !this.date && this.value && this.picker.setValueByCityCode(this.value, this.$refs.dom);
        this.date && this.value && (this.$refs.dom.innerHTML = this.value);
      }
    },
    source: function (val) {
      this.sourceData = val;
      this.initialize(this.$el);
      if (this.picker) {
        !this.date && this.value && this.picker.setValueByCityCode(this.value, this.$refs.dom);
      }
    }
	},
	mounted () {
    this.initialize(this.$el);
	},
	methods: {
    filterData (sourceDate, time) {
      let year = time.split('-')[0], month = time.split('-')[1], day = time.split('-')[2];
      let mydata = sourceDate.filter(item => {
        return item.text <= year;
      })
      mydata[mydata.length -1].children = mydata[mydata.length -1].children.filter(item => {
        return item.text <= month;
      });

      //截止年份数据赋值
      let months =  mydata[mydata.length -1].children.filter(item => {
        return item.text <= month;
      });
      let maxDate = months[months.length - 1].children.filter(item => {
        return item.text <= day;
      })
      let maxMonth = {};
      maxMonth.text = month;
      maxMonth.value = month;
      maxMonth.children = maxDate;
      months[months.length-1] = maxMonth;
      mydata[mydata.length -1].children = months;

      return mydata;
    },
    prefixZero(i){
        return(i < 10 ? '0' : '') + i;
    },
    dateFormat(date){
        return `${String(date.getFullYear())}-${this.prefixZero(date.getMonth()+1)}-${this.prefixZero(date.getDate())}`;
    },
		initialize(el) {
		  let me = this;
      if(this.date) {
        this.sourceData = generateDateData({
          displayField: 'text',
          valueField: 'value',
          childField: 'children'
        });
        if (this.maxDate) {
          let time = this.dateFormat(this.maxDate);
          let sourceData = [...this.sourceData];
          this.sourceData = this.filterData(sourceData, time);
        }
        let time = null;
        if (this.value) {
          time = new Date(this.value);
        }
        let now = time || (this.maxDate && new Date(this.maxDate)) || new Date;
        //TODO 同样的方式可以给省市区组件预设值，后面优化
        this.preLoadData = [{
          [this.valueField]: String(now.getFullYear())
        }, {
          [this.valueField]: String((now.getMonth() + 1) < 10 ? `0${now.getMonth() + 1}` : now.getMonth() + 1)
        }, {
          [this.valueField]: String(now.getDate()) < 10 ? `0${now.getDate()}` : String(now.getDate())
        }];

      }else{
        if (!this.sourceData.length) {
          return false;
        }
      }
			let options = {
				el: el.querySelector('.select-input-right'),
				dataType: this.dataType,
				displayField: this.displayField,
        valueField: this.valueField,
				data: this.sourceData,
				type: this.ptype,
				dataRange: {
					start: this.start,
					end: this.end
        },
        preLoadData: this.preLoadData,
				complete: function(result){
          me.$emit('input', result.value)
          setTimeout(() => {
            let eventObj = document.createEvent('Event')
            eventObj.initEvent('change', true, true)
            me.$refs.valBridgeT.dispatchEvent(eventObj)
          },0)
				}
			};
			if(this.sourceData == null){
				delete options.data;
			}
			this.picker = new Picker(options);
			// 当传递下来时间信息的时候，自动显示
      this.date && this.value && (this.$refs.dom.innerHTML = this.value);
			// 当传递下来省市的数据的时候，自动显示
      !this.date && this.value && this.picker.setValueByCityCode(this.value, this.$refs.dom);
		}
	},
	components: {}
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
  overflow:hidden;
  width: 100%;
}
</style>
