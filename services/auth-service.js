const userModel = require("../models/user-model");
const { generateHash, compareHash } = require("../utils/generate-hash");
const { generateToken } = require("../utils/generate-token");

module.exports.registerUser = async ({ name, email, password }) => {
  const alreadyUser = await userModel.findOne({ email: email });
  if (alreadyUser) {
    const error = new Error("User already registered");
    error.statusCode = 409;
    throw error;
  }

  //bcrypt
  const hash = generateHash(password);

  const createdUser = await userModel.create({ name, email, password: hash });

  // token
  let token = generateToken(createdUser);

  return {
    token: token,
    _id: createdUser._id,
    name: createdUser.name,
    email: createdUser.email,
    role: createdUser.role,
  };
};

module.exports.loginUser = async ({ email, password }) => {
  const user = await userModel.findOne({ email });

  if (!user) {
    const error = new Error("Email or Password Incorrect");
    error.statusCode = 401;
    throw error;
  }

  const result = await compareHash(password, user.password);

  if (!result) {
    const error = new Error("Email or Password Incorrect");
    error.statusCode = 401;
    throw error;
  }

  const token = generateToken(user);

  return {
    token,
    _id: user._id,
    email: user.email,
  };
};

module.exports.myProfile = async (email) => {
  let user = await userModel.findOne({ email: email }).select("-password");

  if (!user) {
    const error = new Error("Please login");
    error.statusCode = 401;
    throw error;
  }

  return user;
};
