import Raven from "raven-js";
import RavenVue from "raven-js/plugins/vue";
import Log from 'utils/log';

export default {
  /**
     * Raven.js 日志记录插件
     * Doc:https://docs.sentry.io/clients/javascript/usage/
     * @param {*} Vue 
     * @param {Object} options 
     */
  install(Vue, options = {}) {
    Raven.config("https://a11bf0fde63c4e87b7e100d71dd64715@sentry.io/198541")
      .addPlugin(RavenVue, Vue)
      .install();

    Raven.setUserContext({
      user: options.user || ""
    });

    Raven.setTagsContext({ environment: options.env });

    Object.defineProperties(Vue.prototype, {
      $log: { value: Log, writable: true }
    });
  }
};
