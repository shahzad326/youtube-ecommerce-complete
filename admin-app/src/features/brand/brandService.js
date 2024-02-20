// customerService.js
import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const getBrand = async () => {
  const response = await axios.get(`${base_url}/brand/getAllBrand`);
  return response.data;
};

const createBrand = async (brand) => {
  const response = await axios.post(
    `${base_url}/brand/createBrand`,
    brand,
    config
  );
  return response.data;
};

const brandService = {
  getBrand,
  createBrand,
};

export default brandService;
