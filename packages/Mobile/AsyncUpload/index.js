/**
 * Created by kaola on 2019-07-11.
 */
import AsyncUpload from './src/AsyncUpload';

AsyncUpload.install = function (Vue) {
  Vue.component(AsyncUpload.name, AsyncUpload);
};

export default AsyncUpload;
