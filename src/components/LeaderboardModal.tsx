import React from "react";
import { LeaderboardEntry, GameStats } from "../types";

interface LeaderboardModalProps {
  showLeaderboard: boolean;
  setShowLeaderboard: (value: boolean) => void;
  leaderboard: LeaderboardEntry[];
  gameStats: GameStats;
}

const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  showLeaderboard,
  setShowLeaderboard,
  leaderboard,
  gameStats,
}) => {
  if (!showLeaderboard) return null;

  return (
    <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl transform animate-in slide-in-from-bottom duration-300">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Bảng Xếp Hạng</h2>
          <button
            onClick={() => setShowLeaderboard(false)}
            className="text-gray-500 hover:text-gray-700 text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            ×
          </button>
        </div>
        <div className="space-y-3">
          <div className="bg-amber-50 rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-2">Điểm của bạn</h3>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">{gameStats.currentScore}</div>
              <p className="text-sm text-gray-600">Điểm hiện tại</p>
              <div className="text-xl font-semibold text-amber-600 mt-2">{gameStats.highScore}</div>
              <p className="text-sm text-gray-600">Điểm cao nhất</p>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Top 20</h3>
            {leaderboard.length === 0 ? (
              <p className="text-sm text-gray-600">Chưa có dữ liệu bảng xếp hạng.</p>
            ) : (
              leaderboard.map((entry, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-amber-600">{index + 1}</span>
                    <span>{entry.name}</span>
                  </div>
                  <div className="font-semibold">{entry.score}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardModal;