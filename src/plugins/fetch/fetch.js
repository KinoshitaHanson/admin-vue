import fetch from 'utils/fetch';

export default {
  install: function (Vue, options) {
    Object.defineProperties(Vue.prototype, { '$fetch': { value: fetch, writable: true } });
    // Vue.prototype.$fetch = service;
  }
}
