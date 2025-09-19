import React from "react";
import { GameStats } from "../types";

interface PointsBoardProps {
  showPointsBoard: boolean;
  setShowPointsBoard: (value: boolean) => void;
  gameStats: GameStats;
  redeemVoucher: (cost: number, voucherName: string) => void;
}

const PointsBoard: React.FC<PointsBoardProps> = ({
  showPointsBoard,
  setShowPointsBoard,
  gameStats,
  redeemVoucher,
}) => {
  if (!showPointsBoard) return null;

  return (
    <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl transform animate-in slide-in-from-bottom duration-300">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Bảng Điểm & Voucher</h2>
          <button
            onClick={() => setShowPointsBoard(false)}
            className="text-gray-500 hover:text-gray-700 text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            ×
          </button>
        </div>
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3">Thống Kê</h3>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">{gameStats.currentScore}</div>
                <p className="text-sm text-gray-600">Điểm hiện tại</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{gameStats.highScore}</div>
                <p className="text-sm text-gray-600">Điểm cao nhất</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">{gameStats.totalPoints}</div>
                <p className="text-sm text-gray-600">Tổng điểm tích lũy</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">{gameStats.gamesPlayed}</div>
                <p className="text-sm text-gray-600">Số game đã chơi</p>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Đổi Voucher</h3>
            <div className="space-y-3">
              <button
                onClick={() => redeemVoucher(500, "Giảm giá 10%")}
                disabled={gameStats.totalPoints < 500}
                className={`w-full flex justify-between items-center p-3 border rounded-lg transition-all ${
                  gameStats.totalPoints >= 500
                    ? "hover:bg-green-50 hover:border-green-300 cursor-pointer"
                    : "opacity-50 cursor-not-allowed bg-gray-50"
                }`}
              >
                <div className="text-left">
                  <div className="font-medium">Giảm 10%</div>
                  <div className="text-sm text-gray-600">500 điểm</div>
                </div>
                <span
                  className={`font-semibold ${
                    gameStats.totalPoints >= 500 ? "text-green-600" : "text-gray-400"
                  }`}
                >
                  {gameStats.totalPoints >= 500 ? "Đổi" : "Không đủ điểm"}
                </span>
              </button>
              <button
                onClick={() => redeemVoucher(1000, "Giảm giá 20%")}
                disabled={gameStats.totalPoints < 1000}
                className={`w-full flex justify-between items-center p-3 border rounded-lg transition-all ${
                  gameStats.totalPoints >= 1000
                    ? "hover:bg-green-50 hover:border-green-300 cursor-pointer"
                    : "opacity-50 cursor-not-allowed bg-gray-50"
                }`}
              >
                <div className="text-left">
                  <div className="font-medium">Giảm 20%</div>
                  <div className="text-sm text-gray-600">1000 điểm</div>
                </div>
                <span
                  className={`font-semibold ${
                    gameStats.totalPoints >= 1000 ? "text-green-600" : "text-gray-400"
                  }`}
                >
                  {gameStats.totalPoints >= 1000 ? "Đổi" : "Không đủ điểm"}
                </span>
              </button>
              <button
                onClick={() => redeemVoucher(800, "Miễn phí ship")}
                disabled={gameStats.totalPoints < 800}
                className={`w-full flex justify-between items-center p-3 border rounded-lg transition-all ${
                  gameStats.totalPoints >= 800
                    ? "hover:bg-green-50 hover:border-green-300 cursor-pointer"
                    : "opacity-50 cursor-not-allowed bg-gray-50"
                }`}
              >
                <div className="text-left">
                  <div className="font-medium">Miễn phí ship</div>
                  <div className="text-sm text-gray-600">800 điểm</div>
                </div>
                <span
                  className={`font-semibold ${
                    gameStats.totalPoints >= 800 ? "text-green-600" : "text-gray-400"
                  }`}
                >
                  {gameStats.totalPoints >= 800 ? "Đổi" : "Không đủ điểm"}
                </span>
              </button>
            </div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-3">
            <h4 className="font-medium text-yellow-800 mb-2">💡 Cách kiếm điểm:</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Mỗi ống qua được: +10 điểm</li>
              <li>• Nhặt vật phẩm (Shield/Boost): +50 điểm</li>
              <li>• Chơi game hoàn thành: +50 điểm bonus</li>
              <li>• Đạt điểm mới: +100 điểm bonus</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PointsBoard;