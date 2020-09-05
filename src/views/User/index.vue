<template>
  <div>
    <el-row>
      <el-col :span="22">
        <div class="label-wrap">
          <label>关键字：</label>
          <div class="wrap-content">
            <el-row :gutter="16">
              <el-col :span="4">
                <SelectVue :config="data.configOption" />
              </el-col>
              <el-col :span="4">
                <el-input placeholder="请输入搜索的关键字"></el-input>
              </el-col>
              <el-col :span="14">
                <el-button type="danger">搜 索</el-button>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
      <el-col :span="2">
        <el-button type="danger">添加用户</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { reactive } from "@vue/composition-api";
import SelectVue from "@c/Select/index";
export default {
  name: "userIndex",
  components: { SelectVue },
  setup() {
    const data = reactive({
      configOption: {
        init: ["name", "phone", "email"]
      }
    });

    return {
      data
    };
  }
};
</script>
<style lang="scss" scoped>
@import "../../styles/config.scss";
.label-wrap {
  @include labelDom(left, 50, 30);
}
</style>
