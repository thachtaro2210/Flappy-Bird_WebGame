export const GRAVITY = 0.5;
export const JUMP_STRENGTH = 5;
export const PIPE_WIDTH = 52;
export const PIPE_GAP = 150;
export const PIPE_SPEED = 2;
export const BIRD_WIDTH = 34;
export const BIRD_HEIGHT = 24;
export const ITEM_WIDTH = 30;
export const ITEM_HEIGHT = 30;
export const SHIELD_DURATION = 5000;
export const BOOST_DURATION = 3000;
export const BOOST_SPEED_MULTIPLIER = 1.2;
export const BOOST_MULTIPLIER = 1.2;
export const COMBO_THRESHOLD = 3;
export const MAX_COMBO = 5;
export const PARTICLE_COUNT = 8;
export const MAGNET_RANGE = 80;
export const ACHIEVEMENT_DISPLAY_TIME = 3000;

export const mapConfigs = [
  {
    name: "Map Ngày",
    bg: "from-sky-400 via-sky-300 to-green-400",
    unlocked: true,
    cost: 0,
  },
  {
    name: "Map Đêm",
    bg: "from-purple-900 via-indigo-800 to-blue-900",
    unlocked: false,
    cost: 100,
  },
  {
    name: "Map Hoàng Hôn",
    bg: "from-orange-400 via-red-400 to-pink-500",
    unlocked: false,
    cost: 200,
  },
  {
    name: "Map Tuyết",
    bg: "from-white via-blue-100 to-gray-300",
    unlocked: false,
    cost: 300,
  },
];

export const achievementDefinitions = [
  {
    id: "first_score",
    name: "Lần Đầu",
    description: "Ghi điểm đầu tiên",
    reward: 50,
    unlocked: false,
    progress: 0,
    target: 1,
  },
  {
    id: "score_5",
    name: "Người Mới",
    description: "Đạt 5 điểm",
    reward: 100,
    unlocked: false,
    progress: 0,
    target: 5,
  },
  {
    id: "score_10",
    name: "Cao Thủ",
    description: "Đạt 10 điểm",
    reward: 200,
    unlocked: false,
    progress: 0,
    target: 10,
  },
  {
    id: "score_25",
    name: "Chuyên Gia",
    description: "Đạt 25 điểm",
    reward: 500,
    unlocked: false,
    progress: 0,
    target: 25,
  },
  {
    id: "collector",
    name: "Nhà Sưu Tập",
    description: "Nhặt 10 vật phẩm",
    reward: 150,
    unlocked: false,
    progress: 0,
    target: 10,
  },
  {
    id: "survivor",
    name: "Kẻ Sống Sót",
    description: "Sống sót 60 giây",
    reward: 300,
    unlocked: false,
    progress: 0,
    target: 60,
  },
  {
    id: "combo_master",
    name: "Combo Master",
    description: "Đạt combo x5",
    reward: 400,
    unlocked: false,
    progress: 0,
    target: 5,
  },
  {
    id: "all_maps",
    name: "Du Hành",
    description: "Mở khóa tất cả map",
    reward: 1000,
    unlocked: false,
    progress: 0,
    target: 4,
  },
];