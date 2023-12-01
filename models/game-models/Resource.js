const S = require("sequelize");
const sequelize = require("../../config/db");

class Resource extends S.Model {}

Resource.init(
  {
    name: {
      type: S.DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: "No resource",
        },
      },
    },
  },
  { sequelize, modelName: "resource" }
);

module.exports = Resource;
