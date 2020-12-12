/**
 * Created by mapbar_front on 2019-06-05.
 */
import Vue from 'vue';
import Message from './PreviewImage.vue';

let seed = 1;
let MessageConstructor = Vue.extend(Message);

function PreviewImage (options) {
  let instance = new MessageConstructor({
    data: options
  });
  instance.id = 'previewImage__' + seed++;
  instance.vm = instance.$mount();
  document.body.appendChild(instance.vm.$el);
  return instance.vm;
}

PreviewImage.info = function (src) {
  if (typeof src === 'string') {
    return PreviewImage({
      imageSrc: src
    });
  }
};

export default PreviewImage;
