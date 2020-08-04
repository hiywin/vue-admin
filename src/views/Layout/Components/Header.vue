<template>
  <div id="header-wrap">
    <div class="pull-left header-icon" @click="navMenuState">
      <svg-icon iconClass="menu" className="menu" />
    </div>
    <div class="pull-right">
      <div class="user-info pull-left">{{ userName }}</div>
      <div class="header-icon pull-left" @click="exit">
        <svg-icon iconClass="exit" className="exit" />
      </div>
    </div>
  </div>
</template>
<script>
import { computed } from "@vue/composition-api";
export default {
  name: "layoutHeader",
  setup(props, { root }) {
    /**
     * 菜单栏收缩展开状态更改
     */
    const navMenuState = () => {
      root.$store.commit("app/SET_COLLAPSE");
    };
    /**
     * 用户名显示
     */
    const userName = computed(() => root.$store.state.app.userName);
    /**
     * 退出登陆
     */
    const exit = () => {
      root.$store.dispatch("app/exit").then(() => {
        root.$router.push({
          name: "Login"
        });
      });
    };

    return {
      navMenuState,
      userName,
      exit
    };
  }
};
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
#header-wrap {
  position: fixed;
  top: 0;
  right: 0;
  left: $navMenu;
  height: $layoutHeader;
  background-color: #fff;
  @include webkit(box-shadow, 0 3px 16px 0 rgba(0, 0, 0, 0.1));
  @include webkit(transition, all 0.3s ease 0s);
  line-height: 55px;
}
.header-icon {
  padding: 0 22px;
  svg {
    margin-bottom: -8px;
    font-size: 25px;
    color: #344a5f;
    cursor: pointer;
  }
}
.user-info {
  height: 100%;
  padding: 0 22px;
  border-right: 1px solid #ededed;
  + .header-icon {
    padding: 0 28px;
  }
}
.open {
  #header-wrap {
    left: $navMenu;
  }
}
.close {
  #header-wrap {
    left: $navMenuMin;
  }
}
</style>
