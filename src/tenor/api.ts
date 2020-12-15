import dotenv from "dotenv";

dotenv.config();

export const BASE_URL = "https://api.tenor.com/v1";

export const getUrl = (query: string, limit: number) => {
	const key = process.env.TENOR_KEY || "LIVDSRZULELA";
	return `${BASE_URL}/search?q=${query}&limit=${limit}` + "&locale=es_AR" + "&contentfilter=high" + `&key=${key}`;
};
