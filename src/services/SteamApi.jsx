import axios from "axios";

const apiKey = "A386D785B039955FDE0AEBF67411C4BD";

export const getPlayerAchievements = (steamId, appId) => {
  return axios.get(`/api/ISteamUserStats/GetPlayerAchievements/v0001/`, {
    params: {
      appid: appId,
      key: apiKey,
      steamid: steamId,
    },
  });
};

export const getGameDetails = (appId) => {
  return axios.get(`/api/ISteamUserStats/GetSchemaForGame/v2/`, {
    params: {
      key: apiKey,
      appid: appId,
    },
  });
};
