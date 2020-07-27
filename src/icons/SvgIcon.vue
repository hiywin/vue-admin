<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>
<script>
import { computed } from "@vue/composition-api";
export default {
  name: "svgIcon",
  // props: ["iconClass", "className"],
  props: {
    iconClass: {
      type: String, // 定义接收的值类型
      default: "" // 默认值
      // required: true, //是否必填
      // validator: () => {
      //   //校验规则，验证传入的值是否符合规则
      // }
    },
    className: {
      type: String,
      default: ""
    }
  },

  setup(props) {
    const iconName = computed(() => `#icon-${props.iconClass}`);
    const svgClass = computed(() => {
      if (props.className) {
        return `svg-icon ${props.className}`;
      } else {
        return "svg-icon";
      }
    });

    return {
      iconName,
      svgClass
    };
  }
};
</script>
<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  color: #fff;
  &.font12 {
    font-size: 12px;
  }
  &.font20 {
    font-size: 12px;
  }
}
</style>
