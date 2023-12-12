const S = require("sequelize");
const sequelize = require("../../config/db");

class Rol extends S.Model {}

Rol.init(
  {
    name: {
      type: S.DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: "No rol",
        },
      },
    },
  },
  { sequelize, modelName: "rol" }
);

module.exports = Rol;
