import React from "react";
import { BsArrowDownRight } from "react-icons/bs";
import { Column } from "@ant-design/plots";
import { Table } from "antd";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Product",
    dataIndex: "product",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
];
const data1 = [];
for (let i = 0; i < 46; i++) {
  data1.push({
    key: i,
    name: `Edward King ${i}`,
    product: "New Prodcut",
    status: `Active ${i}`,
  });
}

const Dashboard = () => {
  const data = [
    {
      type: "Jan",
      sales: 138,
    },
    {
      type: "Feb",
      sales: 78,
    },
    {
      type: "Mar",
      sales: 18,
    },
    {
      type: "Apr",
      sales: 128,
    },
    {
      type: "May",
      sales: 68,
    },
    {
      type: "Jun",
      sales: 68,
    },
    {
      type: "Jul",
      sales: 38,
    },
    {
      type: "Aug",
      sales: 128,
    },
    {
      type: "Sep",
      sales: 78,
    },
    {
      type: "Oct",
      sales: 48,
    },
    {
      type: "Nov",
      sales: 98,
    },
    {
      type: "Dec",
      sales: 38,
    },
  ];

  const config = {
    data,
    xField: "type",
    yField: "sales",
    geomStyle: {
      fill: "#ffd333", // Specify the color directly within geomStyle
    },

    label: {
      position: "top",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "Income",
      },
    },
  };

  return (
    <div>
      <h3 className="mb-4">Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="desc">Total</p>{" "}
            <h4 className="mb-0 sub-title">$ 1,100</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="green">
              <BsArrowDownRight />
              32%
            </h6>
            <p className="mb-0 desc">Compared to April 2022</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="desc">Total</p>{" "}
            <h4 className="mb-0 sub-title">$ 1,100</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="green">
              {" "}
              <BsArrowDownRight />
              32%
            </h6>

            <p className="mb-0 desc">Compared to April 2022</p>
          </div>
        </div>{" "}
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="desc">Total</p>{" "}
            <h4 className="mb-0 sub-title">$ 1,100</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="red">
              {" "}
              <BsArrowDownRight />
              32%
            </h6>
            <p className="mb-0 desc"> Compared to April 2022</p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-5 title">Income Statics</h3>
        <div>
          <Column {...config} />
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-4">Recent Orders</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-5 title">Recent Reviews</h3>
      </div>
    </div>
  );
};

export default Dashboard;
