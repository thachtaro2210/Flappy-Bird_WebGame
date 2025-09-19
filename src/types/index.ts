export interface Item {
  x: number;
  y: number;
  type: "shield" | "boost";
  collected: boolean;
}

export interface Bird {
  y: number;
  velocity: number;
  frame: number;
}

export interface Pipe {
  x: number;
  topHeight: number;
  passed: boolean;
}

export interface GameStats {
  currentScore: number;
  highScore: number;
  totalPoints: number;
  gamesPlayed: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  reward: number;
  unlocked: boolean;
  progress: number;
  target: number;
}

export interface Challenge {
  id: string;
  name: string;
  description: string;
  reward: number;
  progress: number;
  target: number;
  completed: boolean;
  expiresAt: Date;
}

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

export interface PowerUpgrade {
  shieldDuration: number;
  boostPower: number;
  magnetRange: number;
  extraLife: number;
}

export interface LeaderboardEntry {
  name: string;
  score: number;
  date: string;
}