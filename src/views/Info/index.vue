<template>
  <div>
    <!-- 查询块 -->
    <el-row :gutter="15">
      <el-col :span="4">
        <div class="label-wrap category">
          <label for="">类别：</label>
          <div class="wrap-content">
            <el-select
              v-model="category_value"
              placeholder="请选择"
              style="width:100%"
            >
              <el-option
                v-for="item in options.category"
                :key="item.id"
                :label="item.category_name"
                :value="item.id"
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
      <el-col :span="4">
        <el-input
          v-model="search_keywork"
          placeholder="请输入内容"
          style="width:100%"
        ></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="danger" style="width:90%">搜索</el-button>
      </el-col>
      <el-col :span="2">
        <el-button
          type="danger"
          class="pull-right"
          style="width:90%"
          @click="dialog_visible = true"
          >新增</el-button
        >
      </el-col>
    </el-row>
    <!-- 数据表格 -->
    <div class="black-space-20"></div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column
        type="selection"
        width="45"
        fixed="left"
      ></el-table-column>
      <el-table-column prop="title" label="标题"> </el-table-column>
      <el-table-column
        prop="category"
        label="类别"
        width="130"
      ></el-table-column>
      <el-table-column prop="date" label="日期" width="200"> </el-table-column>
      <el-table-column prop="user" label="管理员" width="150">
      </el-table-column>
      <el-table-column label="操作" width="180" fixed="right">
        <template>
          <el-button type="success" size="mini" @click="dialog_visible = true"
            >编辑</el-button
          >
          <el-button type="danger" size="mini" @click="deleteItem"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 底部分页 -->
    <div class="black-space-20"></div>
    <el-row style="width:100%">
      <el-col :span="5">
        <el-button @click="deleteAll">批量删除</el-button>
      </el-col>
      <el-col :span="19">
        <el-pagination
          class="pull-right"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 50, 100, 1000]"
          layout="total,sizes,prev,pager,next,jumper"
          :total="1000"
        >
        </el-pagination>
      </el-col>
    </el-row>
    <!-- 新增弹窗 -->
    <!-- 使用修饰器写法 <DialogInfo :flag.sync="dialog_visible" />  -->
    <DialogInfo
      :flag="dialog_visible"
      @close="dialogClose"
      :category="options.category"
    />
  </div>
</template>
<script>
import DialogInfo from "./dialog/info";
import { ref, reactive, onMounted } from "@vue/composition-api";
import { global } from "@/utils/global";
// import { common } from "@/api/common";
export default {
  name: "infoIndex",
  components: { DialogInfo },
  setup(props, { root }) {
    /**
     *  数据
     */
    const { confirm } = global();
    // const { getInfoCategory, category } = common();
    const dialog_visible = ref(false);
    const category_value = ref("");
    const date_value = ref("");
    const select_keywork = ref("id");
    const search_keywork = ref("");
    const options = reactive({
      category: []
    });
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
    const tableData = reactive([
      {
        title:
          "习近平向黎巴嫩总统奥恩致慰问电习近平向黎巴嫩总统奥恩致慰问电习近平向黎巴嫩总统奥恩致慰问电",
        category: "国内新闻",
        date: "2016-05-02 10:12:22",
        user: "王小虎"
      },
      {
        title: "习近平向黎巴嫩总统奥恩致慰问电",
        category: "国内新闻",
        date: "2016-05-02 10:12:22",
        user: "王小虎"
      },
      {
        title: "习近平向黎巴嫩总统奥恩致慰问电",
        category: "国内新闻",
        date: "2016-05-02 10:12:22",
        user: "王小虎"
      },
      {
        title: "习近平向黎巴嫩总统奥恩致慰问电",
        category: "国内新闻",
        date: "2016-05-02 10:12:22",
        user: "王小虎"
      }
    ]);

    /**
     * 方法
     */
    const handleSizeChange = value => {
      console.log(value);
    };
    const handleCurrentChange = value => {
      console.log(value);
    };
    const dialogClose = () => {
      dialog_visible.value = false;
    };
    const deleteItem = () => {
      confirm({
        content: "确认删除当前信息，确认后将无法恢复！",
        tips: "警告",
        fn: comfirmDelete
      });
    };
    const deleteAll = () => {
      confirm({
        content: "确认删除选择的信息，确认后将无法恢复！",
        type: "success"
      });
    };
    const comfirmDelete = () => {
      console.log("删除111111");
    };
    const getCategory = () => {
      root.$store
        .dispatch("common/getInfoCategory")
        .then(res => {
          options.category = res;
        })
        .catch(err => {
          console.log(err);
        });
    };

    /**
     * 生命周期
     */
    onMounted(() => {
      // getInfoCategory();
      getCategory();
    });
    // watch(
    //   () => category.item,
    //   value => {
    //     options.category = value;
    //   }
    // );

    return {
      // ref
      dialog_visible,
      category_value,
      date_value,
      select_keywork,
      search_keywork,
      // reactive
      options,
      keyOptions,
      tableData,
      // methods
      handleSizeChange,
      handleCurrentChange,
      dialogClose,
      deleteItem,
      deleteAll
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
