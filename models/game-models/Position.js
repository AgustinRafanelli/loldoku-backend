const S = require("sequelize");
const sequelize = require("../config/db");

class Position extends S.Model {}

Position.init(
  {
    name: {
      type: S.DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "No position",
        },
      },
    },
  },
  { sequelize, modelName: "position" }
);

module.exports = Position;
