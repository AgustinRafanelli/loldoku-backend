const S = require("sequelize");
const sequelize = require("../../config/db");

class AdaptiveType extends S.Model {}

AdaptiveType.init(
  {
    name: {
      type: S.DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: "No adaptive type",
        },
      },
    },
  },
  { sequelize, modelName: "adaptiveType" }
);

module.exports = AdaptiveType;
