// Login.jsx
import React, { useEffect } from "react";
import CustomInput from "../component/CusotomInput";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../features/auth/authSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Loader from "../component/Loader";

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let schema = Yup.object().shape({
    email: Yup.string()
      .email("Email should be valid")
      .required("Email is required"),
    password: Yup.string().required("password is required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isSuccess) {
      navigate("admin");
    } else {
      navigate("");
    }
  }, [user, isSuccess, navigate]);

  return (
    <div className="py-5" style={{ backgroundColor: "#ffd333" }}>
      <br /> <br /> <br /> <br />
      {isError && !isLoading && (
        <div style={{ color: "red", textAlign: "center" }}>
          {message.message === "Rejected"
            ? "You are not an admin"
            : "Invalid credentials"}
        </div>
      )}
      {isLoading && <Loader />}
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center title">Login</h3>
        <p className="text-center">Login to your account to continue</p>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Email Address"
            name="email"
            id="email"
            value={formik.validateField.email}
            onChange={formik.handleChange("email")}
          />
          <div className="error">
            {formik.touched.email && formik.errors.email ? (
              <div> {formik.errors.email} </div>
            ) : null}
          </div>
          <div style={{ position: "relative" }}>
            <CustomInput
              type={showPassword ? "text" : "password"}
              name="password"
              label="Password"
              id="password"
              value={formik.validateField.password}
              onChange={formik.handleChange("password")}
            />
            <button
              type="button"
              className="btn btn-link"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                border: "none",
                outline: "none",
              }}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="error">
            {formik.touched.password && formik.errors.password ? (
              <div> {formik.errors.password} </div>
            ) : null}
          </div>
          <div className="mb-3 text-end">
            <Link to="forgot-password">Forgot Password</Link>
          </div>
          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
            style={{ backgroundColor: "#ffd333" }}
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
