import React from "react";
import CusotomInput from "../component/CusotomInput";

const AddBrand = () => {
  return (
    <div>
      <h3 className="mb-4 title">Add Brand</h3>

      <div>
        <form action="">
          <div className="mt-4">
            <CusotomInput type="text" label="Enter Brand" />
          </div>

          <button
            className="btn btn-success border-0 rounded-0 my-5"
            type="submit"
          >
            Add Brand
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBrand;
