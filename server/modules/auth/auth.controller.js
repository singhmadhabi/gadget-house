const bcrypt = require("bcrypt");

const { generateOTP, verifyOTP } = require("../../utils/otp");
const authModel = require("./auth.model");
const userModel = require("../users/user.model");
const { mailer } = require("../../services/mail");

const create = async (payload) => {
  const { password, ...rest } = payload;
  rest.password = await bcrypt.hash(password, +process.env.SALT_ROUNDS);
  const token = generateOTP();
  await authModel.create({ email: payload.email, token });
  // send token to email
  await mailer(payload.email, token);
  return userModel.create(rest);
};

const login = async (email, password) => {
  const user = await userModel.findOne({ email });
  if (!user) throw new Error("User not found");
  if (!user.isActive) throw new Error("User is blocked. Please contact Admin");
  if (!user.isEmailVerified)
    throw new Error("Email is not verified. Verify email to get started");
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error("Email or Password is invalid");
  // JWT TOKEN GENERATION
  return true;
};

const verifyEmail = async (emailP, tokenP) => {
  // check email exist
  const user = await authModel.findOne({ email: emailP });
  if (!user) throw new Error("User not found");
  // check token Validity
  const isValidToken = verifyOTP(tokenP);
  if (!isValidToken) throw new Error("Token invalid");
  // token compare
  const isValid = user?.token === tokenP;
  if (!isValid) throw new Error("Token expired");
  // user isEmailVerified true
  await userModel.findOneAndUpdate(
    { email: emailP },
    { isEmailVerified: true },
    { new: true }
  );
  // authModel email doc delete
  await authModel.deleteOne({ email: emailP });
  return true;
};

const regenerate = async (email) => {
  // check email exist
  const user = await authModel.findOne({ email });
  if (!user) throw new Error("User not found");
  const token = generateOTP();
  await authModel.findOneAndUpdate({ email }, { token }, { new: true });
  // send token to email
  await mailer(email, token);
  return true;
};

module.exports = { create, login, verifyEmail, regenerate };
