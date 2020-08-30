<template>
  <el-form ref="detailForm" :model="data.detalForm">
    <el-form-item label="标题：">
      <el-input v-model="data.detailForm.title"></el-input>
    </el-form-item>
    <el-form-item label="类别：">
      <el-select v-model="data.detailForm.category_id">
        <el-option
          v-for="item in data.categorys"
          :key="item.id"
          :label="item.category_name"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>
<script>
import { reactive, onMounted } from "@vue/composition-api";
export default {
  name: "infoDetail",
  setup(props, { root }) {
    const data = reactive({
      detailForm: {
        title: "",
        category_id: ""
      },

      categorys: []
    });

    // 获取信息分类
    const getInfoCategory = () => {
      root.$store
        .dispatch("common/getInfoCategory")
        .then(res => {
          console.log(res);
          data.categorys = res;
        })
        .catch(err => {
          console.log(err);
        });
    };

    onMounted(() => {
      getInfoCategory();
    });

    return {
      data
    };
  }
};
</script>
<style lang="scss" scoped></style>
