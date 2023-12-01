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
          msg: "No name",
        },
      },
    },
    square: {
      type: S.DataTypes.STRING,
    },
    date: {
      type: S.DataTypes.DATE,
      validate: {
        notEmpty: {
          args: true,
          msg: "No date",
        },
      },
    },
    range: {
      type: S.DataTypes.ENUM("Ranged", "Melee"),
      validate: {
        notEmpty: {
          args: true,
          msg: "No range specified",
        },
      },
    },
    range: {
      type: S.DataTypes.ENUM("Ranged", "Melee"),
      validate: {
        notEmpty: {
          args: true,
          msg: "No range specified",
        },
      },
    },
    adaptiveType: {
      type: S.DataTypes.ENUM("Magic", "Physical"),
      validate: {
        notEmpty: {
          args: true,
          msg: "No range specified",
        },
      },
    },
    bluePrice: {
      type: S.DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: "No blue price",
        },
      },
    },
    rPPrice: {
      type: S.DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: "No riot point price",
        },
      },
    },
    skinsAmount: {
      type: S.DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: "No skins amount",
        },
      },
    },
  },
  { sequelize, modelName: "champion" }
);

module.exports = Champion;
