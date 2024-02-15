// Login.jsx
import React from "react";
import CustomInput from "../component/CusotomInput";

const ResetPassword = () => {
  return (
    <div className="py-5" style={{ backgroundColor: "#ffd333" }}>
      <br /> <br /> <br /> <br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center title">Reset Password</h3>
        <p className="text-center">Please Enter your new password</p>
        <form action="">
          <CustomInput type="password" label="Password" id="password" />
          <CustomInput
            type="password"
            label="Confirm Password"
            id="confirmpassword"
          />

          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100"
            style={{ backgroundColor: "#ffd333" }}
            type="submit"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
