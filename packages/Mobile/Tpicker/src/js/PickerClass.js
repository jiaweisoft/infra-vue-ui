/**
 * @license
 * Popicker <>
 * Copyright Qinwen Zhou
 */

const init = Symbol('init');
const initFrame = Symbol('initFrame');
const createElement = Symbol('createElement');
const createPickerItems = Symbol('createPickerItems');
const addPickerMethod = Symbol('addPickerMethod');
const setCurrentSelectStyle = Symbol('setCurrentSelectStyle');
const selectResult = Symbol('selectResult');
const colLength = Symbol('colLength');
const preLoadDataMethod = Symbol('preLoadDataMethod');
const currentColDataList = Symbol('currentColDataList');
const moveToItem = Symbol('moveToItem');
const setNextCol = Symbol('setNextCol');

const __defaultConfig = {
  frameClass: 'popicker-box',
  frameBgClass: 'popicker-bg',
  frameHeaderClass: 'popicker-header',
  frameCancelClass: 'popicker-cancel',
  frameConfirmClass: 'popicker-confirm',
  frameContentClass: 'popicker-content',
  frameColClass: 'popicker-col',
  frameItemClass: 'popicker-item',
  frameItemSelectedClass: 'popicker-selected',
  frameItemSelectedSecondClass: 'popicker-selected-second',
  frameItemSelectedThirdClass: 'popicker-selected-third',
  frameItemSelectedFourthClass: 'popicker-selected-fourth',
  baselineClass: 'popicker-baseline',
  baselineHeight: 47,
  headerHeight: 30,
  contentHeight: 215,
  itemHeight: 32,
  // cssPath: '../css/Popicker.css',
  cssId: 'PopickerRelayCss'
};
__defaultConfig.baseTop = (__defaultConfig.contentHeight - __defaultConfig.baselineHeight) / 2;

class Popicker {
  constructor () {
    this.config = [].slice.call(arguments)[0];

    if (Validator.isEmpty(this.config)) {
      Validator.throwError('Picker工具需要传递配置信息！');
    }
    if (Object.prototype.toString.call(this.config) !== '[object Object]') {
      Validator.throwError('Picker工具配置信息为对象格式！');
    }
    Util.default(this.config, {
      targetElement: this.config.el,
      type: 1,
      valueTarget: this.config.el,
      triggerOnce: false,
      styleType: 'bottom',
      displayField: 'text',
      valueField: 'value',
      childField: 'children',
      connector: '-',
      complete: () => { },
      version: 1
    });

    const props = {
      el: { // ＊触发生成面板的元素
        required: true,
        reg: HTMLElement
      },
      targetElement: { // 选择完成后，回显数据的元素。不填则默认为element
        required: true,
        reg: HTMLElement
      },
      type: { // 生成几级框架。不填默认为1。目前理论上支持无限级别
        required: true,
        reg: /^[1-9]$/
      },
      valueTarget: { // 设置其它元素的value。仅支持表单元素
        required: true,
        reg: HTMLElement
      },
      triggerOnce: { // 初始化后是否立即触发一次事件。不填默认为false
        required: false,
        reg: Boolean
      },
      data: { // 内部数据。如为日历，可不传
        required: true,
        reg: Array
      },
      dataRange: { // 显示时间范围'{start: '2010', end: 'end'}'
        required: false,
        reg: {
          fn: range => {
            if (Object.prototype.toString.call(range) !== '[object Object]') {
              if (!Object.getOwnPropertyDescriptor(range, 'start') && !Object.getOwnPropertyDescriptor(range, 'end')) {
                return false;
              }
            }
            return true;
          }
        }
      },
      styleType: { // 面板样式。支持bottom，middle。默认为bottom，暂不支持middle
        required: false,
        reg: /^middle|bottom$/
      },
      displayField: { // text名称。不填默认为text
        required: false,
        reg: String
      },
      valueField: { // value名称。不填默认为value
        required: false,
        reg: [String, Number]
      },
      childField: { // children名称。不填默认为children
        required: false,
        reg: String
      },
      preLoadData: { // [{ value: '16' }, { value: '186' }],   //初始化时预加载数据
        required: false,
        reg: Array
      },
      connector: {
        required: true,
        reg: /^.$/
      },
      complete: { // 选择完成后方法
        required: false,
        reg: Function
      }
    };
    Validator.propsType(props, this.config);

    let idKey = `${Date.now()}${this.config.version}`;
    this.id = Util.bit32(idKey);
    this.bgid = Util.bit32(idKey + 'bg');
    this[init] = false;

    this[colLength] = this.config.type;

    this[selectResult] = [];
    this[currentColDataList] = [];
    this.result = [];

    this.config.el.addEventListener('click', e => {
      // Util.loadRelyCss(__defaultConfig.cssPath);
      this[initFrame]();
      this.show();
    });
  }
  [initFrame] () { // 初始化框架
    if (this[init]) return;
    this[init] = true;
    this.frameElement = this[createElement]({
      class: `${__defaultConfig.frameClass} ${this.config.styleType}`,
      id: this.id
    });
    this.frameElementBg = this[createElement]({
      class: __defaultConfig.frameBgClass,
      id: this.bgid
    });
    this.frameElement.appendChild(this[createPickerItems]());
    document.body.appendChild(this.frameElement);
    document.body.appendChild(this.frameElementBg);
    this[addPickerMethod]();
    this[preLoadDataMethod]();
  }
  [createElement] (config) { // 封装创建dom方法
    Util.default(config, { tag: 'div', in: '' });
    let el = document.createElement(config.tag);
    for (var attr in config) {
      if (attr !== 'in' && (typeof config[attr] === 'string' ||
        typeof config[attr] === 'number' ||
        typeof config[attr] === 'boolean')) {
        el.setAttribute(attr, config[attr]);
      }
    }
    el.innerText = config.in;
    return el;
  }
  [createPickerItems] () { // 创建dom标签
    let fragmentMain = document.createDocumentFragment();
    let fragment = document.createDocumentFragment();
    let header = this[createElement]({
      class: `${__defaultConfig.frameHeaderClass}`
    });
    this.baseline = this[createElement]({
      class: `${__defaultConfig.baselineClass}`
    });
    this.content = this[createElement]({
      class: `${__defaultConfig.frameContentClass}`
    });
    this.headerCancel = this[createElement]({
      class: `${__defaultConfig.frameCancelClass}`,
      in: '取消'
    });
    this.headerConfirm = this[createElement]({
      class: `${__defaultConfig.frameConfirmClass}`,
      in: '确认'
    });

    // 添加popicker-col分栏和分栏中元素
    let _colLength = this[colLength];
    let _createColElement = arr => {
      let colElement = this[createElement]({
        class: `${__defaultConfig.frameColClass} ${__defaultConfig.frameColClass}-${this[colLength]}`,
        style: `top:${__defaultConfig.baseTop}px`,
        parentIndex: 0
      });
      this[currentColDataList].push(arr);
      this[selectResult].push({
        txt: arr[0][this.config.displayField],
        val: arr[0][this.config.valueField],
        order: 0
      });
      arr.forEach(item => {
        colElement.appendChild(this[createElement]({
          tag: 'p',
          class: __defaultConfig.frameItemClass,
          data: item[this.config.valueField],
          in: item[this.config.displayField]
        }));
      });
      this[setCurrentSelectStyle](colElement.firstChild);
      fragment.appendChild(colElement);
      _colLength--;
      if (_colLength > 0) {
        _createColElement(arr[0][this.config.childField]);
      }
    };
    _createColElement(this.config.data);

    this.content.appendChild(fragment);
    header.appendChild(this.headerCancel);
    header.appendChild(this.headerConfirm);
    fragmentMain.appendChild(header);
    fragmentMain.appendChild(this.content);
    fragmentMain.appendChild(this.baseline);
    return fragmentMain;
  }
  setValueByCityCode (value) {
    let codeArr = value.split('-').map(item => {
      return item.trim();
    });
    let province, city, area;
    if (codeArr[0]) {
      province = this.config.data.find(item => {
        return item[this.config.valueField] === codeArr[0];
      });
    }
    if (codeArr[1]) {
      city = province.children.find(item => {
        return item[this.config.valueField] === codeArr[1];
      });
    }
    if (codeArr[2]) {
      area = city.children.find(item => {
        return item[this.config.valueField] === codeArr[2];
      });
    }
    this.config.targetElement.innerHTML = area ? `${province[this.config.displayField]}-${city[this.config.displayField]}-${area[this.config.displayField]}` : `${province[this.config.displayField]}-${city[this.config.displayField]}`;
  }
  [addPickerMethod] () { // 添加点击、触摸方法
    this.headerConfirm.addEventListener('click', e => {
      let showTxtArr = [];
      let showValArr = [];
      this.result = [];
      this[selectResult].forEach(item => {
        this.result.push({ txt: item.txt, val: item.val });
        showTxtArr.push(item.txt);
        showValArr.push(item.val);
      });
      try {
        this.config.targetElement.innerText = showTxtArr.join(this.config.connector);
        this.config.valueTarget.value = showValArr.join(this.config.connector);
        this.config.complete({
          text: showTxtArr.join(this.config.connector),
          value: showValArr.join(this.config.connector)
        });
      } catch (e) { console.log(e); }
      this.hide();
    });
    this.headerCancel.addEventListener('click', e => {
      this.hide();
    });
    let _previousTop = 0;
    let _startTop = 0;
    this.content.addEventListener('touchstart', e => {
      if (e.target == this.content ||
        e.target == this.baseline ||
        !Util.versions().mobile
      ) return;
      let targetTouches = e.targetTouches || e.originalEvent.targetTouches; // 可能为兼容问题
      if (targetTouches.length == 1) {
        // e.preventDefault();    //会阻止点击事件
        let touch = targetTouches[0];
        _previousTop = touch.pageY;
        _startTop = parseInt(e.target.parentNode.style.top);
      }
    }, false);
    this.content.addEventListener('touchmove', e => {
      if (e.target == this.content ||
        e.target == this.baseline ||
        !Util.versions().mobile
      ) return;
      let targetTouches = e.targetTouches || e.originalEvent.targetTouches; // 可能为兼容问题
      if (targetTouches.length == 1) {
        // e.preventDefault();    //会阻止点击事件
        let touch = targetTouches[0];
        let targetTop = (touch.pageY - _previousTop) * 3;
        e.target.parentNode.style.top = _startTop + targetTop + 'px';
        e.target.parentNode.setAttribute('top', _startTop + targetTop + 'px');
      }
    }, false);
    this.content.addEventListener('touchend', e => {
      if (e.target == this.content ||
        e.target == this.baseline ||
        !Util.versions().mobile
      ) return;
      let parentNode = e.target.parentNode;
      let endTop = parseInt(parentNode.style.top);
      let minTop = __defaultConfig.baseTop - parentNode.offsetHeight + __defaultConfig.baselineHeight;
      let maxTop = __defaultConfig.baseTop;
      if (endTop > maxTop) {
        parentNode.style.top = maxTop + 'px';
      } else if (endTop < minTop) {
        parentNode.style.top = minTop + 'px';
      } else {
        parentNode.style.top = endTop + 'px';
      }
      let parentTop = parseInt(parentNode.style.top);
      let moveItemsCount = Math.round((parentTop - __defaultConfig.baseTop) / __defaultConfig.itemHeight);
      parentNode.style.top = __defaultConfig.baseTop + moveItemsCount * __defaultConfig.itemHeight + 'px';
      this[setCurrentSelectStyle](parentNode.children[Math.abs(moveItemsCount)]);

      let selectItem = parentNode.children[Math.abs(moveItemsCount)];

      let parentNodeIndex = [].slice.call(parentNode.parentNode.children).findIndex(item => item == parentNode);
      this[selectResult][parentNodeIndex] = { txt: selectItem.innerText, val: selectItem.getAttribute('data'), order: Math.abs(moveItemsCount) };
      this[setNextCol](selectItem);
    }, false);

    this.content.addEventListener('click', e => {
      e.preventDefault();
      if (e.target == this.content ||
        e.target == this.baseline ||
        e.target.className.search(__defaultConfig.frameItemClass) == -1
      ) return;
      this[moveToItem](e.target);
      this[setNextCol](e.target);
    }, false);
  }
  [setCurrentSelectStyle] (el) { // 设置单项样式
    let children = [].slice.call(el.parentNode.children);
    let index = children.findIndex(item => item == el);
    children.forEach(item => {
      item.className = __defaultConfig.frameItemClass;
    });
    try {
      let classArray = [
        `${__defaultConfig.frameItemClass} ${__defaultConfig.frameItemSelectedClass}`,
        `${__defaultConfig.frameItemClass} ${__defaultConfig.frameItemSelectedSecondClass}`,
        `${__defaultConfig.frameItemClass} ${__defaultConfig.frameItemSelectedThirdClass}`,
        `${__defaultConfig.frameItemClass} ${__defaultConfig.frameItemSelectedFourthClass}`
      ];
      for (var i = index - 3; i < index + 4; i++) {
        if (i < 0 || !children[i]) continue;
        children[i].className = classArray[Math.abs(i - index)];
      }
    } catch (e) { };
  }
  [preLoadDataMethod] () { // 初始化时预设数据
    if (this.config.preLoadData) {
      // 重设this[currentColDataList]
      let _resetCurrentColIndex = 0;
      let _resetCurrentColDataList = (arr, value) => {
        this[currentColDataList][_resetCurrentColIndex] = arr;
        _resetCurrentColIndex++;
        if (_resetCurrentColIndex < this[colLength]) {
          let currentItem = arr.find(item => item[this.config.valueField] == value);
          if (!currentItem) {
            Validator.throwError('预设数据出错，请检查');
          }
          _resetCurrentColDataList(currentItem[this.config.childField], this.config.preLoadData[_resetCurrentColIndex][this.config.valueField]);
        }
      };
      _resetCurrentColDataList(this.config.data, this.config.preLoadData[0][this.config.valueField]);

      // 重设this[selectResult]
      this[currentColDataList].forEach((item, index) => {
        this[selectResult][index] = {
          txt: item.find(i => i[this.config.valueField] == this.config.preLoadData[index][this.config.valueField])[this.config.displayField],
          val: item.find(i => i[this.config.valueField] == this.config.preLoadData[index][this.config.valueField])[this.config.valueField],
          order: item.findIndex(i => i[this.config.valueField] == this.config.preLoadData[index][this.config.valueField])
        };
      });

      // 重设多级框架
      let firstColItem = [].slice.call(this.content.firstChild.children).find(item => item.getAttribute('data') == this.config.preLoadData[0][this.config.valueField]);
      this[moveToItem](firstColItem);
      for (var i = 1; i < this[selectResult].length; i++) {
        let parentNode = this.content.children[i];
        parentNode.innerHTML = '';
        let fragment = document.createDocumentFragment();
        this[currentColDataList][i].forEach(item => {
          fragment.appendChild(this[createElement]({
            tag: 'p',
            class: __defaultConfig.frameItemClass,
            data: item[this.config.valueField],
            in: item[this.config.displayField]
          }));
        });
        // 兼容vivo-X7（不支持append方法）等手机
        if (!parentNode.append) {
          parentNode.appendChild(fragment);
        } else {
          parentNode.append(fragment);
        }
        let el = [].slice.call(parentNode.children).find(item => item.getAttribute('data') == this.config.preLoadData[i][this.config.valueField]);
        this[moveToItem](el);
      }
    }
  }
  [moveToItem] (el) {
    let parentNode = el.parentNode;
    let index = [].slice.call(parentNode.children).findIndex(item => item == el);
    let moveColTargetTop = __defaultConfig.baseTop - index * __defaultConfig.itemHeight;
    parentNode.style.top = moveColTargetTop + 'px';
    this[setCurrentSelectStyle](el);

    let parentNodeIndex = [].slice.call(parentNode.parentNode.children).findIndex(item => item == parentNode);
    this[selectResult][parentNodeIndex] = { txt: el.innerText, val: el.getAttribute('data'), order: index };
  }
  [setNextCol] (el) {
    let parentNode = el.parentNode;
    let parentParentNode = parentNode.parentNode;
    let parentNodeIndex = [].slice.call(parentParentNode.children).findIndex(item => item == parentNode);
    let currentItemIndex = [].slice.call(parentNode.children).findIndex(item => item == el);

    let nextArr = this[currentColDataList][parentNodeIndex][currentItemIndex][this.config.childField];
    for (var i = parentNodeIndex + 1; i < this[colLength]; i++) {
      try {
        let colElement = parentParentNode.children[i];
        colElement.innerHTML = '';

        let fragment = document.createDocumentFragment();

        nextArr.forEach(item => {
          fragment.appendChild(this[createElement]({
            tag: 'p',
            class: __defaultConfig.frameItemClass,
            data: item[this.config.valueField],
            in: item[this.config.displayField]
          }));
        });

        colElement.appendChild(fragment);
        this[setCurrentSelectStyle](colElement.firstChild);

        this[moveToItem](colElement.firstChild);
        this[selectResult][i] = { txt: colElement.firstChild.innerText, val: colElement.firstChild.getAttribute('data') };

        this[currentColDataList][i] = nextArr;

        nextArr = nextArr[0][this.config.childField];
      } catch (e) { console.error(e); }
    }
  }
  static generateDateData (config) {
    config = config || {};
    Util.default(config, {
      start: 'start',
      end: 'end',
      displayField: 'text',
      valueField: 'value',
      childField: 'children'
    });
    return Util.generateDateData(config);
  }
  hide () {
    let self = this;
    // var fn = function () {
      self.frameElement.style.display = 'none';
      self.frameElementBg.style.display = 'none';
      document.body.style.position = 'relative';
      document.body.style.overflow = 'auto';
    // }
    // Util.animateCss(this.frameElement, 'fadeOutDown', fn)
  }
  show () {
    document.body.style.position = 'fixed';
    document.body.style.overflow = 'hidden';
    this.frameElement.style.display = 'block';
    this.frameElementBg.style.display = 'block';
    // Util.animateCss(this.frameElement, 'fadeInUp')
  }
}

class Util {
  static bit32 (value) {
    let val = '';
    for (var i = 0; i < value.length; i++) {
      val += value.charCodeAt(i).toString(32);
    }
    return val;
  }
  static default (object, source) {
    Object.getOwnPropertyNames(source).forEach(item => {
      if (!object.hasOwnProperty(item)) {
        object[item] = source[item];
      }
    });
  }
  static getClientHeight () {
    return parseInt(document.documentElement.clientHeight || document.body.clientHeight);
  }
  static animateCss (el, animationName, callback) {
    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    var originClass = el.className;
    originClass = originClass.split(' ').filter(item => !/^animate/i.test(item)).join(' ');
    el.className = `${originClass} animated ${animationName}`;
    callback = callback || function () { };

    animationEnd.split(' ').forEach(item => {
      el.addEventListener(item, function () {
        el.className = originClass;
        callback();
      });
    });
  }
  static versions () {
    var u = navigator.userAgent;
    return {
      trident: u.indexOf('Trident') > -1, // IE内核
      presto: u.indexOf('Presto') > -1, // opera内核
      webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, // 火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或者uc浏览器
      iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, // 是否iPad
      webApp: u.indexOf('Safari') == -1, // 是否web应该程序，没有头部与底部
      weixin: u.indexOf('MicroMessenger') > -1, // 是否微信 （2015-01-22新增）
      qq: u.match(/\sQQ/i) == ' qq' // 是否QQ
    };
  }
  static loadRelyCss (csspath) {
    if (document.getElementById(__defaultConfig.cssId)) {
      return;
    }
    let head = document.getElementsByTagName('head');
    var es = document.createElement('link');
    es.href = csspath;
    es.rel = 'stylesheet';
    es.type = 'text/css';
    es.id = __defaultConfig.cssId;
    head[0].appendChild(es);
  }
  static generateDateData (config) {
    // 是否为闰年
    function is_leap (year) {
      // return (year % 100 == 0 ? res = (year % 400 == 0 ? 1 : 0) : res = (year % 4 == 0 ? 1 : 0));
      return (year % 100 == 0 ? (year % 400 == 0 ? 1 : 0) : (year % 4 == 0 ? 1 : 0));
    }

    var popickerDate = [];
    var dateNow = new Date();
    var yearNow = dateNow.getFullYear();
    var yearArray = [yearNow + ''];

    config = config || {};

    var startYear = config.start == 'start' ? 100 : (yearNow - config.start);
    var endYear = config.end == 'end' ? 200 : (config.end - yearNow);

    /**
     * 添加年份
     */
    for (var i = 1; i <= startYear; i++) { // 设置当前年数前的100年
      yearArray.unshift((yearNow - i) + '');
    }
    for (var i = 1; i <= endYear; i++) { // 设置当前年数后的200年
      yearArray.push((yearNow + i) + '');
    }
    for (var i = 0; i < yearArray.length; i++) { // 把年数添加到总数据中
      popickerDate[i] = {
        [config.displayField]: yearArray[i],
        [config.valueField]: yearArray[i],
        [config.childField]: []
      };
    }
    /**
     * 添加月、日
     */
    for (var i = 0; i < yearArray.length; i++) {
      // 添加月份
      let monthStart = 1;
      let monthEnd = 12;
      if (config.start !== 'start' && config.start.split('-')[0] === yearArray[i]) {
        monthStart = parseInt(config.start.split('-')[1]);
      }
      if (config.end !== 'end' && config.end.split('-')[0] === yearArray[i]) {
        monthEnd = parseInt(config.end.split('-')[1]);
      }
      for (var j = monthStart - 1; j < monthEnd; j++) {
        popickerDate[i][config.childField][j] = {
          [config.displayField]: (j + 1 < 10) ? ('0' + (j + 1)) : ('' + (j + 1)),
          [config.valueField]: (j + 1 < 10) ? ('0' + (j + 1)) : ('' + (j + 1)),
          [config.childField]: []
        };
        // 添加日
        let dayStart = 1;
        let dayEndArray = new Array(31, 28 + is_leap(yearNow), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31); // 各月份的总天数
        let dayEnd = dayEndArray[j];
        if (config.start !== 'start' &&
          config.start.split('-')[0] === yearArray[i] &&
          parseInt(config.start.split('-')[1]) === j + 1) {
          dayStart = parseInt(config.start.split('-')[2]);
        }
        if (config.end !== 'end' &&
          config.end.split('-')[0] === yearArray[i] &&
          parseInt(config.end.split('-')[1]) === j + 1) {
          dayEnd = parseInt(config.end.split('-')[2]);
        }
        for (var k = dayStart - 1; k < dayEnd; k++) {
          popickerDate[i][config.childField][j][config.childField][k] = {
            [config.displayField]: (k + 1 < 10) ? ('0' + (k + 1)) : ('' + (k + 1)),
            [config.valueField]: (k + 1 < 10) ? ('0' + (k + 1)) : ('' + (k + 1))
          };
        }
      }
    }
    return popickerDate;
  }
}

class Validator {
  static isEmpty (value) {
    return value == undefined || value == null || value == '';
  }
  static isEmptyObject (value) {
    return Object.getOwnPropertyNames(value).length == 0;
  }
  static propsType (props, value) {
    var names = Object.getOwnPropertyNames(props);
    names.forEach(name => {
      var required = props[name].required;
      if (required) {
        if (this.isEmpty(value[name])) {
          this.throwError(`${name}为必传字段！`);
        }
      }
      if (!this.isEmpty(value[name])) {
        var reg = props[name].reg;
        if (reg instanceof RegExp) {
          if (!reg.test(value[name])) {
            this.throwError(`${name}数据格式不匹配！`);
          }
        } else if (Object.prototype.toString.call(reg) === '[object Object]') {
          if (!reg.fn(value[name])) {
            this.throwError(`${name}数据未通过函数校验！`);
          }
        } else if (reg instanceof Function) {
          if (reg === String) {
            if (typeof value[name] !== 'string') {
              this.throwError(`${name}数据类型不匹配！`);
            }
          } else {
            if (!(value[name] instanceof reg)) {
              this.throwError(`${name}数据类型不匹配！`);
            }
          }
        }
      }
    });
  }
  static throwError (msg) {
    throw new Error(msg);
  }
}

export default Popicker;
