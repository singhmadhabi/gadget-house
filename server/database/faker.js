require("dotenv").config();
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const categoryController = require("../modules/categories/category.controller");
const productController = require("../modules/products/product.controller");
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
      isArchived: false,
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
      isArchived: false,
      isEmailVerified: true,
    };
    await userController.create(userPayload);
    console.log("---------DONE----------");

    console.log("Creating Categories");
    const cat1 = await categoryController.create({ name: "iphone" });
    const cat2 = await categoryController.create({ name: "ipad" });
    console.log("---------DONE----------");

    console.log("Creating Products");
    const productCount = 100;
    for (let i = 0; i < productCount; i++) {
      const image1 = faker.image.urlLoremFlickr({
        category: Math.random() < 0.5 ? cat2.name : cat1?.name,
      });
      const image2 = faker.image.urlLoremFlickr({
        category: Math.random() < 0.5 ? cat2.name : cat1?.name,
      });
      const arr = [image1, image2];
      const data = {
        name: faker.commerce.productName(),
        brand: faker.commerce.productAdjective(),
        price: faker.commerce.price({ min: 100, dec: 0 }),
        quantity: faker.commerce.price({ min: 0, max: 10, dec: 0 }),
        description: faker.commerce.productDescription(),
        sku: faker.commerce.isbn(10),
        images: arr,
        category: Math.random() < 0.5 ? cat2._id : cat1?._id,
      };

      await productController.create(data);
    }
    console.log("---------DONE----------");
  },
};
setup.initialize();
