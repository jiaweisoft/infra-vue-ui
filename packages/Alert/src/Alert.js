/**
 * Created by mapbar_front on 2019-03-01.
 */
import Vue from 'vue';
import Message from './Alert.vue';

let seed = 1;
let MessageConstructor = Vue.extend(Message);

function AlertMessage (options) {
  let instance = new MessageConstructor({
    data: options
  });
  instance.id = 'alert__' + seed++;
  instance.vm = instance.$mount();
  document.body.appendChild(instance.vm.$el);
  return instance.vm;
}

AlertMessage.info = function (msg) {
  if (typeof msg === 'string') {
    return AlertMessage({
      message: msg
    });
  }
};

export default AlertMessage;
