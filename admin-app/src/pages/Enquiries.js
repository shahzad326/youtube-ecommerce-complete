import React, { useEffect } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getEnquiry } from "../features/enquiry/enquirySlice";

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
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];
const Enquiries = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEnquiry());
  }, []);

  const enquiryState = useSelector((state) => state.enquiry.enquiry.data);
  console.log(enquiryState);

  const data1 = Array.isArray(enquiryState)
    ? enquiryState.map((enquiry, index) => ({
        key: index + 1,
        name: enquiry.name,
        email: enquiry.email,
        mobile: enquiry.mobile,
        status: (
          <div>
            <select className="form-control form-select" name="" id="">
              <option value="">Set Status</option>
            </select>
          </div>
        ),
        action: (
          <div>
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
        <h3 className="mb-4 title">Enquiries List</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
    </div>
  );
};

export default Enquiries;
