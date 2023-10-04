const { v4: uuidv4 } = require("uuid");
const Model = require("./order.model");
const productModel = require("../products/product.model");

const create = (payload) => {
  payload.id = uuidv4();
  const products = payload?.products;
  // check the products in order
  products.map(async (product) => {
    const { product: id, quantity } = product;
    // check if product exist or not
    const isExistingProduct = await productModel.findOne({ _id: id });
    if (!isExistingProduct) throw new Error("Product not found");
    // Update the product quantity with deletedOrder Product Quantity
    const newQuantity = isExistingProduct?.quantity - quantity;
    return await productModel.findOneAndUpdate(
      { _id: id },
      { quantity: newQuantity },
      { new: true }
    );
  });
  return Model.create(payload);
};

const getById = (id) => {
  return Model.findOne({ id });
};

const list = async (limit = 10, page = 1, search) => {
  page = page < 1 ? 1 : page;
  const query = [];
  if (search?.id) {
    query.push({
      $match: {
        id: new RegExp(search?.name, "gi"),
      },
    });
  }
  query.push(
    {
      $sort: {
        created_at: -1,
      },
    },
    {
      $facet: {
        metadata: [
          {
            $count: "total",
          },
        ],
        data: [
          {
            $skip: (+page - 1) * +limit,
          },
          {
            $limit: +limit,
          },
        ],
      },
    },
    {
      $addFields: {
        total: {
          $arrayElemAt: ["$metadata.total", 0],
        },
      },
    },
    {
      $project: {
        total: 1,
        data: 1,
      },
    }
  );
  const result = await Model.aggregate(query);
  return {
    data: result[0].data,
    total: result[0].total || 0,
    page: +page,
    limit: +limit,
  };
};

const updateById = (id, payload) => {
  // IGNORING PRODUCT COUNT
  return Model.findOneAndUpdate({ id }, payload, { new: true });
};

const remove = async (id) => {
  // find the order
  const order = await Model.findOne({ id });
  if (!order) throw new Error("Order not found");
  const products = order?.products;
  // check the products in order
  products.map(async (product) => {
    const { product: id, quantity } = product;
    // check if product exist or not
    const isExistingProduct = await productModel.findOne({ _id: id });
    if (!isExistingProduct) throw new Error("Product not found");
    // Update the product quantity with deletedOrder Product Quantity
    const newQuantity = isExistingProduct?.quantity + quantity;
    return await productModel.findOneAndUpdate(
      { _id: id },
      { quantity: newQuantity },
      { new: true }
    );
  });
  // Delete the Order
  return Model.deleteOne({ id });
};

const approve = async (id, payload) => {
  const { status, updated_at, updated_by } = payload;
  return Model.findOneAndUpdate(
    { id },
    { status, updated_at, updated_by },
    { new: true }
  );
};

module.exports = { approve, create, getById, list, remove, updateById };
