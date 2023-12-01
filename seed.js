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

    let processedData = {};
    const dataPrueba = [data[10], data[11]];
    dataPrueba.forEach((champion, i) => {
      processedData[champion.Name] = {};
      if (champion.Species.length > 2) {
        if (champion.Species.includes("Unknown")) {
          processedData[champion.Name]["species"] = "Unknown";
        } else {
          let species = [];
          const speciesObj = JSON.parse(champion.Species);
          speciesObj.forEach((specie, i) => {
            if (i != 0) species.push(specie.Species);
          });
          processedData[champion.Name]["species"] = species;
        }
      }

      if (champion.Region.length > 2) {
        let regions = [];
        const regionsObj = JSON.parse(champion.Region);
        regionsObj.forEach((region, i) => {
          regions.push(region.Region);
        });
        processedData[champion.Name]["region"] = regions;
      }

      if (champion.Origin.length > 2) {
        const originObj = JSON.parse(champion.Origin);
        processedData[champion.Name]["origin"] = originObj[originObj.length-1].Origin;
      }

      processedData[champion.Name]["faction"] = champion.Faction;

      processedData[champion.Name]["date"] = champion.Date;
    });
    console.log(processedData);
  });
});
