<template>
  <div>
    <el-row :gutter="15">
      <el-col :span="4">
        <div class="label-wrap category">
          <label for="">类型：</label>
          <div class="wrap-content">
            <el-select
              v-model="category_value"
              placeholder="请选择"
              style="width:100%"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="9">
        <div class="label-wrap date">
          <label for="">日期：&nbsp;&nbsp;</label>
          <div class="wrap-content">
            <el-date-picker
              style="width:100%"
              v-model="date_value"
              type="datetimerange"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd HH:mm:ss"
              align="left"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00', '08:00:00']"
            >
            </el-date-picker>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="label-wrap key-work">
          <label for="">关键字：&nbsp;&nbsp;</label>
          <div class="wrap-content">
            <el-select
              v-model="select_keywork"
              placeholder="请选择"
              style="width:100%"
            >
              <el-option
                v-for="item in keyOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <el-input
          v-model="search_keywork"
          placeholder="请输入内容"
          style="width:100%"
        ></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="danger" style="width:100%">搜索</el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="danger" class="pull-right" style="100%"
          >新增</el-button
        >
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { ref, reactive } from "@vue/composition-api";
export default {
  name: "infoIndex",
  setup() {
    const category_value = ref("");
    const date_value = ref("");
    const select_keywork = ref("id");
    const search_keywork = ref("");
    const options = reactive([
      {
        value: 1,
        label: "类型01"
      },
      {
        value: 2,
        label: "类型02"
      },
      {
        value: 3,
        label: "类型03"
      }
    ]);
    const keyOptions = reactive([
      {
        value: "id",
        label: "ID"
      },
      {
        value: "title",
        label: "标题"
      }
    ]);

    return {
      category_value,
      options,
      date_value,
      select_keywork,
      keyOptions,
      search_keywork
    };
  }
};
</script>
<style lang="scss" scoped>
@import "../../styles/config.scss";
.label-wrap {
  &.category {
    @include labelDom(left, 40, 30);
  }
  &.date {
    @include labelDom(left, 40, 30);
  }
  &.key-work {
    @include labelDom(left, 50, 30);
  }
}
</style>
