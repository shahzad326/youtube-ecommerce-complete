// customerService.js
import axios from "axios";
import { base_url } from "../../utils/base_url";

const getColor = async () => {
  const response = await axios.get(`${base_url}/color/getAllColor`);
  return response.data;
};

const colorService = {
  getColor,
};

export default colorService;
