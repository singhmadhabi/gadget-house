require("dotenv").config();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const userController = require("../modules/users/user.controller");

mongoose.connect(process.env.DB_URL);
var setup = {
  initialize: async () => {
    await mongoose.connection.dropDatabase();
    console.log("DB reset");
    console.log("Creating Admin Account");
    const payload = {
      name: "Madhabi Admin",
      email: "singhmadhabi4@gmail.com",
      password: await bcrypt.hash("password", +process.env.SALT_ROUNDS),
      roles: ["admin"],
      isActive: true,
      isEmailVerified: true,
    };
    await userController.create(payload);
    console.log("---------DONE----------");

    console.log("Creating User Account");
    const userPayload = {
      name: "Madhabi User",
      email: "singhmadhabi4@gmail.com",
      password: await bcrypt.hash("password", +process.env.SALT_ROUNDS),
      isActive: true,
      isEmailVerified: true,
    };
    await userController.create(userPayload);
    console.log("---------DONE----------");
  },
};
setup.initialize();
