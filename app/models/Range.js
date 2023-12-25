const S = require("sequelize");
const sequelize = require("../../config/db");

class Range extends S.Model {}

Range.init(
  {
    name: {
      type: S.DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: "No range",
        },
      },
    },
  },
  { sequelize, modelName: "range" }
);

module.exports = Range;
