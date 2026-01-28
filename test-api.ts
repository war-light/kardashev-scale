import { WorldDataService } from "./lib/api-service";

async function test() {
  console.log("Testing WorldDataService...");

  console.log("Fetching Population...");
  const pop = await WorldDataService.getPopulation();
  console.log("Population sample:", pop?.slice(0, 2));

  console.log("Fetching Life Expectancy...");
  const life = await WorldDataService.getLifeExpectancy();
  console.log("Life Expectancy sample:", life?.slice(0, 2));

  console.log("Fetching Poverty Rate...");
  const poverty = await WorldDataService.getPovertyRate();
  console.log("Poverty sample:", poverty?.slice(0, 2));
}

test();
