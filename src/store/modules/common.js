import { GetCategory, GetCategoryAll } from "@/api/news";
const actions = {
  getInfoCategory() {
    return new Promise((resolve, reject) => {
      GetCategory({})
        .then(res => {
          resolve(res.data.data.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  getInfoCategoryAll() {
    return new Promise((resolve, reject) => {
      GetCategoryAll({})
        .then(res => {
          resolve(res.data.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};

export default {
  namespaced: true,
  actions
};
