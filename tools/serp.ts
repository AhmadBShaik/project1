import { SerpAPI } from "langchain/tools";

export const Serp = new SerpAPI(process.env.NEXT_PUBLIC_SERPAPI_API_KEY, {
  location: "Austin,Texas,United States",
  hl: "en",
  gl: "us",
});
