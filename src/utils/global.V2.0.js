import { MessageBox, Message } from "element-ui";
/**
 * 向vue原型注入方法
 * 需在main.js中自定义全局方法
 * import global from "@/utils/global.js";
 * Vue.use(global);
 */

export default {
  install(Vue, options) {
    Vue.prototype.confirm = params => {
      MessageBox.confirm(params.content, params.tips || "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: params.type || "warning",
        center: true
      })
        .then(() => {
          params.fn && params.fn();
        })
        .catch(() => {
          Message({
            type: "info",
            message: "已取消删除"
          });
        });
    };
  }
};
