import React, { useEffect } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getBlogCategory } from "../features/blog-category/blogCategorySlice";

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
    title: "Action",
    dataIndex: "action",
  },
];
const BlogCategoryList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlogCategory());
  }, []);

  const blogCategoryState = useSelector(
    (state) => state.blogCategory.blogCategory.data
  );
  console.log(blogCategoryState);

  const data1 = Array.isArray(blogCategoryState)
    ? blogCategoryState.map((blogCategory, index) => ({
        key: index + 1,
        title: blogCategory.title,
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

export default BlogCategoryList;
