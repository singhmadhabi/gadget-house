require("dotenv").config();
const jwt = require("jsonwebtoken");

const generateJWT = (payload) => {
  return jwt.sign(
    {
      data: payload,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_DURATION }
  );
};

const verifyJWT = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.log(err);
  }
};

const test = async () => {
  const payload = { email: "singhmadhabi4@gmail.com" };
  const token = generateJWT(payload);
  const isVerified = verifyJWT(token);

  console.log({ token, isVerified });
};

test();
