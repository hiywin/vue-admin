import router from "./index";
import { getToken } from "@/utils/app";

const whiteRouter = ["/login"]; // 路由白名单
/**
 * 路由守卫，未登陆时自动跳转到登陆页
 */
router.beforeEach((to, from, next) => {
  if (getToken()) {
    next();
  } else {
    if (whiteRouter.indexOf(to.path) !== -1) {
      next();
    } else {
      next("/login");
    }
  }
  //   console.log(to); // 进入的页面（下一个页面）
  //   console.log(from); // 离开之前的页面（上一个页面）
  //   console.log(next);
  //   next(); // 为空时默认指向to页面，有参数时跳转到参数指向的页面
});
