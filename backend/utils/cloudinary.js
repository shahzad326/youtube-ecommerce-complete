const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: "dcebddeer",
  api_key: "895296323236756",
  api_secret: "LdOE6xpLHhPN19hQqBI8p350TnU",
});

const cloudinaryUploadImg = async (fileToUploads) => {
  return new Promise((resolve) =>
    cloudinary.uploader.upload(fileToUploads, (result) => {
      resolve({
        url: result.secure_url, // Fix the property name here
        asset_id: result.asset_id,
        public_id: result.public_id,
      });
    })
  );
};

const cloudinaryDeleteImg = async (fileToDelete) => {
  return new Promise((resolve) =>
    cloudinary.uploader.destroy(fileToDelete, (result) => {
      resolve({
        url: result.secure_url, // Fix the property name here
        asset_id: result.asset_id,
        public_id: result.public_id,
      });
    })
  );
};

module.exports = { cloudinaryUploadImg, cloudinaryDeleteImg };
