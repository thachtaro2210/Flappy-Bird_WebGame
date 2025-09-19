import { useState, useEffect } from "react";
import { Achievement } from "../types";
import { achievementDefinitions, ACHIEVEMENT_DISPLAY_TIME } from "../constants";

export const useAchievements = () => {
  const [achievements, setAchievements] = useState<Achievement[]>(achievementDefinitions);
  const [showAchievement, setShowAchievement] = useState<Achievement | null>(null);

  const checkAchievements = (type: string, value: number, setGameStats: (stats: GameStats) => void) => {
    setAchievements((prev) => {
      const updated = [...prev];
      let hasNewAchievement = false;

      updated.forEach((achievement) => {
        if (achievement.unlocked) return;

        let shouldUpdate = false;
        let newProgress = achievement.progress;

        switch (achievement.id) {
          case "first_score":
            if (type === "score" && value >= 1) {
              newProgress = 1;
              shouldUpdate = true;
            }
            break;
          case "score_5":
          case "score_10":
          case "score_25":
            if (type === "score") {
              newProgress = Math.min(value, achievement.target);
              shouldUpdate = true;
            }
            break;
          case "collector":
            if (type === "item") {
              newProgress = Math.min(newProgress + 1, achievement.target);
              shouldUpdate = true;
            }
            break;
          case "survivor":
            if (type === "survival") {
              newProgress = Math.min(value, achievement.target);
              shouldUpdate = true;
            }
            break;
          case "combo_master":
            if (type === "combo") {
              newProgress = Math.max(newProgress, value);
              shouldUpdate = true;
            }
            break;
          case "all_maps":
            const unlockedMaps = mapConfigs.filter((map) => map.unlocked).length;
            newProgress = unlockedMaps;
            shouldUpdate = true;
            break;
        }

        if (shouldUpdate) {
          achievement.progress = newProgress;
          if (newProgress >= achievement.target && !achievement.unlocked) {
            achievement.unlocked = true;
            hasNewAchievement = true;
            setShowAchievement(achievement);
            setGameStats((prev) => ({
              ...prev,
              totalPoints: prev.totalPoints + achievement.reward,
            }));
            setTimeout(() => setShowAchievement(null), ACHIEVEMENT_DISPLAY_TIME);
          }
        }
      });

      localStorage.setItem("achievements", JSON.stringify(updated));
      return updated;
    });
  };

  useEffect(() => {
    const savedAchievements = localStorage.getItem("achievements");
    if (savedAchievements) {
      setAchievements(JSON.parse(savedAchievements));
    }
  }, []);

  return { achievements, setAchievements, showAchievement, setShowAchievement, checkAchievements };
};