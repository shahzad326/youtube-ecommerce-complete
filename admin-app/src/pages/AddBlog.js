import React, { useEffect, useState } from "react";
import CusotomInput from "../component/CusotomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";
import { deleteImg, uplaodImg } from "../features/upload/uploadSlice";

import { createBlog, resetState } from "../features/blog/blogSlice";
import { getBlogCategory } from "../features/blog-category/blogCategorySlice";

import { toast } from "react-toastify";

let schema = Yup.object().shape({
  title: Yup.string().required("Blog title is required"),
  category: Yup.string().required("Blog Category is required"),
  description: Yup.string().required("Blog Description is required"),
});

const AddBlog = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    dispatch(getBlogCategory());
  }, []);

  const blogCategoryState = useSelector(
    (state) => state.blogCategory.blogCategory.data
  );

  const imgState = useSelector((state) => state.upload.images);

  const newBlog = useSelector((state) => state.blog);
  const { isSuccess, isError, isLoading, createdBlog } = newBlog;
  useEffect(() => {
    if (isSuccess && createdBlog) {
      toast.success("Blog Added Successfully", {});
    }
    if (isError) {
      toast.error("Something went Wrong", {});
    }
  }, [isSuccess, isError, isLoading]);

  const img = [];
  if (imgState) {
    imgState.forEach((i) => {
      img.push({
        public_id: i.public_id,
        url: i.url,
      });
    });
  }

  useEffect(() => {
    formik.values.images = img;
  }, [images]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      category: "",
      images: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createBlog(values));
      // alert(JSON.stringify(values));
      formik.resetForm();

      setImages(null);
      setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/blog-list");
      }, 3000);
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">Add Blog</h3>

      <div>
        <form
          action=""
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
          <div>
            <CusotomInput
              type="text"
              label="Enter Blog Title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange("title")}
              onBlur={formik.handleBlur("title")}
            />
            <div className="error">
              {formik.touched.title && formik.errors.title}
            </div>
          </div>
          <div>
            <select
              className="form-control py-3 mb-3"
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange("category")}
              onBlur={formik.handleBlur("category")}
            >
              <option value=""> Select Category</option>
              {blogCategoryState &&
                blogCategoryState.map((i, j) => {
                  return (
                    <option key={j} value={i.title}>
                      {i.title}{" "}
                    </option>
                  );
                })}
            </select>
            <div className="error">
              {formik.touched.category && formik.errors.category}
            </div>
          </div>
          <div>
            <ReactQuill
              theme="snow"
              style={{ backgroundColor: "white" }}
              name="description"
              value={formik.values.description}
              onChange={(value) => formik.setFieldValue("description", value)}
              onBlur={() => formik.setFieldTouched("description", true)}
            />
            <div className="error">
              {formik.touched.description && formik.errors.description}
            </div>
          </div>

          <div className="bg-white border-1 p-5 text-center cursor-pointer">
            <Dropzone
              className="cursor-pointer"
              onDrop={(acceptedFiles) => {
                dispatch(uplaodImg(acceptedFiles));
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} className="cursor-pointer" />
                    <p>Drag and drop some files here</p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="show-images d-flex flex-wrap gap-3">
            {imgState.map((i, j) => {
              return (
                <div className="position-relative" key={j}>
                  <button
                    type="button"
                    className="btn-close position-absolute"
                    style={{ top: "10px", right: "10px" }}
                    onClick={() => dispatch(deleteImg(i.public_id))}
                  ></button>
                  <img src={i.url} width={200} height={200} alt="" />
                </div>
              );
            })}
          </div>
          <button
            className="btn btn-success border-0 rounded-0 my-5"
            type="submit"
          >
            Add Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
