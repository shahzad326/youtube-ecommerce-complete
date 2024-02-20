// customerService.js
import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const getColor = async () => {
  const response = await axios.get(`${base_url}/color/getAllColor`);
  return response.data;
};

const createColor = async (color) => {
  const response = await axios.post(
    `${base_url}/color/createColor`,
    color,
    config
  );
  return response.data;
};

const colorService = {
  getColor,
  createColor,
};

export default colorService;
