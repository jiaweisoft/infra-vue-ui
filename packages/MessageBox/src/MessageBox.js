/**
 * Created by mapbar_front on 2019-06-06.
 */

import Vue from 'vue';
import Message from './MessageBox.vue';
const defaultOptions = {
  title: '提示信息！',
  content: '提示内容',
  type: 'alert'
};
let seed = 1;
let MessageConstructor = Vue.extend(Message);

function MessageBox (options = defaultOptions) {
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

MessageBox.alert = function (title, content, options) {
  let data = {};
  let args = Array.prototype.slice.call(arguments);
  if (!args.length) {
    throw new Error('arguments is null');
  }
  if (args.length === 1) {
    data.title = '提示信息！';
    data.content = args[0];
  }
  if (args.length === 2) {
    data.title = args[0];
    data.content = args[1];
  }
  if (args.length >= 3) {
    data.title = args[0];
    data.content = args[1];
    for (let i in args[2]) {
      data[i] = args[2][i];
    }
  }
  data.type = 'alert';
  return MessageBox(data);
};

MessageBox.confirm = function (title, content, options) {
  let data = {};
  let args = Array.prototype.slice.call(arguments);
  if (!args.length) {
    throw new Error('arguments is null');
  }
  if (args.length === 1) {
    data.title = '提示信息！';
    data.content = args[0];
  }
  if (args.length === 2) {
    data.title = args[0];
    data.content = args[1];
  }
  if (args.length >= 3) {
    data.title = args[0];
    data.content = args[1];
    for (let i in args[2]) {
      data[i] = args[2][i];
    }
  }
  data.type = 'confirm';
  return MessageBox(data);
};

export default MessageBox;
