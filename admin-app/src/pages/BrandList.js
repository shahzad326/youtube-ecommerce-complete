import React, { useEffect } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getBrand } from "../features/brand/brandSlice";

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
const BrandList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBrand());
  }, []);

  const brandState = useSelector((state) => state.brand.brands.data);

  const data1 = Array.isArray(brandState)
    ? brandState.map((brand, index) => ({
        key: index + 1,
        title: brand.title,
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
      <div className="mt-4">
        <h3 className="mb-4 title">Brand List</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
    </div>
  );
};

export default BrandList;
