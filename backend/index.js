const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const dbConnect = require("./config/dbConnect");
const authRouter = require("./routes/authRoute");
const productRoute = require("./routes/productRoute");
const blogRoute = require("./routes/blogRoute");
const productCategoryRoute = require("./routes/productCategoryRoute");
const blogCategoryRoute = require("./routes/blogCategoryRoute");
const brandRoute = require("./routes/brandRoute");
const coupenRoute = require("./routes/coupenRoute");
const colorRoute = require("./routes/colorRoute");
const enquiryRoute = require("./routes/enquiryRoute");

const { notFound, errorHandler } = require("./middleware/errorHandler");
dotenv.config();
dbConnect();
app.use(bodyParser());
app.use(morgan("dev"));

bodyParser.urlencoded({ extended: false });
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

app.use("/api/user", authRouter);
app.use("/api/product", productRoute);
app.use("/api/blog", blogRoute);
app.use("/api/category", productCategoryRoute);
app.use("/api/blogcategory", blogCategoryRoute);
app.use("/api/brand", brandRoute);
app.use("/api/coupen", coupenRoute);
app.use("/api/color", colorRoute);
app.use("/api/enquiry", enquiryRoute);

app.use("/", (req, res) => {
  res.send("Helllo From the Server Side");
});

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
