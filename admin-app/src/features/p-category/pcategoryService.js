// customerService.js
import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const getProductCategory = async () => {
  const response = await axios.get(
    `${base_url}/category/getAllProductCategory`
  );
  return response.data;
};

const createProductCategory = async (productCategory) => {
  const response = await axios.post(
    `${base_url}/category/createProductCategory`,
    productCategory,
    config
  );
  return response.data;
};

const productCategoryService = {
  getProductCategory,
  createProductCategory,
};

export default productCategoryService;
