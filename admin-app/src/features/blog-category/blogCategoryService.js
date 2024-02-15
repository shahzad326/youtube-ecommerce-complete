// customerService.js
import axios from "axios";
import { base_url } from "../../utils/base_url";

const getBlogCategory = async () => {
  const response = await axios.get(`${base_url}/blogCategory/getAllBlogCategory`);
  return response.data;
};

const blogCategoryService = {
  getBlogCategory,
};

export default blogCategoryService;
