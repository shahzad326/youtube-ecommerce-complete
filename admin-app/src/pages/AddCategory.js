import React, { useEffect, useState } from "react";
import CusotomInput from "../component/CusotomInput";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getProductCategory,
  resetState,
} from "../features/p-category/pcategorySlice";
import { createProductCategory } from "../features/p-category/pcategorySlice";
import { toast } from "react-toastify";

let schema = Yup.object().shape({
  title: Yup.string().required("Product Category title is required"),
});

const AddCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getProductCategory());
  }, []);

  const newProductCategory = useSelector((state) => state.productCategory);
  const {
    isSuccess,
    isLoading,
    isError,
    createdProductcategory,
  } = newProductCategory;
  useEffect(() => {
    if (isSuccess && createdProductcategory) {
      toast.success("Product Cateogory Added Successfully", {});
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
      dispatch(createProductCategory(values));
      console.log(values);
      // alert(JSON.stringify(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/list-category"); // Redirect to the list-brand page
      }, 3000);
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">Add Product Category</h3>

      <div>
        <form
          action=""
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
          <div>
            <CusotomInput
              type="text"
              label="Enter Product Category"
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
            Add Product Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
