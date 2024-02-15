import React, { useEffect, useState } from "react";
import CusotomInput from "../component/CusotomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBrand } from "../features/brand/brandSlice";
import { getProductCategory } from "../features/p-category/pcategorySlice";
import { getColor } from "../features/color/colorSlice";

import { Select } from "antd";
import Dropzone from "react-dropzone";
import { deleteImg, uplaodImg } from "../features/upload/uploadSlice";
import { createProduct } from "../features/product/productSlice";

let schema = Yup.object().shape({
  title: Yup.string().required("title is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number().required("Price is required"),
  brand: Yup.string().required("Brand is required"),
  color: Yup.array()
    .min(1, "Please Ateast Choose one color")
    .required("Color is required"),
  category: Yup.string().required("Category is required"),
  quantity: Yup.number().required("Quantity is required"),
});

const AddProduct = () => {
  const [color, setColor] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    dispatch(getBrand());
    dispatch(getProductCategory());
    dispatch(getColor());
  }, []);

  const brandState = useSelector((state) => state.brand.brands.data);

  const productCategoryState = useSelector(
    (state) => state.productCategory.productcategory.data
  );

  const colorState = useSelector((state) => state.color.colors.data);
  const imgState = useSelector((state) => state.upload.images);
  const coloropt = [];
  if (colorState) {
    colorState.forEach((i) => {
      coloropt.push({
        value: i._id,
        label: i.title,
      });
    });
  }

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
    formik.values.color = color ? color : " ";
    formik.values.images = img;
  }, [color, images]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      brand: "",
      category: "",
      color: [],
      quantity: "",
      images: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      // dispatch(createProduct(values));
      alert(JSON.stringify(values));
    },
  });

  const handleColors = (e) => {
    setColor(e);
    console.log(color);
  };

  return (
    <div>
      <h3 className="mb-4 title">Add Product</h3>

      <div>
        <form
          action=""
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
          <div className="mt-4">
            <CusotomInput
              type="text"
              label="Enter Product Title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange("title")}
              onBlur={formik.handleBlur("title")}
            />
            <div className="error">
              {formik.touched.title && formik.errors.title}
            </div>
          </div>
          <div className="mt-4">
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
          <div>
            <CusotomInput
              type="number"
              label="Enter Product Price"
              name="price"
              value={formik.values.price}
              onChange={formik.handleChange("price")}
              onBlur={formik.handleBlur("price")}
            />
            <div className="error">
              {formik.touched.price && formik.errors.price}
            </div>
          </div>
          <select
            className="form-control py-3 mb-3 "
            name="brand"
            value={formik.values.brand}
            onChange={formik.handleChange("brand")}
            onBlur={formik.handleBlur("brand")}
          >
            <option value=""> Select Brand</option>
            {brandState &&
              brandState.map((i, j) => {
                return (
                  <option key={j} value={i.title}>
                    {i.title}{" "}
                  </option>
                );
              })}
          </select>{" "}
          <div className="error">
            {formik.touched.brand && formik.errors.brand}
          </div>
          <div className="mt-4">
            <select
              className="form-control py-3 mb-3"
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange("category")}
              onBlur={formik.handleBlur("category")}
            >
              <option value=""> Select Category</option>
              {productCategoryState &&
                productCategoryState.map((i, j) => {
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
          <div className="mt-4">
            <select
              className="form-control py-3 mb-3"
              name="tags"
              value={formik.values.tags}
              onChange={formik.handleChange("tags")}
              onBlur={formik.handleBlur("tags")}
            >
              <option value="" disabled>
                {" "}
                Select Tags
              </option>
              <option value="featured">Featured</option>
              <option value="popular"Popular></option>
              <option value="special">Special</option>
            </select>
            <div className="error">
              {formik.touched.tags && formik.errors.tags}
            </div>
          </div>
          <Select
            mode="multiple"
            allowClear
            className="w-100 text-dark"
            placeholder="Select Color"
            defaultValue={color}
            onChange={(i) => handleColors(i)}
            options={coloropt}
          />
          <div className="error">
            {formik.touched.color && formik.errors.color}
          </div>
          <div className="mt-4">
            <CusotomInput
              type="number"
              label="Enter Product Quantity"
              name="quantity"
              value={formik.values.quantity}
              onChange={formik.handleChange("quantity")}
              onBlur={formik.handleBlur("quantity")}
            />
            <div className="error">
              {formik.touched.quantity && formik.errors.quantity}
            </div>
          </div>
          <div className="bg-white border-1 p-5 text-center">
            <Dropzone
              onDrop={(acceptedFiles) => {
                dispatch(uplaodImg(acceptedFiles));
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
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
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
