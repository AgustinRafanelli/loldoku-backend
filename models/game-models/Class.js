const S = require("sequelize");
const sequelize = require("../config/db");

class Class extends S.Model {}

Class.init(
  {
    name: {
      type: S.DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "No class",
        },
      },
    },
  },
  { sequelize, modelName: "class" }
);

module.exports = Class;
