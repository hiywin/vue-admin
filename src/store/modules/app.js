import { Login } from "@/api/login";
import { setToken, setUserName, getUserName } from "@/utils/app";
const state = {
  isCollapse: JSON.parse(sessionStorage.getItem("isCollapse")) || false,
  token: "",
  userName: getUserName() || ""
};
const getters = {
  isCollapse: state => state.isCollapse,
  userName: state => state.userName
};

const mutations = {
  // 专注于修改state，理论上是修改state的唯一路径
  /**
   * 菜单栏收缩展开状态更改
   */
  SET_COLLAPSE(state) {
    state.isCollapse = !state.isCollapse;
    sessionStorage.setItem("isCollapse", JSON.stringify(state.isCollapse));
  },
  /**
   * 设置token
   */
  SET_TOKEN(state, value) {
    state.token = value;
  },
  /**
   * 设置用户名
   */
  SET_USERNAME(state, value) {
    state.userName = value;
  }
};

const actions = {
  // 改变状态，最后通过mutation提交.主要处理业务代码、异步请求
  /**
   * 登陆接口异步调用
   */
  login({ commit }, resquestData) {
    return new Promise((resolve, reject) => {
      Login(resquestData)
        .then(response => {
          let data = response.data.data;
          commit("SET_TOKEN", data.token);
          commit("SET_USERNAME", data.username);
          setToken(data.token);
          setUserName(data.username);
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
