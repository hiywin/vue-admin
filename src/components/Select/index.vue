<template>
  <el-select v-model="data.selectValue" placeholder="请选择">
    <el-option
      v-for="item in data.initOptions"
      :key="item.value"
      :value="item.value"
      :label="item.label"
    >
    </el-option>
  </el-select>
</template>
<script>
import { reactive, onMounted } from "@vue/composition-api";
export default {
  name: "selectCompenent",
  props: {
    config: {
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    const data = reactive({
      selectValue: "",
      initOptions: [],
      options: [
        { label: "姓名", value: "name" },
        { label: "手机号", value: "phone" },
        { label: "邮箱", value: "email" },
        { label: "ID", value: "id" },
        { label: "标题", value: "title" }
      ]
    });

    // 初始化下拉选择
    let initOption = () => {
      let initDta = props.config.init;
      if (initDta.length === 0) {
        return false;
      }
      let optionArr = [];
      initDta.forEach(item => {
        let arr = data.options.filter(p => p.value == item);
        if (arr.length > 0) {
          optionArr.push(arr[0]);
        }
      });
      // 数据校验
      if (optionArr.length === 0) {
        return false;
      }
      // 初始化赋值
      data.initOptions = optionArr;
      // 默认选择第一个
      data.selectValue = optionArr[0].value;
    };

    // 页面挂载完成时的操作
    onMounted(() => {
      initOption();
    });

    return {
      data
    };
  }
};
</script>
<style lang="scss" scoped></style>
