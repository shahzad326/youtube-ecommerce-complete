// customerService.js
import axios from "axios";
import { base_url } from "../../utils/base_url";

const getUser = async () => {
  const response = await axios.get(`${base_url}/user/getAllUser`);
  return response.data;
};

const customerService = {
  getUser,
};

export default customerService;
