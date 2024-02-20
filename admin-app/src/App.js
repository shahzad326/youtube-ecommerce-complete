import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./component/MainLayout";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import Enquiries from "./pages/Enquiries";
import Dashboard from "./pages/Dashboard";
import BlogList from "./pages/BlogList";
import BlogCategoryList from "./pages/BlogCategoryList";
import Orders from "./pages/Orders";
import ProductList from "./pages/ProductList";
import BrandList from "./pages/BrandList";
import CategoryList from "./pages/CategoryList";
import ColorList from "./pages/ColorList";
import Customer from "./pages/Customer";
import AddBlog from "./pages/AddBlog";
import AddBlogCategory from "./pages/AddBlogCategory";
import AddColor from "./pages/AddColor";
import AddCategory from "./pages/AddCategory";
import AddBrand from "./pages/AddBrand";
import AddProduct from "./pages/AddProduct";
import "./App.css";
import AddCoupen from "./pages/AddCoupen";
import CoupenList from "./pages/CoupenList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/*" element={<MainLayout />}>
          <Route index element={<Dashboard />} />

          <Route path="enquiry" element={<Enquiries />} />
          <Route path="blog-list" element={<BlogList />} />
          <Route path="blog-category-list" element={<BlogCategoryList />} />
          <Route path="orders" element={<Orders />} />
          <Route path="customers" element={<Customer />} />
          <Route path="add-blog" element={<AddBlog />} />
          <Route path="add-coupen" element={<AddCoupen />} />

          <Route path="product-list" element={<ProductList />} />
          <Route path="list-brand" element={<BrandList />} />
          <Route path="list-category" element={<CategoryList />} />
          <Route path="list-color" element={<ColorList />} />
          <Route path="list-coupen" element={<CoupenList />} />

          <Route path="blog-category" element={<AddBlogCategory />} />
          <Route path="color" element={<AddColor />} />
          <Route path="category" element={<AddCategory />} />
          <Route path="brand" element={<AddBrand />} />
          <Route path="product" element={<AddProduct />} />

          {/* Add more routes as needed */}
        </Route>
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
