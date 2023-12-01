const Champion = require("./Champion");
const Class = require("./Class");
const Faction = require("./Faction");
const Position = require("./Position");
const Region = require("./Region");
const Resource = require("./Resource");
const Specie = require("./Specie");

Champion.hasOne(Class);
Class.belongsToMany(Champion, { through: "claschampion" });

Champion.hasOne(Faction);
Faction.belongsToMany(Champion, { through: "factionchampion" });

Champion.hasMany(Position);
Position.belongsToMany(Champion, { through: "positionchampion" });

Champion.hasOne(Region, { as: "Origin" });
Region.belongsToMany(Champion, { through: "originchampion" });

Champion.hasMany(Region);
Region.belongsToMany(Champion, { through: "regionchampion" });

Champion.hasOne(Resource);
Resource.belongsToMany(Champion, { through: "resourceChampion" });

Champion.hasMany(Specie);
Specie.belongsToMany(Champion, { through: "specieChampion" });

module.exports = {
  Champion,
  Class,
  Faction,
  Position,
  Region,
  Resource,
  Specie,
};
