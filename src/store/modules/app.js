import { Login } from "@/api/login";
const state = {
  isCollapse: JSON.parse(sessionStorage.getItem("isCollapse")) || false
};
const getters = {};

const mutations = {
  // 专注于修改state，理论上是修改state的唯一路径
  /**
   * 菜单栏收缩展开状态更改
   */
  SET_COLLAPSE(state) {
    state.isCollapse = !state.isCollapse;
    sessionStorage.setItem("isCollapse", JSON.stringify(state.isCollapse));
  }
};

const actions = {
  // 改变状态，最后通过mutation提交.主要处理业务代码、异步请求
  /**
   * 登陆接口异步调用
   */
  login(content, resquestData) {
    return new Promise((resolve, reject) => {
      Login(resquestData)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
