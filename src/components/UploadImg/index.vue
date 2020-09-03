<template>
  <el-upload
    class="avatar-uploader"
    action="https://jsonplaceholder.typicode.com/posts/"
    :data="data.uploadKey"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
  >
    <img v-if="data.image" :src="data.image" class="avatar" />
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>
<script>
import { reactive } from "@vue/composition-api";
export default {
  name: "uploadImg",
  props: {
    imgUrl: {
      type: String,
      default: ""
    },
    config: {
      type: Object,
      default: () => {}
    }
  },
  setup(props, { root }) {
    const data = reactive({
      image: "",
      imgUrl: "",
      uploadKey: {
        token: "",
        key: ""
      }
    });

    // 图片上传
    const handleAvatarSuccess = (res, file) => {
      data.imgUrl = URL.createObjectURL(file.raw);
    };
    const beforeAvatarUpload = file => {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        root.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        root.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    };

    return {
      data,
      handleAvatarSuccess,
      beforeAvatarUpload
    };
  }
};
</script>
<style lang="scss" scoped></style>
