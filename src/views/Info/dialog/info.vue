<template>
  <div>
    <el-dialog
      title="新增"
      :visible.sync="dialogVisible"
      width="30%"
      @close="dialogClose"
    >
      <el-form :model="form"
        ><el-form-item label="类别" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择类别">
            <el-option label="国内新闻" value="shanghai"></el-option>
            <el-option label="国际新闻" value="beijing"></el-option>
            <el-option label="体育新闻" value="beijing1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.name" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="概况" :label-width="formLabelWidth">
          <el-input
            v-model="form.name"
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
            <el-button type="danger" @click="dialogVisible = false"
              >确 定</el-button
            >
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { ref, reactive, watch } from "@vue/composition-api";
export default {
  name: "dialogInfo",
  props: {
    flag: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    /**
     * ref数据
     */
    const dialogVisible = ref(false);
    const formLabelWidth = ref("70px");

    /**
     * reactive数据
     */
    const form = reactive({
      name: "",
      region: "",
      date1: "",
      date2: "",
      delivery: false,
      type: [],
      resource: "",
      desc: ""
    });

    /**
     * 方法
     */
    const dialogClose = () => {
      dialogVisible.value = false;
      emit("close", false);
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
      // func
      dialogClose
    };
  }
};
</script>
<style lang="scss" scoped></style>
