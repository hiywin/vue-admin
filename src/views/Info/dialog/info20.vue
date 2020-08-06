<template>
  <div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      @close="dialogClose"
    >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "dialogInfo",
  data() {
    return {
      dialogVisible: false
    };
  },
  props: {
    flag: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    dialogClose() {
      this.dialogVisible = false;
      // 修饰器update 回调时需要做逻辑处理到，就不能用修饰器。反正，可使用修饰器
      // 修饰器写法
      //this.$emit("update:flag", false);
      // 不使用修饰器
      this.$emit("close", false);
    }
  },
  watch: {
    flag: {
      handler(newValue) {
        this.dialogVisible = newValue;
      }
    }
  }
};
</script>
<style lang="scss" scoped></style>
