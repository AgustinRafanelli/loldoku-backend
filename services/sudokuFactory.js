const {
  Champion,
  Rol,
  Faction,
  Position,
  Region,
  Resource,
  Specie,
  Range,
  AdaptiveType,
  BluePrice,
  RPPrice,
  Year,
} = require("../app/models");
const Sequelize = require("sequelize");

const matrizValidator = async (matriz) => {
  const matris = [[{ range: "Melee" }], [{ adaptiveType: "Physical" }]];

  const count = await Champion.findAll({
    order: Sequelize.literal("random()"),
    limit: 1,
  }).then((champion) => {
    //console.log(champion);
    return champion;
  });

  /* return Promise.all(matris[0].map(async(colum) => {
    return await Champion.count({
      where: { range: "Melee", adaptiveType: "Physical" },
    })
      .then((value) => value)
  })); */
  return count;
};

const matrizFactory = async (chosenFields) => {
  const promisedMatriz = await chosenFields.map((field) => {
    return field
      .findAll({
        order: Sequelize.literal("random()"),
        limit: 1,
      })
      .then((value) => {
        const entry = {
          category: field.tableName,
          value: value[0].name,
          valueId: value[0].id,
        };
        return entry;
      });
  });
  const entries = await Promise.all(promisedMatriz);
  return [
    [entries[0], entries[1], entries[2]],
    [entries[3], entries[4], entries[5]],
  ];
};

const createSudoku = () => {
  const fields = [
    Rol,
    Faction,
    Position,
    Region,
    Resource,
    Specie,
    Range,
    AdaptiveType,
    BluePrice,
    RPPrice,
    Year /*, 
    "SkinAmount", */,
  ];
  const chosenFields = [];
  const notFactionAndRegion = (field)=>{
    if(field === Faction){
      return !chosenFields.includes(Region)
    }
    if(field === Region){
      return !chosenFields.includes(Faction)
    }
    return true
  }
  const notBluePriceAndRPPrice = (field)=>{
    if(field === BluePrice){
      return !chosenFields.includes(RPPrice)
    }
    if(field === RPPrice){
      return !chosenFields.includes(BluePrice)
    }
    return true
  }
  while (chosenFields.length != 6) {
    const field = Math.floor(Math.random() * fields.length);
    if (!chosenFields.includes(fields[field]) && notBluePriceAndRPPrice() && notFactionAndRegion()) {
      chosenFields.push(fields[field]);
    }
  }
  const matrizFinal = matrizFactory(chosenFields);
  return matrizFinal;
};

module.exports = createSudoku;
