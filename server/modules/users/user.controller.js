const bcrypt = require("bcrypt");
const Model = require("./user.model");

const create = (payload) => {
  return Model.create(payload);
};
const list = () => {
  return Model.find();
};

const getById = (id) => {
  return Model.findOne({ _id: id });
};

const updateProfile = (id, payload) => {
  return Model.findOneAndUpdate({ _id: id }, payload, { new: true });
};

const changePassword = async (id, payload) => {
  const { oldPassword, newPassword } = payload;
  const user = await Model.findOne({ _id: id });
  if (!user) throw new Error("User not found");
  const isValid = await bcrypt.compare(oldPassword, user.password);
  if (!isValid) throw new Error("Password is invalid");
  const password = await bcrypt.hash(newPassword, +process.env.SALT_ROUNDS);
  await Model.findOneAndUpdate({ _id: id }, { password }, { new: true });
  return true;
};

const resetPassword = async (email, payload) => {
  const user = await Model.findOne({ email });
  if (!user) throw new Error("User not found");
  const { password, ...rest } = payload;
  const resetPassword = await bcrypt.hash(password, +process.env.SALT_ROUNDS);
  rest.password = resetPassword;
  await Model.findOneAndUpdate({ _id: user._id }, { ...rest }, { new: true });
  return true;
};

const block = async (id, payload) => {
  return Model.findOneAndUpdate({ _id: id }, { ...payload }, { new: true });
};

const archive = async (id, payload) => {
  return Model.findOneAndUpdate({ _id: id }, { ...payload }, { new: true });
};

module.exports = {
  archive,
  block,
  changePassword,
  create,
  getById,
  list,
  resetPassword,
  updateProfile,
};
