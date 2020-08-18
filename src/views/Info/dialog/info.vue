<template>
  <div>
    <el-dialog
      title="新增"
      :visible.sync="data.dialogVisible"
      width="30%"
      @close="dialogClose"
      @opened="dialogOpened"
    >
      <el-form :model="data.form" ref="categoryForm"
        ><el-form-item label="类别" :label-width="data.formLabelWidth">
          <el-select v-model="data.form.category" placeholder="请选择类别">
            <el-option
              v-for="item in data.categoryOption"
              :key="item.id"
              :label="item.category_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="标题"
          :label-width="data.formLabelWidth"
          prop="title"
        >
          <el-input
            v-model="data.form.title"
            placeholder="请输入标题"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="概况"
          :label-width="data.formLabelWidth"
          prop="content"
        >
          <el-input
            v-model="data.form.content"
            type="textarea"
            rows="5"
            placeholder="请输入概况"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-row>
          <el-col :span="8" :offset="4">
            <el-button @click="dialogClose">取 消</el-button>
          </el-col>
          <el-col :span="8">
            <el-button
              type="danger"
              @click="submit"
              :loading="data.submitLoading"
              >确 定</el-button
            >
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { reactive, watch } from "@vue/composition-api";
import { AddInfo } from "@/api/news";
export default {
  name: "dialogInfo",
  props: {
    flag: {
      type: Boolean,
      default: false
    },
    category: {
      type: Array,
      default: () => []
    }
  },
  setup(props, { root, emit, refs }) {
    const data = reactive({
      dialogVisible: false, //弹窗标记
      formLabelWidth: "70px", //文本宽度
      submitLoading: false, //按钮加载
      //表单数据
      form: {
        category: "",
        title: "",
        content: ""
      },
      categoryOption: [] //分类下拉
    });

    /**
     * 方法
     */
    const dialogClose = () => {
      data.dialogVisible = false;
      emit("close", false);
      refs.categoryForm.resetFields();
    };
    const dialogOpened = () => {
      data.categoryOption = props.category;
    };
    const submit = () => {
      if (!data.form.category || !data.form.title) {
        root.$message({
          message: "分类和标题不能为空!",
          type: "error"
        });
        return false;
      }
      let requestData = {
        categoryId: data.form.category,
        title: data.form.title,
        content: data.form.content,
        imgUrl: "https://cn.vuejs.org/images/logo.png",
        createDate: "2020-08-10 10:10:10"
      };
      data.submitLoading = true;
      AddInfo(requestData)
        .then(res => {
          if (res.data.resCode == 0) {
            root.$message({
              message: res.data.message,
              type: "success"
            });
            refs.categoryForm.resetFields();
            /**
             * 两种刷新数据方式
             * 1.查询接口
             * 2.直接做列表添加一条数据
             */
            emit("getListEmit");
            data.dialogVisible = false;
          } else {
            root.$message({
              message: res.data.message,
              type: "error"
            });
          }
          data.submitLoading = false;
        })
        .catch(err => {
          console.log(err);
          data.submitLoading = false;
        });
    };

    /**
     * 监听
     */
    watch(
      () => props.flag,
      newValue => {
        data.dialogVisible = newValue;
      }
    );

    return {
      data,
      // func
      dialogClose,
      dialogOpened,
      submit
    };
  }
};
</script>
<style lang="scss" scoped></style>
