// Login.jsx
import React from "react";
import CustomInput from "../component/CusotomInput";

const ForgotPassword = () => {
  return (
    <div className="py-5" style={{ backgroundColor: "#ffd333" }}>
      <br /> <br /> <br /> <br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center title">Forgot Password</h3>
        <p className="text-center">
          Please Enter your register email address to get forgot password mail
        </p>
        <form action="">
          <CustomInput type="text" label="Email Address" id="email" />

          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100"
            style={{ backgroundColor: "#ffd333" }}
            type="submit"
          >
            Send Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
