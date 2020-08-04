import Cookie from "cookie_js";

const adminToken = "admin_token";
const userName = "user_name";
/**
 * 获取后台管理系统token
 */
export function getToken() {
  return Cookie.get(adminToken);
}
/**
 * 设置token
 */
export function setToken(token) {
  return Cookie.set(adminToken, token);
}
/**
 * 删除token
 */
export function removeToken() {
  return Cookie.remove(adminToken);
}
/**
 * 添加用户名至cookie
 */
export function setUserName(value) {
  return Cookie.set(userName, value);
}
/**
 * 获取用户名
 */
export function getUserName() {
  return Cookie.get(userName);
}
/**
 * 删除用户名
 */
export function removeUserName() {
  return Cookie.remove(userName);
}
