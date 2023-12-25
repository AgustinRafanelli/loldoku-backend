const S = require("sequelize");
const sequelize = require("../../config/db");

class BluePrice extends S.Model {}

BluePrice.init(
  {
    name: {
      type: S.DataTypes.INTEGER,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: "No blue price",
        },
      },
    },
  },
  { sequelize, modelName: "bluePrice" }
);

module.exports = BluePrice;
