<template>
  <div>
    <el-dialog
      title="新增"
      :visible.sync="dialogVisible"
      width="30%"
      @close="dialogClose"
      @opened="dialogOpened"
    >
      <el-form :model="form"
        ><el-form-item label="类别" :label-width="formLabelWidth">
          <el-select v-model="form.category" placeholder="请选择类别">
            <el-option
              v-for="item in categoryOption.item"
              :key="item.id"
              :label="item.category_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="概况" :label-width="formLabelWidth">
          <el-input
            v-model="form.content"
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
            <el-button type="danger" @click="submit">确 定</el-button>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { ref, reactive, watch } from "@vue/composition-api";
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
  setup(props, { root, emit }) {
    /**
     * ref数据
     */
    const dialogVisible = ref(false);
    const formLabelWidth = ref("70px");

    /**
     * reactive数据
     */
    const form = reactive({
      category: "",
      title: "",
      content: ""
    });
    const categoryOption = reactive({
      item: []
    });

    /**
     * 方法
     */
    const dialogClose = () => {
      dialogVisible.value = false;
      emit("close", false);
    };
    const dialogOpened = () => {
      categoryOption.item = props.category;
    };
    const submit = () => {
      let requestData = {
        categoryId: form.category,
        title: form.title,
        content: form.content,
        imgUrl: "https://cn.vuejs.org/images/logo.png",
        createDate: "2020-08-10 10:10:10"
      };
      console.log(requestData);
      AddInfo(requestData)
        .then(res => {
          if (res.data.resCode == 0) {
            root.$message({
              message: res.data.message,
              type: "success"
            });
          } else {
            root.$message({
              message: res.data.message,
              type: "error"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    };

    /**
     * 监听
     */
    watch(
      () => props.flag,
      newValue => {
        dialogVisible.value = newValue;
      }
    );

    return {
      // ref
      dialogVisible,
      formLabelWidth,
      // reactive
      form,
      categoryOption,
      // func
      dialogClose,
      dialogOpened,
      submit
    };
  }
};
</script>
<style lang="scss" scoped></style>
