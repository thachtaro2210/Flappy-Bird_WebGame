import { useState, useCallback, useEffect } from "react";
import {
  Bird,
  Pipe,
  Item,
  GameStats,
  Achievement,
  Challenge,
  Particle,
  PowerUpgrade,
  LeaderboardEntry,
} from "../types";
import { mapConfigs, achievementDefinitions, SHIELD_DURATION, BOOST_DURATION, COMBO_THRESHOLD, MAX_COMBO, ACHIEVEMENT_DISPLAY_TIME } from "../constants";

export const useGameLogic = () => {
  const [bird, setBird] = useState<Bird>({ y: 200, velocity: 0, frame: 0 });
  const [pipes, setPipes] = useState<Pipe[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [gameStats, setGameStats] = useState<GameStats>({
    currentScore: 0,
    highScore: 0,
    totalPoints: 1250,
    gamesPlayed: 0,
  });
  const [currentMap, setCurrentMap] = useState(0);
  const [showPointsBoard, setShowPointsBoard] = useState(false);
  const [showMapSelector, setShowMapSelector] = useState(false);
  const [showUpgrades, setShowUpgrades] = useState(false);
  const [showChallenges, setShowChallenges] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showNameInput, setShowNameInput] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [achievements, setAchievements] = useState<Achievement[]>(achievementDefinitions);
  const [dailyChallenges, setDailyChallenges] = useState<Challenge[]>([]);
  const [combo, setCombo] = useState(0);
  const [comboMultiplier, setComboMultiplier] = useState(1);
  const [lastScoreTime, setLastScoreTime] = useState(0);
  const [showAchievement, setShowAchievement] = useState<Achievement | null>(null);
  const [shieldActive, setShieldActive] = useState(false);
  const [boostActive, setBoostActive] = useState(false);
  const [upgrades, setUpgrades] = useState<PowerUpgrade>({
    shieldDuration: 1,
    boostPower: 1,
    magnetRange: 0,
    extraLife: 0,
  });
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [gameStartTime, setGameStartTime] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);

  const playSound = useCallback((sound: HTMLAudioElement | null) => {
    if (sound && !gameOver) {
      sound.currentTime = 0;
      sound.play().catch(() => {});
    }
  }, [gameOver]);

  const createParticles = useCallback((x: number, y: number, color: string, count: number = 8) => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count;
      const velocity = 2 + Math.random() * 3;
      newParticles.push({
        x,
        y,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        life: 30 + Math.random() * 20,
        maxLife: 50,
        color,
        size: 2 + Math.random() * 3,
      });
    }
    setParticles((prev) => [...prev, ...newParticles]);
  }, []);

  const updateParticles = () => {
    setParticles((prev) => {
      return prev
        .map((particle) => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          vx: particle.vx * 0.98,
          vy: particle.vy * 0.98,
          life: particle.life - 1,
        }))
        .filter((particle) => particle.life > 0);
    });
  };

  const updateCombo = useCallback(() => {
    const now = Date.now();
    if (now - lastScoreTime < 2000) {
      setCombo((prev) => Math.min(prev + 1, MAX_COMBO));
    } else {
      setCombo(0);
    }
    setLastScoreTime(now);
    setComboMultiplier(1 + combo * 0.2);
  }, [lastScoreTime, combo]);

  const checkAchievements = useCallback((type: string, value: number) => {
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

      return updated;
    });
  }, []);

  const generateDailyChallenges = (): Challenge[] => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const challengeTemplates = [
      {
        id: "daily_score_5",
        name: "Điểm Số Cơ Bản",
        description: "Đạt 5 điểm trong 1 lần chơi",
        target: 5,
        reward: 100,
      },
      {
        id: "daily_survive_30",
        name: "Sống Sót",
        description: "Sống sót 30 giây",
        target: 30,
        reward: 150,
      },
      {
        id: "daily_collect_3",
        name: "Thu Thập",
        description: "Nhặt 3 vật phẩm",
        target: 3,
        reward: 120,
      },
      {
        id: "daily_no_shield",
        name: "Thử Thách Khó",
        description: "Đạt 3 điểm không dùng shield",
        target: 3,
        reward: 200,
      },
      {
        id: "daily_combo_3",
        name: "Combo Streak",
        description: "Đạt combo x3",
        target: 3,
        reward: 180,
      },
    ];

    const shuffled = [...challengeTemplates].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 3);

    return selected.map((template) => ({
      ...template,
      progress: 0,
      completed: false,
      expiresAt: tomorrow,
    }));
  };

  const updateChallengeProgress = useCallback((type: string, value: number) => {
    setDailyChallenges((prev) => {
      const updated = prev.map((challenge) => {
        if (challenge.completed) return challenge;

        let shouldUpdate = false;
        let newProgress = challenge.progress;

        switch (challenge.id) {
          case "daily_score_5":
            if (type === "score" && value >= 5) {
              newProgress = 5;
              shouldUpdate = true;
            }
            break;
          case "daily_survive_30":
            if (type === "survival") {
              newProgress = Math.min(value, 30);
              shouldUpdate = true;
            }
            break;
          case "daily_collect_3":
            if (type === "item") {
              newProgress = Math.min(newProgress + 1, 3);
              shouldUpdate = true;
            }
            break;
          case "daily_combo_3":
            if (type === "combo") {
              newProgress = Math.max(newProgress, value);
              shouldUpdate = true;
            }
            break;
        }

        if (shouldUpdate) {
          const updated = { ...challenge, progress: newProgress };
          if (newProgress >= challenge.target && !challenge.completed) {
            updated.completed = true;
            setGameStats((prev) => ({
              ...prev,
              totalPoints: prev.totalPoints + challenge.reward,
            }));
          }
          return updated;
        }

        return challenge;
      });

      localStorage.setItem("dailyChallenges", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const jump = useCallback(() => {
    if (!gameOver && gameStarted && !isPaused) {
      const jumpStrength = boostActive ? 5 * 1.2 : 5;
      setBird((prevBird) => ({ ...prevBird, velocity: -jumpStrength }));
      playSound(null); // Cần truyền wingSound
    } else if (!gameStarted) {
      setGameStarted(true);
      setBird((prevBird) => ({ ...prevBird, velocity: -5 }));
      playSound(null); // Cần truyền wingSound
    }
  }, [gameOver, gameStarted, isPaused, boostActive, playSound]);

  const handlePause = () => {
    if (gameStarted && !gameOver) {
      setIsPaused(!isPaused);
    }
  };

  const restartGame = useCallback(() => {
    setGameStats((prev) => ({
      ...prev,
      currentScore: 0,
      highScore: Math.max(prev.highScore, score),
      totalPoints: prev.totalPoints + Math.floor(score * 10),
      gamesPlayed: prev.gamesPlayed + 1,
    }));
    setBird({ y: 200, velocity: 0, frame: 0 });
    setPipes([]);
    setScore(0);
    setGameOver(false);
    setGameStarted(true);
    setIsPaused(false);
  }, [score]);

  const shareScore = useCallback(() => {
    const shareText = `Tôi vừa đạt ${score} điểm trong Flappy Bird 2025! Bạn có thể beat được không?`;
    if (navigator.share) {
      navigator
        .share({
          title: "Flappy Bird 2025",
          text: shareText,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard
        .writeText(shareText + " " + window.location.href)
        .then(() => alert("Đã copy link chia sẻ!"))
        .catch(() => {});
    }
  }, [score]);

  const saveToLeaderboard = useCallback((playerName: string, finalScore: number) => {
    const newEntry = {
      name: playerName,
      score: finalScore,
      date: new Date().toISOString(),
    };
    setLeaderboard((prev) => {
      const updated = [...prev, newEntry].sort((a, b) => b.score - a.score).slice(0, 20);
      localStorage.setItem("leaderboard", JSON.stringify(updated));
      return updated;
    });
  }, []);

  const redeemVoucher = (cost: number, voucherName: string) => {
    if (gameStats.totalPoints >= cost) {
      setGameStats((prev) => ({
        ...prev,
        totalPoints: prev.totalPoints - cost,
      }));
      alert(`Đã đổi thành công ${voucherName}!`);
    } else {
      alert("Không đủ điểm để đổi voucher này!");
    }
  };

  const unlockMap = (mapIndex: number) => {
    const map = mapConfigs[mapIndex];
    if (gameStats.totalPoints >= map.cost && !map.unlocked) {
      setGameStats((prev) => ({
        ...prev,
        totalPoints: prev.totalPoints - map.cost,
      }));
      mapConfigs[mapIndex].unlocked = true;
      setCurrentMap(mapIndex);
      setShowMapSelector(false);
    }
  };

  const handleCanvasClick = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = event.currentTarget;
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const x = (event.clientX - rect.left) * scaleX;
      const y = (event.clientY - rect.top) * scaleY;

      if (gameOver) {
        if (
          x >= canvas.width / 2 - 50 &&
          x <= canvas.width / 2 + 50 &&
          y >= canvas.height / 2 + 50 &&
          y <= canvas.height / 2 + 90
        ) {
          restartGame();
        } else if (
          x >= canvas.width / 2 - 80 &&
          x <= canvas.width / 2 - 10 &&
          y >= canvas.height / 2 + 100 &&
          y <= canvas.height / 2 + 130
        ) {
          shareScore();
        } else if (
          x >= canvas.width / 2 + 10 &&
          x <= canvas.width / 2 + 80 &&
          y >= canvas.height / 2 + 100 &&
          y <= canvas.height / 2 + 130
        ) {
          setShowNameInput(true);
        }
      } else {
        jump();
      }
    },
    [gameOver, jump, restartGame, shareScore]
  );

  useEffect(() => {
    setAchievements(achievementDefinitions);
    const savedLeaderboard = localStorage.getItem("leaderboard");
    if (savedLeaderboard) {
      setLeaderboard(JSON.parse(savedLeaderboard));
    }
    const savedPlayerName = localStorage.getItem("playerName");
    if (savedPlayerName) {
      setPlayerName(savedPlayerName);
    }
    const savedUpgrades = localStorage.getItem("upgrades");
    if (savedUpgrades) {
      setUpgrades(JSON.parse(savedUpgrades));
    }
    const storedChallenges = localStorage.getItem("dailyChallenges");
    if (storedChallenges) {
      const parsed = JSON.parse(storedChallenges);
      const now = new Date();
      if (new Date(parsed[0]?.expiresAt) > now) {
        setDailyChallenges(parsed);
      } else {
        const newChallenges = generateDailyChallenges();
        setDailyChallenges(newChallenges);
        localStorage.setItem("dailyChallenges", JSON.stringify(newChallenges));
      }
    } else {
      const newChallenges = generateDailyChallenges();
      setDailyChallenges(newChallenges);
      localStorage.setItem("dailyChallenges", JSON.stringify(newChallenges));
    }
  }, []);

  useEffect(() => {
    if (gameStarted && !gameOver) {
      setGameStartTime(Date.now());
    }
  }, [gameStarted]);

  useEffect(() => {
    if (gameStarted && !gameOver) {
      const interval = setInterval(() => {
        const survivalTime = Math.floor((Date.now() - gameStartTime) / 1000);
        checkAchievements("survival", survivalTime);
        updateChallengeProgress("survival", survivalTime);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [gameStarted, gameOver, gameStartTime, checkAchievements, updateChallengeProgress]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        jump();
      } else if (e.code === "KeyP") {
        e.preventDefault();
        handlePause();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [jump]);

  useEffect(() => {
    setGameStats((prev) => ({ ...prev, currentScore: score }));
  }, [score]);

  return {
    bird,
    setBird,
    pipes,
    setPipes,
    items,
    setItems,
    score,
    setScore,
    gameOver,
    setGameOver,
    gameStarted,
    setGameStarted,
    isPaused,
    setIsPaused,
    gameStats,
    setGameStats,
    currentMap,
    setCurrentMap,
    showPointsBoard,
    setShowPointsBoard,
    showMapSelector,
    setShowMapSelector,
    showUpgrades,
    setShowUpgrades,
    showChallenges,
    setShowChallenges,
    showLeaderboard,
    setShowLeaderboard,
    showNameInput,
    setShowNameInput,
    playerName,
    setPlayerName,
    achievements,
    setAchievements,
    dailyChallenges,
    setDailyChallenges,
    combo,
    setCombo,
    comboMultiplier,
    setComboMultiplier,
    lastScoreTime,
    setLastScoreTime,
    showAchievement,
    setShowAchievement,
    shieldActive,
    setShieldActive,
    boostActive,
    setBoostActive,
    upgrades,
    setUpgrades,
    leaderboard,
    setLeaderboard,
    restartGame,
    shareScore,
    saveToLeaderboard,
    redeemVoucher,
    unlockMap,
    handlePause,
    handleCanvasClick,
    mapConfigs,
    createParticles,
    updateParticles,
    updateCombo,
    checkAchievements,
    updateChallengeProgress,
    playSound,
  };
};