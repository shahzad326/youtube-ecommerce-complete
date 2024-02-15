// customerService.js
import axios from "axios";
import { base_url } from "../../utils/base_url";

const getBlog = async () => {
  const response = await axios.get(`${base_url}/blog/getAllBlogs`);
  return response.data;
};

const blogService = {
  getBlog,
};

export default blogService;
