const User = require("../models/user");
const bcrypt = require("bcryptjs");
const findUserbyEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (err) {
    console.log(err);
  }
};

const findUserById = async (id) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (err) {
    console.log(err);
  }
};
const findUserByIdwithoutPassword = async (id) => {
  try {
    const user = await User.findById(id).select("-password");
    return user;
  } catch (err) {
    console.log(err);
  }
};
const addUser = async ({ email, name, password, role }) => {
  try {
    const user = new User({
      email,
      name,
    });
    if (role) user.role = role;
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    return user;
  } catch (err) {
    console.log(err);
  }
};

const updatePassword = async (id, password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  await User.findByIdAndUpdate(id, { password: hashedPassword });
};
module.exports = {
  findUserbyEmail,
  addUser,
  findUserById,
  findUserByIdwithoutPassword,
  updatePassword,
};
