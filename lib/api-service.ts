/**
 * Service to fetch world indicators from World Bank and EIA APIs.
 */

const WORLD_BANK_BASE_URL = "https://api.worldbank.org/v2";
const EIA_BASE_URL = "https://api.eia.gov/v2";

export interface WorldBankResponse {
  indicator: { id: string; value: string };
  country: { id: string; value: string };
  countryiso3code: string;
  date: string;
  value: number | null;
  unit: string;
  obs_status: string;
  decimal: number;
}

export class WorldDataService {
  private static async fetchWB(indicator: string, country: string = "WLD") {
    try {
      const response = await fetch(
        `${WORLD_BANK_BASE_URL}/country/${country}/indicator/${indicator}?format=json&per_page=100`,
      );
      const data = await response.json();
      // World Bank returns [metadata, data]
      return data[1] as WorldBankResponse[];
    } catch (error) {
      console.error(`Error fetching World Bank indicator ${indicator}:`, error);
      return [];
    }
  }

  private static async fetchEIA(path: string, params: Record<string, string> = {}) {
    const apiKey = process.env.NEXT_PUBLIC_EIA_API_KEY || process.env.EIA_API_KEY;
    if (!apiKey) {
      console.warn("EIA API Key is missing. Energy data might be unavailable.");
      return null;
    }

    const queryParams = new URLSearchParams({
      api_key: apiKey,
      ...params,
    });

    try {
      const response = await fetch(`${EIA_BASE_URL}${path}?${queryParams.toString()}`);
      return await response.json();
    } catch (error) {
      console.error(`Error fetching EIA data from ${path}:`, error);
      return null;
    }
  }

  /**
   * Fetches World Population history.
   */
  static async getPopulation() {
    return this.fetchWB("SP.POP.TOTL");
  }

  /**
   * Fetches World Poverty Rate history.
   */
  static async getPovertyRate() {
    return this.fetchWB("SI.POV.DDAY");
  }

  /**
   * Fetches World Life Expectancy history.
   */
  static async getLifeExpectancy() {
    return this.fetchWB("SP.DYN.LE00.IN");
  }

  /**
   * Fetches World Energy Usage per capita.
   */
  static async getEnergyUsagePerCapita() {
    return this.fetchWB("EG.USE.PCAP.KG.OE");
  }

  /**
   * Fetches Historical International Energy Consumption from EIA.
   */
  static async getEnergyConsumptionHistory() {
    return this.fetchEIA("/international/data/", {
      frequency: "annual",
      data: "value",
      facets: JSON.stringify({
        activityId: ["1"], // Consumption
        productId: ["44"], // Total Primary Energy
        regionId: ["WORL"], // World
      }),
    });
  }

  /**
   * Fetches Future Energy Projections (IEO) from EIA.
   */
  static async getEnergyProjections() {
    return this.fetchEIA("/ieo/data/", {
      frequency: "annual",
      data: "value",
      facets: JSON.stringify({
        scenario: ["reference"],
        regionId: ["wor"], // World
      }),
    });
  }

  /**
   * Fetches Top 5 Countries by Life Expectancy.
   */
  static async getTopCountriesLifeExpectancy() {
    try {
      // Fetch latest data for all countries (using 2023 as it has good coverage)
      const response = await fetch(
        `${WORLD_BANK_BASE_URL}/country/all/indicator/SP.DYN.LE00.IN?format=json&per_page=300&date=2023`,
      );
      const data = await response.json();
      const countries = data[1] as WorldBankResponse[];

      if (!countries) return [];

      // Filter out aggregates and entries with null values
      const filtered = countries.filter(
        (c) =>
          c.value !== null &&
          c.countryiso3code !== "" &&
          // Filter out some common aggregate codes
          !["WLD", "HIC", "LMC", "UMC", "LIC", "EAS", "ECS", "LCN", "MEA", "NAC", "SAS", "SSF"].includes(
            c.countryiso3code,
          ),
      );

      // Sort by value descending and take top 5
      return filtered.sort((a, b) => (b.value || 0) - (a.value || 0)).slice(0, 5);
    } catch (error) {
      console.error("Error fetching top countries life expectancy:", error);
      return [];
    }
  }
}
