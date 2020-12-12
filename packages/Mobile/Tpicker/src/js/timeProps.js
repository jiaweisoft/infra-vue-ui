function isEmpty (value) {
  return typeof value === 'undefined' || value == null;
}

function generateDateData (config) {
    // 是否为闰年
    function is_leap (year) {
       return (year % 100 == 0 ? (year % 400 == 0 ? 1 : 0) : (year % 4 == 0 ? 1 : 0));
    }
    config = config || {};

    var popickerDate = [];
    var dateNow = new Date();
    var yearNow = dateNow.getFullYear();
    var monthNow = dateNow.getMonth();
    var dayNow = dateNow.getDate();
    var popickerYear = [];
    var valueField = config.valueField;
    var displayField = config.displayField;
    var childField = config.childField;

    // start 默认追溯100年，end默认退后200年
    var startYear = (isEmpty(config.start) || config.start == 'start') ? (yearNow - 100) : config.start;
    var endYear = (isEmpty(config.end) || config.end == 'end') ? (yearNow + 200) : config.end;

    // 设置当前年数前的100年
/*    for(var i = 1; i <= startYear; i++) {
      popickerYear.unshift((yearNow - i) + '');
    } */
    // 设置当前年数后的200年
    for (var i = startYear; i <= endYear; i++) {
      popickerYear.push(i + '');
    }
    // 把年数添加到总数据中
    for (var i = 0; i < popickerYear.length; i++) {
      // popickerDate[i] = {text: popickerYear[i], value: popickerYear[i]};
      popickerDate.push(createObj(valueField, displayField, popickerYear[i]));
    }

    var cutFromNow, cutToNow;
    if (config.start == yearNow && config.end == 'end') { // 以后的新生活
      cutFromNow = true;
    } else if (config.start == 'start' && config.end == yearNow) { // 以前的旧时光
      cutToNow = true;
    }

    var normalData = generateAllMonths(config);
     var leapData = normalData.concat();
     var leapMonth = createObj(valueField, displayField, toDate(2));// 正常年份数据与闰年数据
     leapMonth[childField] = generateDaysOfMonth(1, valueField, displayField, true);

    leapData.splice(1, 1, leapMonth);

    popickerDate.forEach(function (item, index) {
      var year = item[valueField];
        var bLeap = is_leap(year);
        var data = bLeap ? leapData : normalData; var specData;

      item[childField] = data;
      if (cutFromNow && yearNow == year) {
        specData = JSON.parse(JSON.stringify(data.slice(monthNow)));
        specData[0][childField] = specData[0][childField].slice(dayNow - 1);
        item[childField] = specData;
      }
      if (cutToNow && yearNow == year) {
        specData = JSON.parse(JSON.stringify(data.slice(0, monthNow + 1)));
        specData[monthNow][childField] = specData[monthNow][childField].slice(0, dayNow);
        item[childField] = specData;
      }
    });

    return popickerDate;
  }
  function toDate (value) {
    if (value < 10 && value > 0) {
      return '0' + value;
    }
    return value + '';
  }

  function createObj (valueField, displayField, value) {
    var item = {};
    item[displayField] = item[valueField] = value;
    return item;
  }

  function generateAllMonths (opt) {
    var valueField = opt.valueField;
    var displayField = opt.displayField;
    var childField = opt.childField;
    var res = [];
    for (var i = 0, len = 12; i < len; i++) {
      var item = {};
      item[valueField] = item[displayField] = toDate(i + 1);
      item[childField] = generateDaysOfMonth(i, valueField, displayField);
      res.push(item);
    }

    return res;
  }

  function generateDaysOfMonth (monthIndex, valueField, displayField, bLeap) {
    var month = monthIndex + 1;
    var delta = bLeap ? 1 : 0;
    var daysOfMonth;
    var res = [];
    var day = 1;
    switch (month) {
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12:
        daysOfMonth = 31;
        break;
      case 2:
        daysOfMonth = 28 + delta;
        break;
      default:
        daysOfMonth = 30;
        break;
    }
    while (day <= daysOfMonth) {
      var item = {};
      item[valueField] = item[displayField] = toDate(day);
      res.push(item);
      day++;
    }
    return res;
  }

  export default generateDateData;
