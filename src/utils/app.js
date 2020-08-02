import Cookie from "cookie_js";
/**
 * 获取后台管理系统token
 */
export function getToken() {
  return Cookie.get("admin_token");
}
