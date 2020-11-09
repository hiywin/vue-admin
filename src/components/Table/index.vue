<template>
  <el-table :data="data.tableData" border style="width:100%">
    <!-- 多选框 -->
    <el-table-column
      v-if="data.tableConfig.selection"
      type="selection"
      width="50"
    ></el-table-column>
    <template v-for="item in data.tableConfig.tHead">
      <!-- v-slot插槽 -->
      <el-table-column
        :key="item.field"
        :prop="item.field"
        :label="item.label"
        :width="item.width"
        v-if="item.columnType === 'slot'"
      >
        <template slot-scope="scope">
          <slot :name="item.slotName" :data="scope.row"></slot>
        </template>
      </el-table-column>
      <!-- 文本数据渲染 -->
      <el-table-column
        :key="item.field"
        :prop="item.field"
        :label="item.label"
        :width="item.width"
        v-else
      ></el-table-column>
    </template>
  </el-table>
</template>
<script>
import { reactive, onBeforeMount } from "@vue/composition-api";
export default {
  name: "tableVue",
  props: {
    config: {
      Type: Object,
      default: () => {}
    }
  },
  setup(props) {
    const data = reactive({
      tableConfig: {
        // 多选框
        selection: false,
        // 翻页记录
        recordCheckbox: false,
        // 表头
        tHead: []
      },
      tableData: [
        {
          email: "12345@qq.com",
          name: "James",
          phone: 13100002222,
          address: "广东省",
          role: "管理员"
        },
        {
          email: "12345@qq.com",
          name: "James",
          phone: 13100002222,
          address: "广东省",
          role: "管理员"
        }
      ]
    });

    const initTableConfig = () => {
      let configData = props.config;
      for (let key in configData) {
        if (data.tableConfig[key] != null) {
          data.tableConfig[key] = configData[key];
        }
      }
    };

    // 页面挂载之前绑定表头
    onBeforeMount(() => {
      initTableConfig();
    });

    return {
      data
    };
  }
};
</script>
<style lang="scss" scoped></style>

<!--
v-slot 插槽
1、匿名插槽
2、具名插槽：指定插槽显示内容
3、作用域插槽：可以进行数据绑定，父子组件通讯
-->
