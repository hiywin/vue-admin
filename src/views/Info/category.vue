<template>
  <div id="category">
    <el-button type="danger" @click="addFirst">添加一级分类</el-button>
    <hr class="hr-wrap" />
    <el-row :gutter="30">
      <el-col :span="12">
        <div class="category-wrap">
          <!-- 一级分类 -->
          <div
            class="category"
            v-for="firstItem in category.item"
            :key="firstItem.id"
          >
            <h4>
              <svg-icon iconClass="collape"></svg-icon>
              {{ firstItem.category_name }}
              <div class="button-group">
                <el-button
                  type="danger"
                  size="mini"
                  round
                  @click="editCategory(firstItem)"
                  >编辑</el-button
                >
                <el-button type="success" size="mini" round
                  >添加子模块</el-button
                >
                <el-button
                  size="mini"
                  round
                  @click="deleteCategoryConfirm(firstItem.id)"
                  >删除</el-button
                >
              </div>
            </h4>
            <!-- 子级分类 -->
            <ul v-if="firstItem.children">
              <li v-for="secItem in firstItem.children" :key="secItem.id">
                {{ secItem.category_name }}
                <div class="button-group">
                  <el-button type="danger" size="mini" round>编辑</el-button>
                  <el-button size="mini" round>删除</el-button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <h4 class="menu-title">一级分类编辑</h4>
        <el-form
          ref="categoryForm"
          :model="categoryForm"
          label-width="142px"
          class="form-wrap"
        >
          <el-form-item
            label="一级分类名称："
            v-if="category_first_show"
            prop="categoryName"
          >
            <el-input
              v-model="categoryForm.categoryName"
              :disabled="category_first_disabled"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="二级分类名称："
            v-if="category_sec_show"
            prop="secCategoryName"
          >
            <el-input
              v-model="categoryForm.secCategoryName"
              :disabled="category_sec_disabled"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="danger"
              class="submit-wrap"
              @click="submit()"
              :loading="submit_loading"
              :disabled="submit_disabled"
              >确 定</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import {
  AddFirstCategory,
  GetCategory,
  DeleteCategory,
  EditCategory
} from "@/api/news";
import { reactive, ref, onMounted } from "@vue/composition-api";
import { global } from "@/utils/global";
export default {
  name: "category",
  setup(props, { root, refs }) {
    // ref
    const category_first_show = ref(true);
    const category_sec_show = ref(true);
    const submit_loading = ref(false);
    const category_first_disabled = ref(true);
    const category_sec_disabled = ref(true);
    const submit_disabled = ref(true);
    const currentCategoryId = ref("");
    const { confirm } = global();
    const submit_type = ref("");
    /**
     * reactive
     */
    const categoryForm = reactive({
      categoryName: "",
      secCategoryName: ""
    });
    const category = reactive({
      item: []
    });
    /**
     * methods
     */
    const submit = () => {
      if (!categoryForm.categoryName) {
        root.$message({
          message: "分类名称不能为空！",
          type: "error"
        });
        return;
      }
      if (submit_type.value == "category_first_add") {
        categoryFirstAdd();
      }
      if (submit_type.value == "category_first_edit") {
        categoryFirstEdit();
      }
    };
    const categoryFirstEdit = () => {
      if (currentCategoryId.value > 0) {
        let requestData = {
          id: currentCategoryId.value,
          categoryName: categoryForm.categoryName
        };
        EditCategory(requestData)
          .then(res => {
            let resData = res.data;
            if (resData.resCode == 0) {
              root.$message({
                message: resData.message,
                type: "success"
              });
              let data = category.item.filter(
                p => p.id == currentCategoryId.value
              );
              data[0].category_name = resData.data.data.categoryName;
              resetCurrentCategoryId();
              resetCategoryForm();
              setCategoryFirstDisabled(true);
              setSubmitDisabled(true);
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
      }
    };
    const categoryFirstAdd = () => {
      setSubmitLoading(true);
      AddFirstCategory({ categoryName: categoryForm.categoryName })
        .then(response => {
          let data = response.data;
          if (data.resCode === 0) {
            root.$message({
              message: data.message,
              type: "success"
            });
            category.item.push(data.data);
            setSubmitLoading(false);
            resetCategoryForm();
            setCategoryFirstDisabled(true);
            setSubmitDisabled(true);
          } else {
            root.$message({
              message: data.message,
              type: "error"
            });
            setSubmitLoading(false);
            resetCategoryForm();
          }
        })
        .catch(err => {
          console.log(err);
        });
    };
    const addFirst = () => {
      submit_type.value = "category_first_add";
      setCategoryFirstShow(true);
      setCategorySecShow(false);
      setCategoryFirstDisabled(false);
      setSubmitDisabled(false);
    };
    const getCategory = () => {
      GetCategory()
        .then(res => {
          let data = res.data.data.data;
          category.item = data;
        })
        .catch(err => {
          console.log(err);
        });
    };
    const deleteCategoryConfirm = categoryId => {
      currentCategoryId.value = categoryId;
      confirm({
        content: "确认删除当前信息，确认后将无法恢复！",
        tips: "警告",
        fn: deleteCategory,
        catchFn: () => {
          currentCategoryId.value = "";
        }
      });
    };
    const deleteCategory = () => {
      DeleteCategory({ categoryId: currentCategoryId.value })
        .then(res => {
          let index = category.item.findIndex(
            p => p.id == currentCategoryId.value
          );
          category.item.splice(index, 1);
          let data = res.data;
          if (data.resCode === 0) {
            root.$message({
              message: data.message,
              type: "success"
            });
          } else {
            root.$message({
              message: data.message,
              type: "error"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    };
    const editCategory = firstItem => {
      submit_type.value = "category_first_edit";
      setCategoryFirstShow(true);
      setCategorySecShow(false);
      setCategoryFirstDisabled(false);
      setSubmitDisabled(false);

      categoryForm.categoryName = firstItem.category_name;
      currentCategoryId.value = firstItem.id;
    };
    /**
     * 设置状态封装
     */
    const setSubmitLoading = flag => {
      submit_loading.value = flag;
    };
    const setCategoryFirstShow = flag => {
      category_first_show.value = flag;
    };
    const setCategorySecShow = flag => {
      category_sec_show.value = flag;
    };
    const setCategoryFirstDisabled = flag => {
      category_first_disabled.value = flag;
    };
    const setCategorySecDisabled = flag => {
      category_sec_disabled.value = flag;
    };
    const setSubmitDisabled = flag => {
      submit_disabled.value = flag;
    };
    const resetCategoryForm = () => {
      refs.categoryForm.resetFields();
    };
    const resetCurrentCategoryId = () => {
      currentCategoryId.value = "";
    };

    /**
     * 生命周期
     */
    // 挂载完成时执行
    onMounted(() => {
      getCategory();
    });

    return {
      //ref
      category_first_show,
      category_sec_show,
      submit_loading,
      category_first_disabled,
      category_sec_disabled,
      submit_disabled,
      //reactive
      categoryForm,
      category,
      // methods
      submit,
      addFirst,
      getCategory,
      deleteCategoryConfirm,
      editCategory
    };
  }
};
</script>
<style lang="scss" scoped>
.category-wrap {
  // 将首元素的虚线去掉
  div:first-child {
    &:before {
      top: 20px;
    }
  }
  // 将尾元素的虚线去掉
  div:last-child {
    &:before {
      bottom: 21px;
    }
  }
}
.category {
  position: relative;
  line-height: 44px;
  &:before {
    content: "";
    position: absolute;
    left: 22px;
    top: 0;
    bottom: 0;
    width: 32px;
    border-left: 1px dotted #000;
  }
  h4 {
    position: relative;
    padding-left: 40px;
  }
  svg {
    position: absolute;
    left: 15px;
    top: 15px;
    background-color: #fff;
    font-size: 15px;
  }
  li {
    position: relative;
    padding-left: 37px;
    margin-left: 23px;
    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 22px;
      width: 32px;
      border-bottom: 1px dotted #000;
    }
  }
  li,
  h4 {
    @include webkit(transition, all 0.5s ease 0s);
    &:hover {
      background-color: #f3f3f3;
      .button-group {
        display: block;
      }
    }
  }
}
.button-group {
  position: absolute;
  display: none;
  right: 11px;
  top: -1px;
  z-index: 2;
}
.menu-title {
  line-height: 44px;
  background-color: #f3f3f3;
  padding-left: 22px;
}
.form-wrap {
  width: 350px;
  padding-top: 30px;
}
.hr-wrap {
  margin: 10px -20px;
  border: 1px solid #e9e9e9;
}
.submit-wrap {
  width: 120px;
  margin-top: 20px;
}
</style>
