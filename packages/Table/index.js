/**
 * Created by mapbar_front on 2019-06-12.
 */
import InfraTable from './src/infra-table';

InfraTable.install = function (Vue) {
  Vue.component(InfraTable.name, InfraTable);
};

export default InfraTable;
