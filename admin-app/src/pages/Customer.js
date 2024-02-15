import React, { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../features/customer/customerSlice";

const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Mobile",
    dataIndex: "mobile",
  },
];

const Customer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  const customerState = useSelector(
    (state) => state.customer.customers.getUser
  );

  const data1 = Array.isArray(customerState)
    ? customerState
        .filter((customer) => customer.role !== "admin")
        .map((customer, index) => ({
          key: index + 1,
          name: `${customer.firstname} ${customer.lastname}`,
          email: customer.email,
          mobile: customer.mobile,
        }))
    : [];

  return (
    <div>
      <div className="">
        <h3 className="mb-4 title">Customer</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
    </div>
  );
};

export default Customer;
