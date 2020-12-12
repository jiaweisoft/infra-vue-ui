import InfraBubble from './src/infra-bubble';

InfraBubble.install = function (Vue) {
  Vue.component(InfraBubble.name, InfraBubble);
};

export default InfraBubble;
