// customerService.js
import axios from "axios";
import { base_url } from "../../utils/base_url";

const getBrand = async () => {
  const response = await axios.get(`${base_url}/brand/getAllBrand`);
  return response.data;
};

const brandService = {
  getBrand,
};

export default brandService;
