/**
 * Created by mapbar_front on 2019-06-06.
 */

import Vue from 'vue';
import Message from './MobileMessageBox.vue';
const defaultOptions = {
  content: '提示内容',
  type: 'alert'
};
let seed = 1;
let MessageConstructor = Vue.extend(Message);

function MobileMessageBox (options = defaultOptions) {
  let data = {};
  for (let i in options) {
    data[i] = options[i];
  };
  let instance = new MessageConstructor({
    data
  });
  instance.id = 'alert__' + seed++;
  instance.vm = instance.$mount();
  document.body.appendChild(instance.vm.$el);
  return instance.vm;
}

MobileMessageBox.alert = function (title, content, options) {
  let data = {};
  let args = Array.prototype.slice.call(arguments);
  if (!args.length) {
    throw new Error('arguments is null');
  }
  if (args.length === 1) {
    data.content = args[0];
  }
  if (args.length >= 2) {
    data.content = args[0];
    for (let i in args[1]) {
      data[i] = args[1][i];
    }
  }
  data.type = 'alert';
  return MobileMessageBox(data);
};

MobileMessageBox.confirm = function (title, content, options) {
  let data = {};
  let args = Array.prototype.slice.call(arguments);
  if (!args.length) {
    throw new Error('arguments is null');
  }
  if (args.length === 1) {
    data.content = args[0];
  }
  if (args.length >= 2) {
    data.content = args[0];
    for (let i in args[1]) {
      data[i] = args[1][i];
    }
  }
  data.type = 'confirm';
  return MobileMessageBox(data);
};

export default MobileMessageBox;
