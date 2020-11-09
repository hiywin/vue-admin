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
    <div class="black-space-20"></div>
    <TableVue :config="data.tableConfig">
      <template v-slot:status="slotData">
        <el-switch
          v-model="slotData.data.name"
          active-color="#13ce66"
          inactive-color="#ff4949"
        ></el-switch>
      </template>
      <template v-slot:operation="slotData">
        <el-button size="mini" type="primary" @click="dataEdit(slotData.data)"
          >编辑</el-button
        >
        <el-button size="mini" type="danger" @click="dataDelete(slotData.data)"
          >删除</el-button
        >
      </template>
    </TableVue>
  </div>
</template>
<script>
import { reactive } from "@vue/composition-api";
import SelectVue from "@c/Select/index";
import TableVue from "@c/Table";
export default {
  name: "userIndex",
  components: { SelectVue, TableVue },
  setup() {
    const data = reactive({
      configOption: {
        init: ["name", "phone", "email"]
      },
      tableConfig: {
        selection: true,
        recordCheckbox: true,
        tHead: [
          { label: "邮箱", field: "email", width: "200" },
          { label: "真实姓名", field: "name" },
          { label: "手机号", field: "phone" },
          { label: "地址", field: "address" },
          { label: "角色", field: "role" },
          {
            label: "禁启用状态",
            field: "status",
            columnType: "slot",
            slotName: "status"
          },
          {
            label: "操作",
            field: "operation",
            columnType: "slot",
            slotName: "operation"
          }
        ]
      }
    });

    const dataEdit = row => {
      console.log(row);
    };

    const dataDelete = row => {
      console.log(row);
    };

    return {
      data,

      dataEdit,
      dataDelete
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
