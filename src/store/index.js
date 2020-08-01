import Vue from "vue";
import Vuex from "vuex";
import Cookie from "cookie_js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isCollapse: JSON.parse(Cookie.get("isCollapse")) || false
  },
  getters: {},
  mutations: {
    /**
     * 菜单栏收缩展开状态更改
     */
    SET_COLLAPSE(state) {
      state.isCollapse = !state.isCollapse;
      // HTML5 本地存储
      Cookie.set("isCollapse", JSON.stringify(state.isCollapse));
    }
  },
  actions: {},
  modules: {}
});
