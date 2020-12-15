export const BASE_URL = "https://api.tenor.com/v1";

export const getUrl = (query: string, limit: number) => `${BASE_URL}/search?q=${query}&key=LIVDSRZULELA&limit=${limit}`;
