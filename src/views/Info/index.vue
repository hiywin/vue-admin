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
            <SelectVue :config="data.configOption" />
            <!-- <el-select
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
            </el-select> -->
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
        <el-button type="danger" style="width:90%" @click="getList"
          >搜索</el-button
        >
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
    <el-table
      :data="tableData.item"
      border
      style="width: 100%"
      v-loading="loadingData"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="45"
        fixed="left"
        prop="categoryId"
      ></el-table-column>
      <el-table-column prop="title" label="标题"> </el-table-column>
      <el-table-column
        prop="categoryName"
        label="类别"
        width="130"
        :formatter="toCategory"
      ></el-table-column>
      <el-table-column
        prop="createDate"
        label="日期"
        width="200"
        :formatter="toDate"
      ></el-table-column>
      <!-- <el-table-column prop="user" label="管理员" width="150">
      </el-table-column> -->
      <el-table-column label="操作" width="240" fixed="right">
        <template slot-scope="scope">
          <el-button type="success" size="mini" @click="dialog_visible = true"
            >编辑</el-button
          >
          <router-link
            :to="{ name: 'InfoDetail', query: { id: scope.row.id } }"
            class="margin-left-10"
          >
            <el-button type="success" size="mini">编辑详情</el-button>
          </router-link>
          <el-button
            type="danger"
            size="mini"
            class="margin-left-10"
            @click="deleteItem(scope.row.id)"
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
          :total="total"
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
      @getListEmit="getList"
    />
  </div>
</template>
<script>
import DialogInfo from "./dialog/info";
import { ref, reactive, onMounted } from "@vue/composition-api";
import { global } from "@/utils/global";
import { GetList, DeleteInfo } from "@/api/news";
import { formatDate } from "@/utils/common";
import SelectVue from "@c/Select/index";
export default {
  name: "infoIndex",
  components: { DialogInfo, SelectVue },
  setup(props, { root }) {
    /**
     *  数据
     */
    const { confirm } = global();
    const dialog_visible = ref(false);
    const category_value = ref("");
    const date_value = ref("");
    const select_keywork = ref("id");
    const search_keywork = ref("");
    const total = ref(0);
    const loadingData = ref(false);
    const deleteInfoId = ref("");
    const data = reactive({ configOption: ["id", "title"] });
    const options = reactive({
      category: []
    });
    // const keyOptions = reactive([
    //   {
    //     value: "id",
    //     label: "ID"
    //   },
    //   {
    //     value: "title",
    //     label: "标题"
    //   }
    // ]);
    const tableData = reactive({
      item: []
    });
    const page = reactive({
      pageNumber: 1,
      pageSize: 10
    });

    /**
     * 方法
     */
    const handleSizeChange = value => {
      page.pageSize = value;
      getList();
    };
    const handleCurrentChange = value => {
      page.pageNumber = value;
      getList();
    };
    const dialogClose = () => {
      dialog_visible.value = false;
    };
    const deleteItem = id => {
      deleteInfoId.value = [id];
      confirm({
        content: "确认删除当前信息，确认后将无法恢复！",
        tips: "警告",
        fn: comfirmDelete
      });
    };
    const deleteAll = () => {
      if (!deleteInfoId.value || deleteInfoId.value.length == 0) {
        root.$message({
          message: "请选择需要删除的数据！",
          type: "error"
        });
        return false;
      }
      confirm({
        content: "确认删除选择的信息，确认后将无法恢复！",
        tips: "警告",
        fn: comfirmDelete
      });
    };
    const comfirmDelete = () => {
      DeleteInfo({ id: deleteInfoId.value })
        .then(res => {
          deleteInfoId.value = "";
          root.$message({
            message: res.data.message,
            type: "success"
          });
          getList();
        })
        .catch(err => {
          console.log(err);
        });
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
    const formatData = () => {
      let requestData = {
        pageNumber: page.pageNumber,
        pageSize: page.pageSize
      };
      // 判断分类
      if (category_value.value) {
        requestData.categoryId = category_value.value;
      }
      // 日期
      if (date_value.value.length > 0) {
        requestData.startTime = date_value.value[0];
        requestData.endTime = date_value.value[1];
      }
      // 关键字
      if (search_keywork.value) {
        requestData[select_keywork.value] = search_keywork.value;
      }
      return requestData;
    };
    const getList = () => {
      let requestData = formatData();
      if (loadingData.value) {
        return false;
      }
      loadingData.value = true;
      GetList(requestData)
        .then(res => {
          let data = res.data.data;
          tableData.item = data.data;
          total.value = data.total;
          loadingData.value = false;
        })
        .catch(err => {
          loadingData.value = false;
          console.log(err);
        });
    };
    const toDate = row => {
      return formatDate(row.createDate);
    };
    const toCategory = row => {
      let categoryId = row.categoryId;
      let categoryData = options.category.filter(p => p.id == categoryId)[0];
      if (!categoryData) {
        return "";
      }
      return categoryData.category_name;
    };
    const handleSelectionChange = rows => {
      let ids = rows.map(p => p.id); // map映射数据
      deleteInfoId.value = ids;
    };

    /**
     * 生命周期
     */
    onMounted(() => {
      getCategory();
      getList();
    });

    return {
      // ref
      dialog_visible,
      category_value,
      date_value,
      select_keywork,
      search_keywork,
      total,
      loadingData,
      // reactive
      data,
      options,
      // keyOptions,
      tableData,
      // methods
      handleSizeChange,
      handleCurrentChange,
      dialogClose,
      deleteItem,
      deleteAll,
      toDate,
      toCategory,
      handleSelectionChange,
      getList
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
