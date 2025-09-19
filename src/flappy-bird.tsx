"use client";

import React from "react";
import { useGameLogic } from "./hooks/useGameLogic";
import { useAssets } from "./hooks/useAssets";
import GameCanvas from "./components/GameCanvas";
import PointsBoard from "./components/PointsBoard";
import MapSelector from "./components/MapSelector";
import UpgradesModal from "./components/UpgradesModal";
import ChallengesModal from "./components/ChallengesModal";
import LeaderboardModal from "./components/LeaderboardModal";
import NameInputModal from "./components/NameInputModal";
import { mapConfigs } from "./constants";

export default function FlappyBird() {
  const {
    bird,
    setBird,
    pipes,
    setPipes,
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
    combo,
    showAchievement,
    shieldActive,
    boostActive,
    items,
    restartGame,
    shareScore,
    handlePause,
    handleCanvasClick,
    redeemVoucher,
    unlockMap,
    dailyChallenges,
  } = useGameLogic();

  const { canvasRef, assetsLoaded } = useAssets();

  return (
    <div className="fixed inset-0 bg-gradient-to-b bg-gray-900 flex flex-col relative overflow-hidden">
      <div
        className={`flex-1 flex items-center justify-center relative bg-gradient-to-b ${mapConfigs[currentMap].bg} transition-all duration-500`}
      >
        <GameCanvas
          canvasRef={canvasRef}
          bird={bird}
          pipes={pipes}
          score={score}
          gameOver={gameOver}
          gameStarted={gameStarted}
          isPaused={isPaused}
          currentMap={currentMap}
          shieldActive={shieldActive}
          boostActive={boostActive}
          items={items}
          combo={combo}
          showAchievement={showAchievement}
          handleCanvasClick={handleCanvasClick}
        />
        <div
          className={`fixed right-8 top-1/2 transform -translate-y-1/2 flex flex-col gap-3 z-30 ${
            showPointsBoard || showMapSelector || showUpgrades || showChallenges || showLeaderboard
              ? "opacity-50 pointer-events-none"
              : ""
          } transition-all duration-300`}
        >
          {gameStarted && !gameOver && (
            <button
              onClick={handlePause}
              className="w-16 h-16 text-xl rounded-full bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 text-black font-bold transition-all transform hover:scale-110 active:scale-95 shadow-xl backdrop-blur-sm border-2 border-white/30"
            >
              {isPaused ? "▶" : "⏸"}
            </button>
          )}
          <button
            onClick={() => setShowChallenges(true)}
            className="w-16 h-16 text-xs rounded-full bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-bold transition-all transform hover:scale-110 active:scale-95 shadow-xl backdrop-blur-sm border-2 border-white/30 relative"
          >
            Thách
            {dailyChallenges.some((c) => !c.completed) && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
            )}
          </button>
          <button
            onClick={() => setShowPointsBoard(true)}
            className="w-16 h-16 text-sm rounded-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold transition-all transform hover:scale-110 active:scale-95 shadow-xl backdrop-blur-sm border-2 border-white/30"
          >
            Điểm
          </button>
          <button
            onClick={() => setShowUpgrades(true)}
            className="w-16 h-16 text-sm rounded-full bg-purple-500 hover:bg-purple-600 active:bg-purple-700 text-white font-bold transition-all transform hover:scale-110 active:scale-95 shadow-xl backdrop-blur-sm border-2 border-white/30"
          >
            Nâng
          </button>
          <button
            onClick={() => setShowMapSelector(true)}
            className="w-16 h-16 text-sm rounded-full bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white font-bold transition-all transform hover:scale-110 active:scale-95 shadow-xl backdrop-blur-sm border-2 border-white/30"
          >
            Maps
          </button>
          <button
            onClick={() => setShowLeaderboard(true)}
            className="w-16 h-16 text-sm rounded-full bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-bold transition-all transform hover:scale-110 active:scale-95 shadow-xl backdrop-blur-sm border-2 border-white/30"
          >
            Top
          </button>
        </div>
      </div>
      <PointsBoard
        showPointsBoard={showPointsBoard}
        setShowPointsBoard={setShowPointsBoard}
        gameStats={gameStats}
        redeemVoucher={redeemVoucher}
      />
      <MapSelector
        showMapSelector={showMapSelector}
        setShowMapSelector={setShowMapSelector}
        currentMap={currentMap}
        setCurrentMap={setCurrentMap}
        gameStats={gameStats}
        unlockMap={unlockMap}
        mapConfigs={mapConfigs}
      />
      <UpgradesModal
        showUpgrades={showUpgrades}
        setShowUpgrades={setShowUpgrades}
        gameStats={gameStats}
        setGameStats={setGameStats}
        upgrades={upgrades}
        setUpgrades={setUpgrades}
      />
      <ChallengesModal
        showChallenges={showChallenges}
        setShowChallenges={setShowChallenges}
        dailyChallenges={dailyChallenges}
      />
      <LeaderboardModal
        showLeaderboard={showLeaderboard}
        setShowLeaderboard={setShowLeaderboard}
        leaderboard={leaderboard}
        gameStats={gameStats}
      />
      <NameInputModal
        showNameInput={showNameInput}
        setShowNameInput={setShowNameInput}
        playerName={playerName}
        setPlayerName={setPlayerName}
        saveToLeaderboard={saveToLeaderboard}
        score={score}
      />
      {!assetsLoaded && (
        <div className="fixed inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-black flex items-center justify-center z-50">
          <div className="text-white text-center">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-yellow-400 mx-auto mb-6"></div>
              <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border-2 border-yellow-400 opacity-20 mx-auto"></div>
            </div>
            <p className="text-2xl font-bold mb-2 animate-pulse">Đang tải game...</p>
            <p className="text-lg opacity-75 mb-4">Flappy Bird 2025</p>
            <div className="flex justify-center space-x-2">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
          </div>
        </div>
      )}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-black bg-opacity-60 backdrop-blur-sm text-white text-center py-4 px-4 z-20 ${
          showPointsBoard || showMapSelector ? "opacity-50" : ""
        } transition-all duration-300`}
      >
        <p className="text-xl font-semibold drop-shadow-lg">
          Nhấn SPACE hoặc click để nhảy • P để tạm dừng • {mapConfigs[currentMap].name} • Điểm: {score}
        </p>
      </div>
    </div>
  );
}