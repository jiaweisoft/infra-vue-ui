import InfraCalendar from './src/infra-calendar';

InfraCalendar.install = function (Vue) {
  Vue.component(InfraCalendar.name, InfraCalendar);
};

export default InfraCalendar;
