import React, { useState } from "react";
import { getPlayerAchievements, getGameDetails } from "../services/SteamApi";
import AchievementList from "../component/AchievementList";
import "./homePage.css";

const HomePage = () => {
  const [steamId, setSteamId] = useState("");
  const [appId, setAppId] = useState("");
  const [achievements, setAchievements] = useState([]);
  const [gameDetails, setGameDetails] = useState(null);
  const [error, setError] = useState(null);

  const fetchAchievements = async () => {
    setError(null);
    try {
      const [achievementResponse, gameDetailsResponse] = await Promise.all([
        getPlayerAchievements(steamId, appId),
        getGameDetails(appId),
      ]);
      const achievements = achievementResponse.data.playerstats.achievements;
      const achievementDetails =
        gameDetailsResponse.data.game.availableGameStats.achievements;

      const combinedAchievements = achievements.map((achievement) => {
        const detail = achievementDetails.find(
          (e) => e.name === achievement.apiname
        );

        return {
          ...achievement,
          displayName: detail ? detail.displayName : achievement.apiname,
        };
      });

      setAchievements(combinedAchievements);
      setGameDetails(gameDetailsResponse.data.game);
    } catch (error) {
      console.error("Error Fetching Data:", error);
      setError(
        "Error Fetching Data. Please check your Steam ID & App ID OR User has choosen not to show data."
      );
    }
  };
  return (
    <div className="homepage-wrapper">
      <div className="header">
        <h1>Steam Achievements Tracker</h1>
      </div>
      <div className="input">
        <input
          type="text"
          placeholder="Enter Steam ID"
          value={steamId}
          onChange={(e) => setSteamId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter App ID"
          value={appId}
          onChange={(e) => setAppId(e.target.value)}
        />

        <button onClick={fetchAchievements}>Fetch Achievements</button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/*Conditionally renders the game name if gameDetails is not null.*/}
      {gameDetails && <h2 className="game-name">{gameDetails.gameName}</h2>}
      <AchievementList achievements={achievements} />
    </div>
  );
};
export default HomePage;
