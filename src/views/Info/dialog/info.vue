<template>
  <div>
    <el-dialog
      title="新增"
      :visible.sync="dialogVisible"
      width="30%"
      @close="dialogClose"
    >
      <el-form :model="form"
        ><el-form-item label="标题" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="概况" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
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
    const dialogVisible = ref(true);
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
