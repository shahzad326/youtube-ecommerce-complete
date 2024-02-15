// customerService.js
import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const getProduct = async () => {
  const response = await axios.get(`${base_url}/product/getAllProduct`);
  return response.data;
};

const createProduct = async (product) => {
  const response = await axios.post(
    `${base_url}/product/createProduct`,
    product,
    config
  );
  return response.data;
};

const productService = {
  getProduct,
  createProduct,
};

export default productService;
