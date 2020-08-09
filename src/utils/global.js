import { MessageBox } from "element-ui";
// import { ref } from "@vue/composition-api";

export function global() {
  const confirm = params => {
    MessageBox.confirm(params.content, params.tips || "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: params.type || "warning",
      center: true
    })
      .then(() => {
        // 点击确定后
        params.fn && params.fn();
      })
      .catch(() => {
        // 点击取消后
        params.catchFn && params.catchFn();
      });
  };

  return {
    confirm
  };
}
