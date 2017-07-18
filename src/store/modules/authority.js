import * as types from '../mutation-type';
import { defaultMap, asyncMap } from '../../router/router-map';

export default {
  state: {
    routes: [],
    routesAdd: [],
  },
  mutations: {
    [types.SET_ROUTES](state, routes) {
      state.routesAdd = asyncMap;
      state.routes = defaultMap.concat(asyncMap);
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit(types.SET_ROUTES, asyncMap);
        resolve();
      }).catch(() => { })
      // commit(types.SET_ROUTES, asyncMap);

    }
  }
}
