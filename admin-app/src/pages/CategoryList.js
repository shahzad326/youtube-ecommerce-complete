import React, { useEffect } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getProductCategory } from "../features/p-category/pcategorySlice";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];
const CategoryList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductCategory());
  }, []);

  const productCategoryState = useSelector(
    (state) => state.productCategory.productcategory.data
  );

  const data1 = Array.isArray(productCategoryState)
    ? productCategoryState.map((productcategory, index) => ({
        key: index + 1,
        title: productcategory.title,
        action: (
          <div>
            <Link to="/" className="fs-3 text-danger">
              <BiEdit />
            </Link>
            <Link to="/" className="fs-3 text-danger">
              <AiFillDelete />{" "}
            </Link>
          </div>
        ),
      }))
    : [];

  return (
    <div>
      <div className="">
        <h3 className="mb-4 title">Category List</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
