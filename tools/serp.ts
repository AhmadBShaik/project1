import { SerpAPI } from "langchain/tools";

export const Serp = new SerpAPI(process.env.SERPAPI_API_KEY, {
  location: "Austin,Texas,United States",
  hl: "en",
  gl: "us",
});
