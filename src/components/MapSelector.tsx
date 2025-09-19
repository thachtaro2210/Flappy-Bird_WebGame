import React from "react";
import { GameStats } from "../types";
import { mapConfigs } from "../constants";

interface MapSelectorProps {
  showMapSelector: boolean;
  setShowMapSelector: (value: boolean) => void;
  currentMap: number;
  setCurrentMap: (value: number) => void;
  gameStats: GameStats;
  unlockMap: (mapIndex: number) => void;
  mapConfigs: { name: string; bg: string; unlocked: boolean; cost: number }[];
}

const MapSelector: React.FC<MapSelectorProps> = ({
  showMapSelector,
  setShowMapSelector,
  currentMap,
  setCurrentMap,
  gameStats,
  unlockMap,
  mapConfigs,
}) => {
  if (!showMapSelector) return null;

  return (
    <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl transform animate-in slide-in-from-bottom duration-300">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Chọn Map</h2>
          <button
            onClick={() => setShowMapSelector(false)}
            className="text-gray-500 hover:text-gray-700 text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            ×
          </button>
        </div>
        <div className="space-y-3">
          {mapConfigs.map((map, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg flex justify-between items-center transition-all ${
                map.unlocked
                  ? "bg-gradient-to-r from-green-50 to-blue-50 hover:bg-green-100 cursor-pointer"
                  : "bg-gray-100 opacity-70 cursor-not-allowed"
              }`}
              onClick={() => {
                if (map.unlocked) {
                  setCurrentMap(index);
                  setShowMapSelector(false);
                } else if (gameStats.totalPoints >= map.cost) {
                  unlockMap(index);
                }
              }}
            >
              <div>
                <div className="font-medium text-gray-800">{map.name}</div>
                {!map.unlocked && (
                  <div className="text-sm text-gray-600">{map.cost} điểm để mở khóa</div>
                )}
              </div>
              <div
                className={`w-16 h-8 rounded ${map.bg} ${
                  index === currentMap ? "ring-2 ring-blue-500" : ""
                }`}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapSelector;