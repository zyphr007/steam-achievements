import React from "react";
import "./achievementsList.css";
const AchievementList = ({ achievements }) => {
  return (
    <div className="achievementList-wrapper">
      <ul>
        {achievements.map((achievement, index) => {
          return (
            <li key={index}>
              <div className="title"> {achievement.apiname}</div>
              <div className="achievement-name">{achievement.displayName}</div>
              <div className="achievement-achieved">
                {achievement.achieved ? "Unlocked" : "Locked"}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default AchievementList;
