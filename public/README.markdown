# Flappy Bird 2025

A modernized and feature-rich version of the classic Flappy Bird game, built with **React**, **TypeScript**, and **TailwindCSS**. This project enhances the original game with dynamic maps, upgrades, achievements, daily challenges, and a leaderboard system, providing an engaging experience for players.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [How to Play](#how-to-play)
- [Game Mechanics](#game-mechanics)
- [Customization](#customization)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## Features
- **Classic Flappy Bird Gameplay**: Navigate the bird through a series of pipes by tapping or pressing the spacebar.
- **Dynamic Maps**: Choose from multiple maps (Day, Night, Sunset, Snow) with unique visual themes and effects.
- **Upgrades System**: Enhance gameplay with upgrades such as extended shield duration, boosted jump power, magnet range for items, and extra lives.
- **Achievements**: Unlock achievements by reaching milestones like scoring points, surviving longer, or collecting items.
- **Daily Challenges**: Complete time-limited challenges to earn bonus points.
- **Leaderboard**: Save high scores and compete with other players.
- **Points & Vouchers**: Accumulate points to redeem vouchers (e.g., discounts, free shipping).
- **Responsive UI**: Built with TailwindCSS for a sleek, modern interface that works across devices.
- **Type-Safe Code**: Written in TypeScript for robust type checking and maintainability.
- **Local Storage**: Persists game stats, leaderboard, and upgrades using browser local storage.

## Tech Stack
- **React**: Frontend library for building the user interface.
- **TypeScript**: Adds static types for better code reliability and developer experience.
- **TailwindCSS**: Utility-first CSS framework for styling the game UI.
- **Next.js**: React framework for server-side rendering and optimized builds (optional, depending on your setup).
- **Canvas API**: Used for rendering the game graphics and animations.
- **Local Storage**: For saving game progress and leaderboard data.

## Installation
To set up the project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd flappy-bird
   ```

2. **Install dependencies**:
   Ensure you have [Node.js](https://nodejs.org/) (version 18 or higher) installed. Then run:
   ```bash
   npm install
   ```

3. **Set up TailwindCSS** (if not already configured):
   Create a `tailwind.config.js` file in the project root:
   ```js
   /** @type {import('tailwindcss').Config} */
   module.exports = {
     content: [
       "./src/**/*.{js,ts,jsx,tsx}",
     ],
     theme: {
       extend: {},
     },
     plugins: [],
   }
   ```
   Create a `src/globals.css` file:
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

4. **Verify project structure**:
   Ensure the following structure exists:
   ```
   flappy-bird/
   ├── src/
   │   ├── components/
   │   │   ├── GameCanvas.tsx
   │   │   ├── PointsBoard.tsx
   │   │   ├── MapSelector.tsx
   │   │   ├── UpgradesModal.tsx
   │   │   ├── ChallengesModal.tsx
   │   │   ├── LeaderboardModal.tsx
   │   │   ├── NameInputModal.tsx
   │   ├── hooks/
   │   │   ├── useGameLogic.ts
   │   │   ├── useAssets.ts
   │   │   ├── useAchievements.ts
   │   ├── types/
   │   │   └── index.ts
   │   ├── constants/
   │   │   └── index.ts
   │   ├── FlappyBird.tsx
   │   ├── globals.css
   ├── public/
   ├── package.json
   ├── tsconfig.json
   ├── tailwind.config.js
   └── README.md
   ```

## Running the Project
1. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:3000` to play the game.

2. **Build for production** (optional):
   ```bash
   npm run build
   npm run start
   ```

3. **Deploying to GitHub**:
   - Initialize a Git repository:
     ```bash
     git init
     git add .
     git commit -m "Initial commit: Setup Flappy Bird project"
     ```
   - Create a repository on GitHub and push:
     ```bash
     git remote add origin <your-repo-url>
     git push -u origin main
     ```

## Project Structure
The project is organized for modularity and scalability:

```
flappy-bird/
├── src/
│   ├── components/              # Reusable UI components
│   │   ├── GameCanvas.tsx       # Core game rendering with Canvas API
│   │   ├── PointsBoard.tsx      # Displays game stats and voucher redemption
│   │   ├── MapSelector.tsx      # Map selection UI
│   │   ├── UpgradesModal.tsx    # Upgrades purchase interface
│   │   ├── ChallengesModal.tsx  # Daily challenges display
│   │   ├── LeaderboardModal.tsx # Leaderboard display
│   │   ├── NameInputModal.tsx   # Name input for leaderboard
│   ├── hooks/                   # Custom React hooks for logic
│   │   ├── useGameLogic.ts      # Manages game state and mechanics
│   │   ├── useAssets.ts         # Loads images and sounds
│   │   ├── useAchievements.ts   # Handles achievement logic
│   ├── types/                   # TypeScript interfaces
│   │   └── index.ts             # Defines types for game entities
│   ├── constants/               # Game constants and configurations
│   │   └── index.ts             # Map configs, achievements, and game settings
│   ├── FlappyBird.tsx           # Main game component
│   ├── globals.css              # TailwindCSS global styles
├── public/                      # Static assets (if needed)
├── package.json                 # Project dependencies and scripts
├── tsconfig.json                # TypeScript configuration
├── tailwind.config.js           # TailwindCSS configuration
└── README.md                    # Project documentation
```

## How to Play
- **Start the Game**: Click the canvas or press `SPACE` to begin.
- **Jump**: Click or press `SPACE` to make the bird jump.
- **Pause**: Press `P` to pause or unpause the game.
- **Navigate UI**: Use the buttons on the right side of the screen to access:
  - **Points Board**: View stats and redeem vouchers.
  - **Map Selector**: Choose a game map.
  - **Upgrades**: Purchase upgrades with accumulated points.
  - **Challenges**: View and complete daily challenges.
  - **Leaderboard**: Check top scores and save your own.
- **Game Over**: When the bird crashes, choose to restart, share your score, or save it to the leaderboard.

## Game Mechanics
- **Scoring**: Earn 1 point per pipe passed (increased with combo multipliers). Collect items (shields or boosts) for 5 points each.
- **Combo System**: Passing pipes quickly builds a combo (up to x5), increasing point multipliers.
- **Items**:
  - **Shield**: Protects the bird from one collision (duration based on upgrade level).
  - **Boost**: Increases jump strength and pipe speed (duration based on upgrade level).
- **Upgrades**:
  - Shield Duration: Extends shield active time.
  - Boost Power: Increases boost effect duration.
  - Magnet Range: Pulls items toward the bird from a distance.
  - Extra Life: Grants additional lives (not implemented in base version).
- **Achievements**: Unlock by reaching score milestones, collecting items, surviving longer, or completing specific tasks.
- **Daily Challenges**: Reset daily, offering tasks like scoring 5 points or surviving 30 seconds.
- **Leaderboard**: Stores up to 20 top scores with player names and dates.

## Customization
To customize the game, consider the following:
- **Add New Maps**: Update `src/constants/index.ts` with new `mapConfigs` entries, including name, background gradient, and unlock cost.
- **New Assets**: Replace image/audio URLs in `src/hooks/useAssets.ts` with your own (store in `public/` or use external CDN).
- **New Upgrades**: Extend the `PowerUpgrade` interface in `src/types/index.ts` and add logic in `UpgradesModal.tsx`.
- **Additional Achievements/Challenges**: Modify `achievementDefinitions` or `generateDailyChallenges` in `src/constants/index.ts` and `useGameLogic.ts`.
- **Styling**: Adjust Tailwind classes in components or add custom styles in `globals.css`.

## Contributing
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your feature"
   ```
4. Push to your branch:
   ```bash
   git push origin feature/your-feature
   ```
5. Open a pull request on GitHub.

Please include tests and documentation for new features.

## Troubleshooting
- **Assets not loading**: Ensure URLs in `useAssets.ts` are accessible. Replace with local assets in `public/` if needed.
- **TailwindCSS not working**: Verify `tailwind.config.js` and `globals.css` are correctly set up, and run `npm run dev` again.
- **TypeScript errors**: Check `tsconfig.json` and ensure all dependencies are installed (`npm install`).
- **Game not rendering**: Confirm the canvas size (288x512) in `GameCanvas.tsx` and check browser console for errors.
- **Local storage issues**: Clear browser local storage if game stats or leaderboard data is corrupted.

For additional help, open an issue on the GitHub repository.

## License
This project is licensed under the [MIT License](LICENSE). You are free to use, modify, and distribute this project as long as you include the original license.

---

Built with ❤️ by [Your Name]. Enjoy flapping!