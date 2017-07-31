import * as types from "../mutation-type";
import { setLocalStore, getLocalStore, removeLocalStore } from "utils/utils";

export default {
  state: {
    sidebarStatus: ((getLocalStore("sidebarStatus")===null?"true":getLocalStore("sidebarStatus")) == "true")
  },

  mutations: {
    [types.TOGGLE_SIDEBAR]: state => {
        console.log(state.sidebarStatus);
      state.sidebarStatus = !state.sidebarStatus;
      setLocalStore('sidebarStatus',state.sidebarStatus);
    }
  },

  actions: {
      ToggleSidebar({commit}){
        console.log(11);
        commit(types.TOGGLE_SIDEBAR);
      }
  }
};
