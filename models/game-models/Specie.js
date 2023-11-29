const S = require("sequelize");
const sequelize = require("../config/db");

class Specie extends S.Model {}

Specie.init(
  {
    name: {
      type: S.DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "No specie",
        },
      },
    },
  },
  { sequelize, modelName: "specie" }
);

module.exports = Specie;
