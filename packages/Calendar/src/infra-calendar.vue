<template>
  <div class="container-wrapper">
    <!-- 年月及上一年，下一年操作 -->
    <div class="calendar-title">
      <div class="btn-go-preview" @click="goPreviewMonth(currentYear,currentMonth)">&lt;</div>
      <div class="show-year-month">{{ currentYear }} 年 {{ currentMonth }} 月</div>
      <div class="btn-go-next" @click="goNextMonth(currentYear,currentMonth)">&gt;</div>
    </div>
    <!-- 星期 -->
    <ul class="weekdays">
      <li>一</li>
      <li>二</li>
      <li>三</li>
      <li>四</li>
      <li>五</li>
      <li>六</li>
      <li>日</li>
    </ul>
    <!-- 日期 -->
    <div v-if="isHoliday.length > 0">
      <ul class="days" v-for="(value,index1) in daysUL" :key = "index1">
        <li @click="handleClick(day,index+index1*7)" @dblclick="handledbclick(day)" v-for="(day, index) in value" :key = "index" @mouseenter="handleEnter(index+index1*7)" @mouseleave="handleLeave">
          <!--非本月-->
          <span v-if="day.getMonth()+1 != currentMonth" :class="['other-month', {'selected':isSelected[index+index1*7]}]" :style="{'background': isSelected[index+index1*7] ? selectBgColor : ''}">{{ day.getDate() }}</span>
          <!-- 本月 -->
          <span v-else :class="[{'selected':isSelected[index+index1*7]},{'holiday':isHoliday[index+index1*7].showColor}]" :style="{'background': isSelected[index+index1*7] ? selectBgColor : ''}">
            <!--今天-->
            <span v-if="day.getFullYear() == currentDate.getFullYear() && day.getMonth() == currentDate.getMonth() && day.getDate() == currentDate.getDate()" class="active" :style="{'background': currentBgColor}">
              {{ day.getDate() }}
            </span>
            <span v-else>
              {{ day.getDate() }}
            </span>
          </span>
          <span :class="{mask: index+index1*7 == holidayIndex}" v-if="(index+index1*7) == holidayIndex && showHolidayFlag">{{isHoliday[index+index1*7].name}}</span>
        </li>
      </ul>
    </div>
    <div v-if="isHoliday.length == 0">
      <ul class="days" v-for="(value,index1) in daysUL" :key = "index1">
        <li @click="handleClick(day,index+index1*7)" @dblclick="handledbclick(day)" v-for="(day, index) in value" :key = "index">
          <!--非本月-->
          <span v-if="day.getMonth()+1 != currentMonth" :class="['other-month', {'selected':isSelected[index+index1*7]}]" :style="{'background': isSelected[index+index1*7] ? selectBgColor : ''}">{{ day.getDate() }}</span>
          <!-- 本月 -->
          <span v-else :class="[{'selected':isSelected[index+index1*7]}]" :style="{'background': isSelected[index+index1*7] ? selectBgColor : ''}">
            <!--今天-->
            <span v-if="day.getFullYear() == currentDate.getFullYear() && day.getMonth() == currentDate.getMonth() && day.getDate() == currentDate.getDate()" class="active" :style="{'background': currentBgColor}">
              {{ day.getDate() }}
            </span>
            <span v-else>
              {{ day.getDate() }}
            </span>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'infra-calendar',
  props: {
    holidayList: {
      type: Array,
      default: function () {
        return [];
      }
    },
    defaultDate: {
      type: String,
      default: ''
    },
    currentBgColor: {
      type: String,
      default: '#abd9f5'
    },
    selectBgColor: {
      type: String,
      default: '#FFDBA0'
    }
  },
  data () {
    return {
      currentYear: 1970,
      currentMonth: 1,
      currentDay: 1,
      currentWeek: 1,
      firstWeek: 1,
      days: [],
      daysUL: [],
      isSelected: [], // 42个日期中，选中的日期设置为true,未选中的设置为false,目前组件只选择一个日期
      isHoliday: [], // 显示月份假日集合，共有42个元素，每个元素是存储了{name, showColor},其中name为假日名字，showColor是否显示假日背景色
      holidayIndex: '', // 点击的假日在42个元素中的下标
      showHolidayFlag: false, // 是否显示假日浮标，默认不显示，只有鼠标放入假日上时才显示
      currentDate: null,
      currentStr: ''
    };
  },
  created () {
    this.currentStr = this.defaultDate;
    this.initData(this.currentStr);
    this.currentDate = this.currentStr ? new Date(this.currentStr) : new Date();
  },
  methods: {
    handleLeave () {
      this.holidayIndex = '';
      this.showHolidayFlag = false;
    },
    handleEnter (index) {
      this.holidayIndex = index;
      this.showHolidayFlag = true;
    },
    handledbclick (day) {
      let date = this.formatDate(day.getFullYear(), day.getMonth() + 1, day.getDate());
      this.$emit('date-db-click', date);
    },
    formatDate (year, month, day) { // 格式化日期
      let y = year;
      let m = month;
      if (m < 10) m = `0${m}`;
      let d = day;
      if (d < 10) d = `0${d}`;
      return `${y}-${m}-${d}`;
    },
    initData (day) {
      let date = '';
      if (day) {
        date = new Date(day);
      } else {
        date = new Date();
      }
      this.currentDay = date.getDate();
      this.currentYear = date.getFullYear();
      this.currentMonth = date.getMonth() + 1;
      this.currentWeek = date.getDay();

      date.setDate(1);// 先设置日期为当月的第一天
      this.firstWeek = date.getDay();// 再获取第一天是星期几

      if (this.firstWeek === 0) {
        this.firstWeek = 7;
      }
      let str = this.formatDate(this.currentYear, this.currentMonth, 1);
      this.days = [];

      // 根据当月1号是星期几，来设置日历第一行该星期前几天数据
      for (let i = this.firstWeek - 1; i >= 0; i -= 1) {
        let d = new Date(str);
        d.setDate(d.getDate() - i);
        this.days.push(d);
      }
      // 如果当月1号是星期日，则将days集合直接添加到dayUL集合中；说明：日历列表中是个二维数组，外层数组是6个元素，代表每一行；每个元素里面有7个元素，代表每个日期。
      if (this.days.length % 7 === 0) {
        this.daysUL.push(this.days);
        this.days = [];
      }

      for (let i = 1; i <= 42 - this.firstWeek; i += 1) {
        let d = new Date(str);
        d.setDate(d.getDate() + i);
        this.days.push(d);
        if (this.days.length % 7 === 0) {
          this.daysUL.push(this.days);
          this.days = [];
        }
      }
      this.$emit('get-holidays', this.currentYear, this.currentMonth);// 获取假期列表数据
    },
    goPreviewMonth (year, month) {
      this.daysUL = [];
      this.isSelected = [];
      let d = new Date(this.formatDate(year, month, 1));
      d.setDate(0);
      this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
    },
    goNextMonth (year, month) {
      this.daysUL = [];
      this.isSelected = [];
      let d = new Date(this.formatDate(year, month, 1));
      d.setDate(42);
      this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
    },
    dealResult (currentYear, currentMonth) { // 算法
      let tempHolidayList = [];
      this.isHoliday = [];
      let whatDay = new Date(this.formatDate(currentYear, currentMonth, 1)).getDay(); // 被查找的月份 1 号是星期几
      if (whatDay === 0) {
        whatDay = 7;
      }
      for (let i = 0; i < this.holidayList.length; i++) {
        let temp = this.holidayList[i];
        let index = new Date(temp.date).getDate() - 1 + (whatDay - 1);// 重要算法，算出假日，在几号位
        tempHolidayList.push({ index: index, name: temp.name });
      }
      for (let n = 0; n < 42; n++) {
        let nothave = true;
        let tempObj = {};
        for (let k = 0; k < tempHolidayList.length; k++) {
          if (n === tempHolidayList[k].index) {
            tempObj.showColor = true;
            tempObj.name = tempHolidayList[k].name;
            this.isHoliday.push(tempObj);
            nothave = false;
            break;
          }
        }
        if (nothave) {
          tempObj.showColor = false;
          tempObj.name = '';
          this.isHoliday.push(tempObj);
        }
      }
    },
    handleClick (date, index) {
      this.isSelected = [];// 该数组用来存每个日期选中的状态，目前是单击一次的日期便设置该坐标下的元素值为true,否则都设置为false,后面可以根据不同的规则进行扩展。
      let selectDay = this.formatDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
      for (let i = 0; i < 42; i++) {
        if (index === i) {
          this.isSelected.push(true);
          continue;
        }
        this.isSelected.push(false);
      }
      // 触发click事件
      this.$emit('date-click', selectDay);
    }
  },
  watch: {
    holidayList: function (val) {
      this.dealResult(this.currentYear, this.currentMonth);
    }
  }
};
</script>

<style scoped>
  .container-wrapper{
    min-width: 300px;
  }
  .calendar-title{
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 17px;
    height: 38px;
  }
  .calendar-title .btn-go-preview{
    flex: 1;
    height: 38px;
    line-height: 38px;
    cursor: pointer;
  }
  .calendar-title .btn-go-next{
    flex: 1;
    height: 38px;
    line-height: 38px;
    cursor: pointer;
  }
  .calendar-title .show-year-month{
    width: 70%;
    height: 38px;
    line-height: 38px;
  }
  .calendar-title .btn-go-preview:hover,.btn-go-next:hover{
    color: red;
    transform:scale(2);
  }
  .weekdays {
    background-color: #EFF3F8;
  }
  .days,.weekdays {
    display: flex;
    width: 100%;
    margin: 0;
    padding: 0;
    font-size: 13px;
    color: #333;
    border-right: .5px solid #DFE3E6;
  }
  .weekdays li, .days li {
    flex: 1;
    height: 46px;
    line-height: 46px;
    border-bottom: .5px solid #DFE3E6;
    border-left: .5px solid #DFE3E6;
    list-style-type: none;
    text-align: center;
    cursor: pointer;
  }
  .selected {
    display: inline-block;
    width: 36px;
    height: 36px;
    line-height: 36px;
    margin-top: 3px;
    border-radius: 50%;
  }
  .active {
    display: inline-block;
    width: 36px;
    height: 36px;
    line-height: 36px;
    margin-top: 3px;
    border-radius: 50%;
  }
  .other-month {
    color: rgba(0,0,0,.1);
  }
  .holiday{
    display: inline-block;
    font-size: 14px;
    color: red;
  }
  li{
    position: relative;
  }
  .mask{
    position: absolute;
    top:100%;
    left: 0;
    white-space: nowrap;
    min-width: 50px;
    z-index: 666;
    padding: 0 8px;
    background: rgba(8, 8, 8, 0.8);
    color: #fff;
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-box-shadow: 0px 0px 3px #222;
    -webkit-box-shadow: 0px 0px 3px #222;
    box-shadow: 0px 0px 3px #222;
  }
</style>
