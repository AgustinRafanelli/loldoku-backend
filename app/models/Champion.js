const S = require("sequelize");
const sequelize = require("../../config/db");

class Champion extends S.Model {}

Champion.init(
  {
    name: {
      type: S.DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: "No champion name",
        },
      },
    },
    skinsAmount: {
      type: S.DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: "No skin amount",
        },
      },
    },
  },
  { sequelize, modelName: "champion" }
);

module.exports = Champion;
