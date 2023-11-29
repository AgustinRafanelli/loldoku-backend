const S = require("sequelize");
const sequelize = require("../config/db");

class Region extends S.Model {}

Region.init(
  {
    name: {
      type: S.DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "No region name",
        },
      },
    },
  },
  { sequelize, modelName: "region" }
);

module.exports = Region;
