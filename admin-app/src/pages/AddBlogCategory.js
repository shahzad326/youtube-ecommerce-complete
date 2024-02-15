import React from "react";
import CusotomInput from "../component/CusotomInput";

const AddBlogCategory = () => {
  return (
    <div>
      <h3 className="mb-4 title">Add Blog Category</h3>

      <div>
        <form action="">
          <div className="mt-4">
            <CusotomInput type="text" label="Enter Blog Title" />
          </div>

          <button
            className="btn btn-success border-0 rounded-0 my-5"
            type="submit"
          >
            Add Blog Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlogCategory;
