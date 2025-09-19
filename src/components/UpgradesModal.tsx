import React from "react";
import { GameStats, PowerUpgrade } from "../types";

interface UpgradesModalProps {
  showUpgrades: boolean;
  setShowUpgrades: (value: boolean) => void;
  gameStats: GameStats;
  setGameStats: React.Dispatch<React.SetStateAction<GameStats>>;
  upgrades: PowerUpgrade;
  setUpgrades: React.Dispatch<React.SetStateAction<PowerUpgrade>>;
}

const UpgradesModal: React.FC<UpgradesModalProps> = ({
  showUpgrades,
  setShowUpgrades,
  gameStats,
  setGameStats,
  upgrades,
  setUpgrades,
}) => {
  if (!showUpgrades) return null;

  const upgradeCosts = {
    shieldDuration: [100, 200, 300, 400],
    boostPower: [150, 250, 350, 450],
    magnetRange: [200, 300, 400, 500],
    extraLife: [300, 500, 700, 1000],
  };

  const handleUpgrade = (type: keyof PowerUpgrade, level: number, cost: number) => {
    if (gameStats.totalPoints >= cost) {
      setGameStats((prev) => ({
        ...prev,
        totalPoints: prev.totalPoints - cost,
      }));
      setUpgrades((prev) => {
        const newUpgrades = { ...prev, [type]: level };
        localStorage.setItem("upgrades", JSON.stringify(newUpgrades));
        return newUpgrades;
      });
    } else {
      alert("Không đủ điểm để nâng cấp!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl transform animate-in slide-in-from-bottom duration-300">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Nâng Cấp</h2>
          <button
            onClick={() => setShowUpgrades(false)}
            className="text-gray-500 hover:text-gray-700 text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            ×
          </button>
        </div>
        <div className="space-y-4">
          <div className="bg-purple-50 rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-2">Tăng thời gian khiên</h3>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">Cấp độ hiện tại: {upgrades.shieldDuration}</p>
              {upgrades.shieldDuration < 4 && (
                <button
                  onClick={() =>
                    handleUpgrade("shieldDuration", upgrades.shieldDuration + 1, upgradeCosts.shieldDuration[upgrades.shieldDuration])
                  }
                  disabled={gameStats.totalPoints < upgradeCosts.shieldDuration[upgrades.shieldDuration]}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    gameStats.totalPoints >= upgradeCosts.shieldDuration[upgrades.shieldDuration]
                      ? "bg-purple-500 text-white hover:bg-purple-600"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Nâng cấp ({upgradeCosts.shieldDuration[upgrades.shieldDuration]} điểm)
                </button>
              )}
            </div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-2">Tăng sức mạnh Boost</h3>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">Cấp độ hiện tại: {upgrades.boostPower}</p>
              {upgrades.boostPower < 4 && (
                <button
                  onClick={() =>
                    handleUpgrade("boostPower", upgrades.boostPower + 1, upgradeCosts.boostPower[upgrades.boostPower])
                  }
                  disabled={gameStats.totalPoints < upgradeCosts.boostPower[upgrades.boostPower]}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    gameStats.totalPoints >= upgradeCosts.boostPower[upgrades.boostPower]
                      ? "bg-purple-500 text-white hover:bg-purple-600"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Nâng cấp ({upgradeCosts.boostPower[upgrades.boostPower]} điểm)
                </button>
              )}
            </div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-2">Tăng phạm vi hút vật phẩm</h3>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">Cấp độ hiện tại: {upgrades.magnetRange}</p>
              {upgrades.magnetRange < 4 && (
                <button
                  onClick={() =>
                    handleUpgrade("magnetRange", upgrades.magnetRange + 1, upgradeCosts.magnetRange[upgrades.magnetRange])
                  }
                  disabled={gameStats.totalPoints < upgradeCosts.magnetRange[upgrades.magnetRange]}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    gameStats.totalPoints >= upgradeCosts.magnetRange[upgrades.magnetRange]
                      ? "bg-purple-500 text-white hover:bg-purple-600"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Nâng cấp ({upgradeCosts.magnetRange[upgrades.magnetRange]} điểm)
                </button>
              )}
            </div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-2">Thêm mạng</h3>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">Cấp độ hiện tại: {upgrades.extraLife}</p>
              {upgrades.extraLife < 4 && (
                <button
                  onClick={() =>
                    handleUpgrade("extraLife", upgrades.extraLife + 1, upgradeCosts.extraLife[upgrades.extraLife])
                  }
                  disabled={gameStats.totalPoints < upgradeCosts.extraLife[upgrades.extraLife]}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    gameStats.totalPoints >= upgradeCosts.extraLife[upgrades.extraLife]
                      ? "bg-purple-500 text-white hover:bg-purple-600"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Nâng cấp ({upgradeCosts.extraLife[upgrades.extraLife]} điểm)
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradesModal;