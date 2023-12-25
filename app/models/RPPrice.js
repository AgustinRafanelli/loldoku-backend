const S = require("sequelize");
const sequelize = require("../../config/db");

class RPPrice extends S.Model {}

RPPrice.init(
  {
    name: {
      type: S.DataTypes.INTEGER,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: "No RP price",
        },
      },
    },
  },
  { sequelize, modelName: "rPPrice" }
);

module.exports = RPPrice;
