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
        <el-button type="success" class="pull-right" style="100%"
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
          <el-button type="danger" size="mini">删除</el-button>
          <el-button type="success" size="mini">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 底部分页 -->
    <div class="black-space-20"></div>
    <el-row style="width:100%">
      <el-col :span="5">
        <el-button>批量删除</el-button>
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
        label: "国内新闻"
      },
      {
        value: 2,
        label: "国际新闻"
      },
      {
        value: 3,
        label: "体育新闻"
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

    // 事件
    const handleSizeChange = value => {
      console.log(value);
    };
    const handleCurrentChange = value => {
      console.log(value);
    };

    return {
      category_value,
      options,
      date_value,
      select_keywork,
      keyOptions,
      search_keywork,
      tableData,
      handleSizeChange,
      handleCurrentChange
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
