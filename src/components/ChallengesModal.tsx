import React from "react";
import { Challenge } from "../types";

interface ChallengesModalProps {
  showChallenges: boolean;
  setShowChallenges: (value: boolean) => void;
  dailyChallenges: Challenge[];
}

const ChallengesModal: React.FC<ChallengesModalProps> = ({
  showChallenges,
  setShowChallenges,
  dailyChallenges,
}) => {
  if (!showChallenges) return null;

  return (
    <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl transform animate-in slide-in-from-bottom duration-300">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Thử Thách Hàng Ngày</h2>
          <button
            onClick={() => setShowChallenges(false)}
            className="text-gray-500 hover:text-gray-700 text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            ×
          </button>
        </div>
        <div className="space-y-3">
          {dailyChallenges.map((challenge) => (
            <div
              key={challenge.id}
              className={`p-3 rounded-lg flex justify-between items-center transition-all ${
                challenge.completed ? "bg-green-100" : "bg-red-50"
              }`}
            >
              <div>
                <div className="font-medium">{challenge.name}</div>
                <div className="text-sm text-gray-600">{challenge.description}</div>
                <div className="text-sm text-gray-600">
                  Tiến độ: {challenge.progress}/{challenge.target}
                </div>
                <div className="text-sm font-semibold text-green-600">
                  Phần thưởng: {challenge.reward} điểm
                </div>
              </div>
              <div className="text-sm font-semibold">
                {challenge.completed ? "Đã hoàn thành" : "Chưa hoàn thành"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChallengesModal;