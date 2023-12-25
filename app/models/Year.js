const S = require("sequelize");
const sequelize = require("../../config/db");

class Year extends S.Model {}

Year.init(
  {
    name: {
      type: S.DataTypes.INTEGER,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: "No year",
        },
      },
    },
  },
  { sequelize, modelName: "year" }
);

module.exports = Year;
