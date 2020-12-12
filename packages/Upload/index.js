/**
 * Created by mapbar_front on 2019-06-04.
 */
import InfraUpload from './src/infra-upload';

InfraUpload.install = function (Vue) {
  Vue.component(InfraUpload.name, InfraUpload);
};

export default InfraUpload;
