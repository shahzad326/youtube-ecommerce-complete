// customerService.js
import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const getBlogCategory = async () => {
  const response = await axios.get(
    `${base_url}/blogCategory/getAllBlogCategory`
  );
  return response.data;
};

const createBlogCategory = async (blogCategory) => {
  const response = await axios.post(
    `${base_url}/blogCategory/createBlogCategory`,
    blogCategory,
    config
  );
  return response.data;
};

const blogCategoryService = {
  getBlogCategory,
  createBlogCategory,
};

export default blogCategoryService;
