import React, { useState } from "react";

interface NameInputModalProps {
  showNameInput: boolean;
  setShowNameInput: (value: boolean) => void;
  playerName: string;
  setPlayerName: (name: string) => void;
  saveToLeaderboard: (name: string, score: number) => void;
  score: number;
}

const NameInputModal: React.FC<NameInputModalProps> = ({
  showNameInput,
  setShowNameInput,
  playerName,
  setPlayerName,
  saveToLeaderboard,
  score,
}) => {
  const [inputName, setInputName] = useState(playerName);

  if (!showNameInput) return null;

  const handleSave = () => {
    if (inputName.trim()) {
      setPlayerName(inputName);
      localStorage.setItem("playerName", inputName);
      saveToLeaderboard(inputName, score);
      setShowNameInput(false);
    } else {
      alert("Vui lòng nhập tên!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl transform animate-in slide-in-from-bottom duration-300">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Lưu Điểm</h2>
          <button
            onClick={() => setShowNameInput(false)}
            className="text-gray-500 hover:text-gray-700 text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            ×
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tên của bạn</label>
            <input
              type="text"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập tên của bạn"
              maxLength={20}
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setShowNameInput(false)}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Hủy
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Lưu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NameInputModal;