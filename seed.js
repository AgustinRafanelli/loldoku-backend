const fs = require("fs");
const db = require("./config/db");
const csv = require("csv-parse");
const {
  Champion,
  Class,
  Faction,
  Position,
  Region,
  Resource,
  Specie,
} = require("./models/game-models");

const championTranslator = (data) => {
  let parsedData = {};
  data.forEach((champion, i) => {
    //Name
    if (!parsedData[champion.Name]) parsedData[champion.Name] = {};
    //Species
    if (champion.Species.length > 2) {
      if (champion.Species.includes("Unknown")) {
        parsedData[champion.Name]["species"] = "Unknown";
      } else {
        let species = [];
        const speciesObj = JSON.parse(champion.Species);
        speciesObj.forEach((specie, i) => {
          if (i != 0) species.push(specie.Species);
        });
        parsedData[champion.Name]["species"] = species;
      }
    }
    //Region
    if (champion.Region.length > 2) {
      let regions = [];
      const regionsObj = JSON.parse(champion.Region);
      regionsObj.forEach((region, i) => {
        regions.push(region.Region);
      });
      parsedData[champion.Name]["region"] = regions;
    }
    //Origin
    if (champion.Origin.length > 2) {
      const originObj = JSON.parse(champion.Origin);
      parsedData[champion.Name]["origin"] =
        originObj[originObj.length - 1].Origin;
    }
    //Faction
    parsedData[champion.Name]["faction"] = champion.Faction;
    //Release Data
    if (!!champion.Date) {
      parsedData[champion.Name]["date"] = Date.parse(champion.Date);
    }
    //Class
    if (!!champion.Class) {
      parsedData[champion.Name]["class"] = champion.Class;
    }
    //Position
    if (champion.Position.length > 2) {
      let positions = [];
      const positionsObj = JSON.parse(champion.Position);
      positionsObj.forEach((position, i) => {
        positions.push(position.Position);
      });
      parsedData[champion.Name]["position"] = positions;
    }
    //Range
    if (!!champion.Range) {
      parsedData[champion.Name]["range"] = champion.Range;
    }
    //adaptiveType
    if (!!champion.AdaptiveType) {
      parsedData[champion.Name]["range"] = champion.Range;
    }
    //Range
    if (!!champion.Range) {
      parsedData[champion.Name]["range"] = champion.Range;
    }
    //Resource
    if (!!champion.Resource) {
      parsedData[champion.Name]["resource"] = champion.Resource;
    }
    //Blue Price
    if (champion.BluePrice !== "Reference") {
      parsedData[champion.Name]["bluePrice"] = champion.BluePrice;
    }
    //RP Price
    if (!!champion.RPprice) {
      parsedData[champion.Name]["rPPrice"] = champion.RPprice;
    }
    //Skin amount
    if (champion.SkinAmount.length > 2) {
      const positionsObj = JSON.parse(champion.SkinAmount);
      parsedData[champion.Name]["skinsAmount"] = positionsObj.length - 1;
    }
  });
  return parsedData;
};

fs.readFile("../data/LolWiki.csv", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the CSV file:", err);
    return;
  }

  csv.parse(data, { columns: true }, (err, data) => {
    if (err) {
      console.error("Error parsing the CSV:", err);
      return;
    }

    const dataPrueba = [
      data[0],
      data[1],
      data[2],
      data[3],
      data[4],
      data[5],
      data[6],
      data[7],
      data[8],
      data[9],
      data[10],
      data[11],
    ];
    const translatedChampions = championTranslator(dataPrueba);
    console.log(translatedChampions);
  });
});
