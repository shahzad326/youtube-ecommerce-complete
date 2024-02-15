import React, { useEffect } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getColor } from "../features/color/colorSlice";

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
const ColorList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getColor());
  }, []);

  const colorState = useSelector((state) => state.color.colors.data);
  // console.log(colorState);

  const data1 = Array.isArray(colorState)
    ? colorState.map((color, index) => ({
        key: index + 1,
        title: color.title,
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
        <h3 className="mb-4 title">Color List</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
    </div>
  );
};

export default ColorList;
