const Champion = require("./Champion");
const Rol = require("./Rol");
const Faction = require("./Faction");
const Position = require("./Position");
const Region = require("./Region");
const Resource = require("./Resource");
const Specie = require("./Specie");
const Year = require("./Year");
const Range = require("./Range");
const AdaptiveType = require("./AdaptiveType");
const BluePrice = require("./BluePrice");
const RPPrice = require("./RPPrice");

Champion.belongsToMany(Rol, { through: "rolchampion" });
Rol.belongsToMany(Champion, { through: "rolchampion" });

Champion.belongsTo(Faction);
Faction.belongsToMany(Champion, { through: "factionchampion" });

Champion.belongsToMany(Position, { through: "positionchampion" });
Position.belongsToMany(Champion, { through: "positionchampion" });

//Champion.hasOne(Region, { as: "Origin" });
//Region.belongsToMany(Champion, { through: "originchampion" });

Champion.belongsToMany(Region, { through: "regionchampion" });
Region.belongsToMany(Champion, { through: "regionchampion" });

Champion.belongsTo(Resource);
Resource.belongsToMany(Champion, { through: "resourcechampion" });

Champion.belongsToMany(Specie, { through: "speciechampion" });
Specie.belongsToMany(Champion, { through: "speciechampion" });

Champion.belongsTo(Year);
Year.belongsToMany(Champion, { through: "yearchampion" });

Champion.belongsTo(Range);
Range.belongsToMany(Champion, { through: "rangechampion" });

Champion.belongsTo(AdaptiveType);
AdaptiveType.belongsToMany(Champion, { through: "adaptivetypechampion" });

Champion.belongsTo(BluePrice);
BluePrice.belongsToMany(Champion, { through: "bluepricechampion" });

Champion.belongsTo(RPPrice);
RPPrice.belongsToMany(Champion, { through: "rppricechampion" });

module.exports = {
  Champion,
  Rol,
  Faction,
  Position,
  Region,
  Resource,
  Specie,
  Year,
  Range,
  AdaptiveType,
  BluePrice,
  RPPrice,
};
