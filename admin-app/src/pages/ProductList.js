import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../features/product/productSlice";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Brand",
    dataIndex: "brand",
    sorter: (a, b) => a.brand.length - b.brand.length,
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price.length - b.price.length,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];
const ProductList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProduct());
  }, []);

  const productState = useSelector((state) => state.product.products.products);
  console.log(productState);

  const data1 = Array.isArray(productState)
    ? productState.map((product, index) => ({
        key: index + 1,
        title: product.title,
        brand: product.brand,
        color: product.color,
        category: product.category,
        price: `$ ${product.price}`,
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
        <h3 className="mb-4">Product List</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
    </div>
  );
};

export default ProductList;
