const Champion = require("./Champion");
const Class = require("./Class");
const Faction = require("./Faction");
const Position = require("./Position");
const Region = require("./Region");
const Resource = require("./Resource");
const Specie = require("./Specie");

Champion.hasOne(Class);
Class.belongsToMany(Champion);

Champion.hasOne(Faction);
Faction.belongsToMany(Champion);

Champion.hasMany(Position);
Position.belongsToMany(Champion);

Champion.hasOne(Region, {as: "Origin"});
Champion.hasMany(Region);
Region.belongsToMany(Champion);

Champion.hasOne(Resource)
Resource.belongsToMany(Champion)

Champion.hasMany(Specie);
Specie.belongsToMany(Champion);


module.exports = { Champion, Class, Faction, Position, Region, Resource, Specie };
