import { Login } from "api";
import * as types from "../mutation-type";
import { setLocalStore, getLocalStore,removeLocalStore } from "utils/utils";

export default {
  state: {
    workId: "",
    adminId: "",
    name: getLocalStore("name")||'',
    token: getLocalStore("token"),
    roles: JSON.parse(getLocalStore('roles'))||[]
  },
  mutations: {
    [types.SET_TOKEN](state, token) {
      state.token = token;
      setLocalStore("token", token);
    },
    [types.SET_NAME](state, name) {
      state.name = name;
      setLocalStore("name", name);
    },
    [types.SET_ROLE](state, role) {
      state.roles.push(role);
      setLocalStore("roles", JSON.stringify(state.roles));
    },
    [types.SET_USERID](state, workId, adminId) {
      state.workId = workId;
      state.adminId = adminId;
    },
    [types.CLEAR_USER_INFO](state){
      state.token = '';
      state.name = '';
      state.roles=[];
      state.workId = '';
      state.adminId = '';
      removeLocalStore('token');
      removeLocalStore('name');
      removeLocalStore('roles');
    }
  },
  actions: {
    UserLogin({ commit }, userInfo) {
      return new Promise(async (resolve, reject) => {
        try {
          let param = {
            username: userInfo.account.trim(),
            password: userInfo.pwd
          };
          let res = await Login(param);
          if (res.result) {
            commit(types.SET_NAME, res.data.name);
            commit(types.SET_TOKEN, res.data.token);
            commit(types.SET_ROLE, res.data.role);
            commit(types.SET_USERID, res.data.workId, res.data.adminId);
            resolve();
          } else {
            reject(res.message);
          }
        } catch (error) {
          reject(error);
        }
      });
    }
  }
};
