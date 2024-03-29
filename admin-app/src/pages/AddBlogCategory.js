import React, { useEffect, useState } from "react";
import CusotomInput from "../component/CusotomInput";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  createBlogCategory,
  getBlogCategory,
  resetState,
} from "../features/blog-category/blogCategorySlice";

import { toast } from "react-toastify";

let schema = Yup.object().shape({
  title: Yup.string().required("Blog Cateogory is required"),
});

const AddBlogCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getBlogCategory());
  }, []);

  const newBlogCategory = useSelector((state) => state.blogCategory);
  const {
    isSuccess,
    isLoading,
    isError,
    createdBlogCategory,
  } = newBlogCategory;
  useEffect(() => {
    if (isSuccess && createdBlogCategory) {
      toast.success("Blog Category Added Successfully", {});
    }
    if (isError) {
      toast.error("Something went Wrong", {});
    }
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createBlogCategory(values));
      // alert(JSON.stringify(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/blog-category-list");
      }, 3000);
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">Add Blog Category</h3>

      <div>
        <form
          action=""
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
          <div>
            <CusotomInput
              type="text"
              label="Enter Blog Catetgory Title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange("title")}
              onBlur={formik.handleBlur("title")}
            />
            <div className="error">
              {formik.touched.title && formik.errors.title}
            </div>
          </div>

          <button
            className="btn btn-success border-0 rounded-0 my-5"
            type="submit"
          >
            Add Blog Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlogCategory;
