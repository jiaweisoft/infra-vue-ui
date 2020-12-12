/**
 * Created by mapbar_front on 2019-06-14.
 */
import InfraPagination from './src/infra-pagination';

InfraPagination.install = function (Vue) {
  Vue.component(InfraPagination.name, InfraPagination);
};

export default InfraPagination;
