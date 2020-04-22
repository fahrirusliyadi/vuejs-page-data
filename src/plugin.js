import PageData from './page-data';
import { makeProxy } from './proxy';
import { makeMixin } from './mixin';

export default {
  install(Vue, options) {
    const pageData = new PageData(options.initialData);
    const proxy = makeProxy(pageData);
    const mixin = makeMixin(pageData);

    Vue.prototype.$pageData = proxy;
    Vue.mixin(mixin);
  },
};
