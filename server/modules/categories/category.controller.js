const slugify = require("slugify");
const Model = require("./category.model");
const productModel = require("../products/product.model");

const slugGenerator = (payload) => {
  return slugify(payload, { lower: true });
};

const create = async (payload) => {
  payload.slug = slugGenerator(payload.name);
  if (payload.slug) {
    const isAvailable = await Model.findOne({ slug: payload.slug });
    if (isAvailable) throw new Error("Category name is already in use");
  }
  return Model.create(payload);
};

const list = async (limit = 10, page = 1, search) => {
  page = page < 1 ? 1 : page;
  const query = [];
  if (search?.name) {
    query.push({
      $match: {
        name: new RegExp(search?.name, "gi"),
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

const getById = (id) => {
  return Model.findOne({ _id: id });
};

const updateById = async (id, payload) => {
  if (payload.name) {
    payload.slug = slugGenerator(payload.name);
    const isAvailable = await Model.findOne({ slug: payload.slug });
    if (isAvailable) throw new Error("Category name is already in use");
  }
  return Model.findOneAndUpdate({ _id: id }, payload, { new: true });
};

const remove = async (id) => {
  const product = await productModel.findOne({ category: id });
  if (product)
    throw new Error(
      `Remove category from product name ${product.name} to continue`
    );
  return Model.deleteOne({ _id: id });
};

module.exports = { create, list, getById, updateById, remove };
