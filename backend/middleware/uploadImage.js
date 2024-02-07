const multer = require("multer");
const path = require("path");
const gm = require("gm").subClass({ imageMagick: true });
const Jimp = require("jimp");
const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Check if the request is for product images or blog images

    cb(null, path.join(__dirname, `../public/images/`));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname + "-" + uniqueSuffix + ".jpeg");
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(
      {
        message: "Unsupported File Format",
      },
      false
    );
  }
};

const uploadPhoto = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fieldSize: 2000000000 },
});

const productImageResize = async (req, res, next) => {
  if (!req.files) return next();

  await Promise.all(
    req.files.map(async (file) => {
      const inputPath = file.path;
      const outputPath = path.join(
        __dirname,
        `../public/images/products/${file.filename}.jpeg`
      );

      console.log("Processing image:", inputPath);

      try {
        const image = await Jimp.read(inputPath);
        await image.resize(300, 300).quality(90).write(outputPath);
        console.log("Image processed successfully:", outputPath);
      } catch (error) {
        console.error("Error resizing image:", error);
        return next(error);
      }
    })
  );

  next();
};

const blogImageResize = async (req, res, next) => {
  if (!req.files) return next();

  await Promise.all(
    req.files.map(async (file) => {
      const inputPath = file.path;
      const outputPath = path.join(
        __dirname,
        `/public/blogs/${file.filename}.jpeg`
      );

      console.log("Processing image:", inputPath);

      try {
        const image = await Jimp.read(inputPath);
        await image.resize(300, 300).quality(90).write(outputPath);
        console.log("Image processed successfully:", outputPath);
      } catch (error) {
        console.error("Error resizing image:", error);
        return next(error);
      }
    })
  );

  next();
};

module.exports = { uploadPhoto, productImageResize, blogImageResize };
