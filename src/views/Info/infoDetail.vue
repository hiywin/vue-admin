<template>
  <el-form
    ref="detailForm"
    :model="data.detailForm"
    :label-width="data.formLabelWidth"
  >
    <el-form-item label="信息分类：">
      <el-select v-model="data.detailForm.categoryId">
        <el-option
          v-for="item in data.categorys"
          :key="item.id"
          :label="item.category_name"
          :value="item.id"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="新闻标题：">
      <el-input v-model="data.detailForm.title" prop="title"></el-input>
    </el-form-item>
    <el-form-item label="缩略图：">
      缩略图
    </el-form-item>
    <el-form-item label="发布日期：">
      <el-date-picker
        v-model="data.detailForm.createDate"
        type="date"
        placeholder="选择日期"
        disabled=""
      ></el-date-picker>
    </el-form-item>
    <el-form-item label="详细内容：">
      <quillEditor
        v-model="data.detailForm.content"
        ref="myQuillEditor"
        :options="data.editorOption"
      ></quillEditor>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit" :loading="data.submitLoading"
        >保存</el-button
      >
    </el-form-item>
  </el-form>
</template>
<script>
import { GetList, EditInfo } from "@/api/news";
import { formatDate } from "@/utils/common";
import { reactive, onMounted } from "@vue/composition-api";
// 富文本编辑器
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
  name: "infoDetail",
  components: { quillEditor },
  setup(props, { root, emit }) {
    const data = reactive({
      detailForm: {
        title: "",
        categoryId: "",
        createDate: "",
        content: ""
      },
      categorys: [],
      editorOption: {},
      info_id: root.$route.query.id,
      submitLoading: false,
      formLabelWidth: "120px" //文本宽度
    });

    // 获取信息分类
    const getInfoCategory = () => {
      root.$store
        .dispatch("common/getInfoCategory")
        .then(res => {
          data.categorys = res;
        })
        .catch(err => {
          console.log(err);
        });
    };
    // 获取当前ID的信息
    const getInfo = () => {
      let requestData = {
        pageNumber: 1,
        pageSize: 1,
        id: data.info_id
      };
      GetList(requestData)
        .then(res => {
          let resData = res.data.data.data[0];
          data.detailForm.categoryId = resData.categoryId;
          data.detailForm.title = resData.title;
          data.detailForm.createDate = formatDate(resData.createDate);
          data.detailForm.content = resData.content;
        })
        .catch(err => {
          console.log(err);
        });
    };
    // 提交
    const submit = () => {
      let requestData = {
        id: data.info_id,
        categoryId: data.detailForm.categoryId,
        title: data.detailForm.title,
        updateDate: data.detailForm.createDate,
        content: data.detailForm.content,
        imgUrl: ""
      };
      data.submitLoading = true;
      EditInfo(requestData)
        .then(res => {
          let resData = res.data;
          root.$message({
            message: resData.message,
            type: "success"
          });
          data.submitLoading = false;
          emit("getListEmit");
        })
        .catch(err => {
          console.log(err);
        });
    };

    onMounted(() => {
      getInfoCategory();
      getInfo();
    });

    return {
      data,
      submit
    };
  }
};
</script>
<style lang="scss" scoped></style>
