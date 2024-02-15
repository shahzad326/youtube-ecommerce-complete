import React from "react";
import CusotomInput from "../component/CusotomInput";

const AddCategory = () => {
  return (
    <div>
      <h3 className="mb-4 title">Add Category</h3>

      <div>
        <form action="">
          <div className="mt-4">
            <CusotomInput type="text" label="Enter Category" />
          </div>

          <button
            className="btn btn-success border-0 rounded-0 my-5"
            type="submit"
          >
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
