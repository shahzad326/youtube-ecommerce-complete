const jsonwebtoken = require("jsonwebtoken");

const generaterefreshToken = (id) => {
  return jsonwebtoken.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.GENERATE_JWT_EXPIRES,
  });
};

module.exports = { generaterefreshToken };
