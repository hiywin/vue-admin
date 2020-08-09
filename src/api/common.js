import { GetCategory } from "@/api/news";
import { reactive } from "@vue/composition-api";
export function common() {
  const category = reactive({
    item: []
  });
  const getInfoCategory = () => {
    GetCategory({})
      .then(res => {
        category.item = res.data.data.data;
      })
      .catch(err => {
        console.log(err);
      });
  };

  return {
    // ref
    category,
    // methods
    getInfoCategory
  };
}
