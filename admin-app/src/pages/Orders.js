import React, { useEffect } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../features/auth/authSlice";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Product",
    dataIndex: "product",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: "Amount",
    dataIndex: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];
const Orders = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  const blogState = useSelector((state) => state.auth.orders);
  console.log(blogState);

  const data1 = Array.isArray(blogState)
    ? blogState.map((order, index) => ({
        key: index + 1,

        name: `${order.orderBy.firstname}`,
        product: order.products.map((i, j) => {
          return (
            <div>
              <ul key={j}>
                <li> {i.product.title} </li>
              </ul>
            </div>
          );
        }),
        amount: order.paymentIntent.amount,
        date: new Date(order.createdAt).toLocaleString(),
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
        <h3 className="mb-4 title">Orders List</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
    </div>
  );
};

export default Orders;
