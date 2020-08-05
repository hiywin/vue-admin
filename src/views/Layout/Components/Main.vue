<template>
  <div id="main-wrap">
    <div class="main-content">
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";
#main-wrap {
  height: 100vh;
  // position: fixed;
  // left: $navMenu;
  // top: 75px;
  // right: 0;
  // bottom: 0;
  // border: 30px solid #f7f7f7;
  // border-bottom: none;
  // -webkit-box-sizing: border;
}
.main-content {
  width: 100%;
  height: 100%;
  padding-top: $layoutHeader + 10;
  padding-right: 10px;
  @include webkit(box-sizing, border-box);
  @include webkit(transition, all 0.3s ease 0s);
}
.content {
  width: 100%;
  height: 100%;
  padding: 20px 20px 0 20px;
  @include webkit(box-sizing, border-box);
  background-color: #fff;
}
.open {
  .main-content {
    padding-left: $navMenu + 10;
  }
}
.close {
  .main-content {
    padding-left: $navMenuMin + 10;
  }
}
</style>
