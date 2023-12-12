const S = require("sequelize");
const sequelize = require("../../config/db");

class Faction extends S.Model {}

Faction.init(
  {
    name: {
      type: S.DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: "No faction",
        },
      },
    },
  },
  { sequelize, modelName: "faction" }
);

module.exports = Faction;
