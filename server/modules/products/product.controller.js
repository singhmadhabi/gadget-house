const Model = require("./product.model");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const create = async (payload) => {
  return Model.create(payload);
};

const list = async (limit = 10, page = 1, search) => {
  const query = [];
  if (search?.name) {
    query.push({
      $match: {
        name: new RegExp(search?.name, "gi"),
      },
    });
  }
  query.push({
    $match: {
      isArchived: search.isArchived ? true : false,
    },
  });
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

const getById = async (id) => {
  const product = await Model.aggregate([
    {
      $match: {
        _id: new ObjectId(id),
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "category_name",
      },
    },
    {
      $unwind: {
        path: "$category_name",
        preserveNullAndEmptyArrays: false,
      },
    },
    {
      $addFields: {
        category_name: "$category_name.name",
      },
    },
  ]);
  if (product.length === 0) return {};
  return product[0];
};

const updateById = (id, payload) => {
  return Model.findOneAndUpdate({ _id: id }, payload, { new: true });
};

const remove = (id, payload) => {
  return Model.findOneAndUpdate({ _id: id }, payload, { new: true });
};

module.exports = { create, list, getById, updateById, remove };
