// customerService.js
import axios from "axios";
import { base_url } from "../../utils/base_url";

const getEnquiry = async () => {
  const response = await axios.get(`${base_url}/enquiry/getAllEnquiry`);
  return response.data;
};

const enquiryService = {
  getEnquiry,
};

export default enquiryService;
