const fs = require("fs");
const db = require("./config/db");
const csv = require("csv-parse");
const {
  Champion,
  Rol,
  Faction,
  Position,
  Region,
  Resource,
  Specie,
} = require("./models/game-models");
const { ValidationError } = require("sequelize");

const championTranslator = (data) => {
  let championsData = {};

  let rolsData = [];
  let factionsData = ["No Faction"];
  let positionsData = [];
  let regionsData = [];
  let resourceData = [];
  let speciesData = ["Unknown", "Vastaya", "Golem"];

  data.forEach((champion, i) => {
    //Name
    const url = champion["web-scraper-start-url"].split("/");
    const name =
      url[url.length - 1] === "LoL"
        ? url[url.length - 2].replace("_", " ")
        : url[url.length - 1].replace("_", " ");

    if (!championsData[name]) championsData[name] = {};
    //Species
    if (champion.Species.length > 2) {
      if (
        champion.Species.includes("Unknown") &&
        !champion.Species.includes("Voidborn")
      ) {
        championsData[name]["specie"] = ["Unknown"];
      } else {
        let species = [];
        const speciesObj = JSON.parse(champion.Species);
        speciesObj.forEach((specie, i) => {
          if (i != 0) {
            species.push(specie.Species);
            if (
              !species.includes("Golem") &&
              specie.Species.includes("Golem")
            ) {
              species.push("Golem");
            }
            if (!speciesData.includes(specie.Species)) {
              speciesData.push(specie.Species);
            }
          }
        });
        championsData[name]["specie"] = species;
      }
    }
    //Region
    if (champion.Region.length > 2) {
      let regions = [];
      const regionsObj = JSON.parse(champion.Region);
      regionsObj.forEach((region, i) => {
        regions.push(region.Region);
        if (!regionsData.includes(region.Region)) {
          regionsData.push(region.Region);
        }
      });
      championsData[name]["region"] = regions;
    }
    //Origin
    /* if (champion.Origin.length > 2) {
      const originObj = JSON.parse(champion.Origin);
      parsedData[name]["origin"] =
        originObj[originObj.length - 1].Origin;
    } */
    //Faction
    if (!!champion.Faction) {
      if (champion.Faction == "Vastaya") {
        championsData[name]["specie"].push(champion.Faction);
      }
      championsData[name]["faction"] = champion.Faction;
      if (!factionsData.includes(champion.Faction)) {
        factionsData.push(champion.Faction);
      }
    } else if (!championsData[name]["faction"]) {
      championsData[name]["faction"] = "No Faction";
    }
    if (!!champion.Date) {
      //Release Data
      championsData[name]["date"] = Date.parse(champion.Date);
    }
    //Rol
    if (!!champion.Rol) {
      if (championsData[name]["rol"]) {
        championsData[name]["rol"].push(champion.Rol);
      } else {
        championsData[name]["rol"] = [champion.Rol];
      }
      if (!rolsData.includes(champion.Rol)) {
        rolsData.push(champion.Rol);
      }
    }
    /* if (champion.Rol.length > 2) {
      let Rols = [];
      const RolsObj = JSON.parse(champion.Rol);
      RolsObj.forEach((Rol, i) => {
        Rols.push(Rol.Rol);
        if (!RolData.includes(Rol.Rol)) {
          RolData.push(Rol.Rol);
        }
      });
      parsedData[name]["Rol"] = Rols;
    } */
    //Position
    if (champion.Position.length > 2) {
      let positions = [];
      const positionsObj = JSON.parse(champion.Position);
      positionsObj.forEach((position, i) => {
        if (!positions.includes(position.Position)) {
          positions.push(position.Position);
        }
        if (!positionsData.includes(position.Position)) {
          positionsData.push(position.Position);
        }
      });
      championsData[name]["position"] = positions;
    }
    //Range
    if (!!champion.Range) {
      championsData[name]["range"] = champion.Range;
    }
    //AdaptiveType
    if (!!champion.AdaptiveType) {
      championsData[name]["adaptiveType"] = champion.AdaptiveType;
    }
    //Resource
    if (!!champion.Resource) {
      championsData[name]["resource"] = champion.Resource;
      if (!resourceData.includes(champion.Resource)) {
        resourceData.push(champion.Resource);
      }
    }
    //Blue Price
    const bluePrice = parseInt(champion.BluePrice);
    if (champion.BluePrice !== "Reference" && !Number.isNaN(bluePrice)) {
      championsData[name]["bluePrice"] = bluePrice;
    }
    //RP Price
    if (!!champion.RPprice) {
      championsData[name]["rPPrice"] = parseInt(champion.RPprice);
    }
    //Skin amount
    if (champion.SkinAmount.length > 2) {
      const positionsObj = JSON.parse(champion.SkinAmount);
      championsData[name]["skinsAmount"] = positionsObj.length - 1;
    }
  });

  return [
    rolsData,
    championsData,
    factionsData,
    positionsData,
    regionsData,
    resourceData,
    speciesData,
  ];
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

    const [
      rolsList,
      championsList,
      factionsList,
      positionsList,
      regionsList,
      resourceList,
      speciesList,
    ] = championTranslator(data);

    //Upload to the database

    const setupSeed = async () => {
      console.log("SEED STARTING");

      const rols = await Promise.all(
        rolsList.map(async (rol) => {
          return await Rol.create({ name: rol });
        })
      );

      const factions = await Promise.all(
        factionsList.map(async (faction) => {
          return await Faction.create({ name: faction });
        })
      );

      const positions = await Promise.all(
        positionsList.map(async (position) => {
          return await Position.create({ name: position });
        })
      );

      const regions = await Promise.all(
        regionsList.map(async (region) => {
          return await Region.create({ name: region });
        })
      );

      const resources = await Promise.all(
        resourceList.map(async (resource) => {
          return await Resource.create({ name: resource });
        })
      );

      const species = await Promise.all(
        speciesList.map(async (specie) => {
          return await Specie.create({ name: specie });
        })
      );

      const listFilter = (querys, list) => {
        const search = Array.isArray(querys)
          ? querys.filter(
              (obj, index) =>
                querys.findIndex((item) => item.location === obj.location) ===
                index
            )
          : [querys];
        return search.map((query) => {
          return list.find((element) => element.name === query);
        });
      };

      const championsKeys = Object.keys(championsList);
      const champions = await Promise.all(
        championsKeys.map(async (name) => {
          return await Champion.create({
            name: name,
            date: championsList[name].date,
            range: championsList[name].range,
            adaptiveType: championsList[name].adaptiveType,
            bluePrice: championsList[name].bluePrice,
            rPPrice: championsList[name].rPPrice,
            skinsAmount: championsList[name].skinsAmount,
          }).then(async (champion) => {
            await db.transaction(async (t) => {
              await champion.setRols(
                listFilter(championsList[name].rol, rols),
                { transaction: t }
              );
              await champion.setResource(
                ...listFilter(championsList[name].resource, resources),
                { transaction: t }
              );
              await champion.setRegions(
                listFilter(championsList[name].region, regions),
                { transaction: t }
              );
              await champion.setPositions(
                listFilter(championsList[name].position, positions),
                { transaction: t }
              );
              await champion.setFaction(
                ...listFilter(championsList[name].faction, factions),
                { transaction: t }
              );

              await champion.setSpecies(
                listFilter(championsList[name].specie, species),
                { transaction: t }
              );
              return champion;
            });
          });
        })
      );

      console.log("Products Seed...");
      return Promise.all([
        rols,
        factions,
        positions,
        regions,
        resources,
        species,
        champions,
      ]);
    };

    db.sync({ force: true })
      .then(setupSeed)
      .then(() => {
        console.log("Seed succesfully");
        process.exit(0);
      })
      .catch((err) => {
        console.log("Somethin went wrong on the seed process", err.message);
        if (err instanceof ValidationError) {
          err.errors.forEach((error) => {
            console.log(error);
          });
        }
        process.exit(1);
      });
  });
});
