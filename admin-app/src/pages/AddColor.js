import React from "react";
import CusotomInput from "../component/CusotomInput";

const AddColor = () => {
  return (
    <div>
      <h3 className="mb-4 title">Add Color</h3>

      <div>
        <form action="">
          <div className="mt-4">
            <CusotomInput type="color" label="Enter Color" />
          </div>

          <button
            className="btn btn-success border-0 rounded-0 my-5"
            type="submit"
          >
            Add Color
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddColor;
