<template>
  <div id="category">
    <el-button type="danger">添加一级分类</el-button>
    <hr class="hr-wrap" />
    <el-row :gutter="30">
      <el-col :span="12">
        <div class="category-wrap">
          <div class="category">
            <h4>
              <svg-icon iconClass="collape"></svg-icon>
              新闻
              <div class="button-group">
                <el-button type="danger" size="mini" round>编辑</el-button>
                <el-button type="success" size="mini" round
                  >添加子模块</el-button
                >
                <el-button size="mini" round>删除</el-button>
              </div>
            </h4>
            <ul>
              <li>
                国内
                <div class="button-group">
                  <el-button type="danger" size="mini" round>编辑</el-button>
                  <el-button size="mini" round>删除</el-button>
                </div>
              </li>
              <li>国际</li>
              <li>体育</li>
              <li>美食</li>
            </ul>
          </div>
          <div class="category">
            <h4>
              <svg-icon iconClass="open"></svg-icon>
              科技
            </h4>
            <ul>
              <li>国内</li>
              <li>国际</li>
              <li>体育</li>
              <li>美食</li>
            </ul>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <h4 class="menu-title">一级分类编辑</h4>
        <el-form label-width="142px" class="form-wrap">
          <el-form-item label="一级分类名称：">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="二级分类名称：">
            <el-input></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" class="submit-wrap">确 定</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {};
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
