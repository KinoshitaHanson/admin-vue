import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';

import authority from './modules/authority';
import user from './modules/user';


Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    authority,
    user
  },
  getters
});

export default store;
