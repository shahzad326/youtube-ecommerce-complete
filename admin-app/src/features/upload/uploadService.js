// customerService.js
import axios from "axios";
import { base_url } from "../../utils/base_url";
import { config } from "../../utils/axiosConfig";

const uplaodImg = async (data) => {
  const response = await axios.post(
    `${base_url}/uplaod/uploadImage`,
    data,
    config
  );
  return response.data;
};

const deleteImg = async (id) => {
  const response = await axios.post(
    `${base_url}/uplaod/deleteImages/${id}`,

    config
  );
  return response.data;
};

const uploadService = {
  uplaodImg,
  deleteImg,
};

export default uploadService;
