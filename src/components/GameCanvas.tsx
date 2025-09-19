import React, { useEffect } from "react";
import { Bird, Pipe, Item, Achievement } from "../types";
import { useAssets } from "../hooks/useAssets";
import { mapConfigs, GRAVITY, PIPE_SPEED, PIPE_WIDTH, PIPE_GAP, BIRD_WIDTH, BIRD_HEIGHT, ITEM_WIDTH, ITEM_HEIGHT, BOOST_SPEED_MULTIPLIER, MAGNET_RANGE } from "../constants";

interface GameCanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  bird: Bird;
  pipes: Pipe[];
  score: number;
  gameOver: boolean;
  gameStarted: boolean;
  isPaused: boolean;
  currentMap: number;
  shieldActive: boolean;
  boostActive: boolean;
  items: Item[];
  combo: number;
  showAchievement: Achievement | null;
  handleCanvasClick: (event: React.MouseEvent<HTMLCanvasElement>) => void;
}

const GameCanvas: React.FC<GameCanvasProps> = ({
  canvasRef,
  bird,
  pipes,
  score,
  gameOver,
  gameStarted,
  isPaused,
  currentMap,
  shieldActive,
  boostActive,
  items,
  combo,
  showAchievement,
  handleCanvasClick,
}) => {
  const { birdSprites, backgroundImage, numberSprites, gameOverImage, messageImage, pipeImage, shieldImage, boostImage, pointSound, hitSound, wingSound, itemSound, assetsLoaded } = useAssets();

  useEffect(() => {
    if (!assetsLoaded || isPaused) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const gameLoop = setInterval(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (gameOver) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (gameOverImage.current) {
          const gameOverWidth = 192;
          const gameOverHeight = 42;
          const gameOverX = (canvas.width - gameOverWidth) / 2;
          const gameOverY = (canvas.height - gameOverHeight) / 2 - 50;
          ctx.drawImage(
            gameOverImage.current,
            gameOverX,
            gameOverY,
            gameOverWidth,
            gameOverHeight
          );
        } else {
          ctx.fillStyle = "white";
          ctx.font = "32px Arial";
          ctx.textAlign = "center";
          ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 - 50);
        }

        ctx.fillStyle = "white";
        ctx.font = "18px Arial";
        ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 2);
        ctx.fillText(`Best: ${Math.max(gameStats.highScore, score)}`, canvas.width / 2, canvas.height / 2 + 25);

        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        ctx.fillRect(canvas.width / 2 - 50, canvas.height / 2 + 50, 100, 40);
        ctx.fillStyle = "black";
        ctx.font = "16px Arial";
        ctx.fillText("Restart", canvas.width / 2, canvas.height / 2 + 75);
        ctx.fillStyle = "rgba(59, 130, 246, 0.9)";
        ctx.fillRect(canvas.width / 2 - 80, canvas.height / 2 + 100, 70, 30);
        ctx.fillStyle = "rgba(34, 197, 94, 0.9)";
        ctx.fillRect(canvas.width / 2 + 10, canvas.height / 2 + 100, 70, 30);

        ctx.fillStyle = "white";
        ctx.font = "12px Arial";
        ctx.fillText("Share", canvas.width / 2 - 45, canvas.height / 2 + 120);
        ctx.fillText("Save", canvas.width / 2 + 45, canvas.height / 2 + 120);
        return;
      }

      const currentMapConfig = mapConfigs[currentMap];
      if (currentMap === 0) {
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, "#87CEEB");
        gradient.addColorStop(0.7, "#98FB98");
        gradient.addColorStop(1, "#90EE90");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.beginPath();
        ctx.arc(50, 80, 25, 0, Math.PI * 2);
        ctx.arc(80, 80, 35, 0, Math.PI * 2);
        ctx.arc(110, 80, 25, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(200, 120, 20, 0, Math.PI * 2);
        ctx.arc(220, 120, 30, 0, Math.PI * 2);
        ctx.arc(250, 120, 20, 0, Math.PI * 2);
        ctx.fill();
      } else if (currentMap === 1) {
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, "#1e1b4b");
        gradient.addColorStop(0.5, "#1e3a8a");
        gradient.addColorStop(1, "#000000");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "white";
        for (let i = 0; i < 20; i++) {
          const x = Math.random() * canvas.width;
          const y = Math.random() * (canvas.height * 0.6);
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = "#FFF8DC";
        ctx.beginPath();
        ctx.arc(canvas.width - 60, 60, 25, 0, Math.PI * 2);
        ctx.fill();
      } else if (currentMap === 2) {
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, "#fb923c");
        gradient.addColorStop(0.4, "#f97316");
        gradient.addColorStop(0.7, "#dc2626");
        gradient.addColorStop(1, "#7c2d12");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#FFA500";
        ctx.beginPath();
        ctx.arc(canvas.width - 50, canvas.height - 100, 30, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = "#FFD700";
        ctx.lineWidth = 2;
        for (let i = 0; i < 8; i++) {
          const angle = (i * Math.PI * 2) / 8;
          const startX = canvas.width - 50 + Math.cos(angle) * 35;
          const startY = canvas.height - 100 + Math.sin(angle) * 35;
          const endX = canvas.width - 50 + Math.cos(angle) * 50;
          const endY = canvas.height - 100 + Math.sin(angle) * 50;
          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.lineTo(endX, endY);
          ctx.stroke();
        }
      } else {
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, "#f8fafc");
        gradient.addColorStop(0.5, "#e2e8f0");
        gradient.addColorStop(1, "#cbd5e1");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "white";
        ctx.strokeStyle = "white";
        ctx.lineWidth = 1;

        for (let i = 0; i < 30; i++) {
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;
          const size = Math.random() * 3 + 1;

          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();

          if (Math.random() > 0.7) {
            ctx.beginPath();
            ctx.moveTo(x - size * 2, y);
            ctx.lineTo(x + size * 2, y);
            ctx.moveTo(x, y - size * 2);
            ctx.lineTo(x, y + size * 2);
            ctx.stroke();
          }
        }
      }

      if (backgroundImage.current) {
        ctx.globalAlpha = 0.15;
        ctx.drawImage(backgroundImage.current, 0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1.0;
      }

      if (!gameStarted) {
        if (messageImage.current) {
          const messageWidth = 184;
          const messageHeight = 267;
          const messageX = (canvas.width - messageWidth) / 2;
          const messageY = (canvas.height - messageHeight) / 2;
          ctx.drawImage(messageImage.current, messageX, messageY, messageWidth, messageHeight);
        } else {
          ctx.fillStyle = "white";
          ctx.font = "24px Arial";
          ctx.textAlign = "center";
          ctx.fillText("Tap to Start", canvas.width / 2, canvas.height / 2);
          ctx.font = "16px Arial";
          ctx.fillText("Press SPACE to jump", canvas.width / 2, canvas.height / 2 + 40);
        }

        if (birdSprites.current.length > 0) {
          ctx.save();
          ctx.translate(50 + BIRD_WIDTH / 2, bird.y + BIRD_HEIGHT / 2);
          ctx.drawImage(
            birdSprites.current[Math.floor(Date.now() / 200) % 3],
            -BIRD_WIDTH / 2,
            -BIRD_HEIGHT / 2,
            BIRD_WIDTH,
            BIRD_HEIGHT
          );
          ctx.restore();
        }
        return;
      }

      const dynamicSpeedIncrease = Math.floor(score / 5) * 0.3;
      const currentSpeed = boostActive ? (PIPE_SPEED + dynamicSpeedIncrease) * BOOST_SPEED_MULTIPLIER : PIPE_SPEED + dynamicSpeedIncrease;
      const currentGravity = boostActive ? GRAVITY * BOOST_SPEED_MULTIPLIER : GRAVITY;

      setBird((prevBird) => {
        const newY = prevBird.y + prevBird.velocity;
        const newVelocity = prevBird.velocity + currentGravity;
        const newFrame = (prevBird.frame + 1) % 3;
        return { y: newY, velocity: newVelocity, frame: newFrame };
      });

      setPipes((prevPipes) => {
        let newPipes = prevPipes.map((pipe) => ({
          ...pipe,
          x: pipe.x - currentSpeed,
        }));
        if (newPipes.length === 0 || newPipes[newPipes.length - 1].x < canvas.width - 200) {
          const topHeight = Math.random() * (canvas.height - PIPE_GAP - 100) + 50;
          newPipes.push({ x: canvas.width, topHeight, passed: false });
        }
        newPipes = newPipes.filter((pipe) => pipe.x + PIPE_WIDTH > 0);
        return newPipes;
      });

      setItems((prevItems) => {
        let newItems = prevItems.map((item) => ({
          ...item,
          x: item.x - currentSpeed,
        }));
        if (Math.random() < 0.01 && prevItems.length < 2) {
          const y = Math.random() * (canvas.height - ITEM_HEIGHT - 100) + 50;
          const type = Math.random() > 0.5 ? "shield" : "boost";
          newItems.push({ x: canvas.width, y, type, collected: false });
        }
        newItems = newItems.filter((item) => item.x + ITEM_WIDTH > 0 && !item.collected);
        return newItems;
      });

      const birdRect = { x: 50, y: bird.y, width: BIRD_WIDTH, height: BIRD_HEIGHT };

      if (upgrades.magnetRange > 0) {
        setItems((prevItems) =>
          prevItems.map((item) => {
            if (item.collected) return item;

            const dx = 50 + BIRD_WIDTH / 2 - (item.x + ITEM_WIDTH / 2);
            const dy = bird.y + BIRD_HEIGHT / 2 - (item.y + ITEM_HEIGHT / 2);
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < MAGNET_RANGE * upgrades.magnetRange) {
              const pullForce = 0.3;
              return {
                ...item,
                x: item.x + (dx * pullForce) / distance,
                y: item.y + (dy * pullForce) / distance,
              };
            }
            return item;
          })
        );
      }

      setItems((prevItems) => {
        let newItems = [...prevItems];
        for (let i = 0; i < newItems.length; i++) {
          const item = newItems[i];
          const itemRect = { x: item.x, y: item.y, width: ITEM_WIDTH, height: ITEM_HEIGHT };
          if (
            !item.collected &&
            birdRect.x < itemRect.x + itemRect.width &&
            birdRect.x + birdRect.width > itemRect.x &&
            birdRect.y < itemRect.y + itemRect.height &&
            birdRect.y + birdRect.height > itemRect.y
          ) {
            newItems[i] = { ...item, collected: true };
            playSound(itemSound.current);

            if (item.type === "shield") {
              setShieldActive(true);
              const duration = SHIELD_DURATION * upgrades.shieldDuration;
              setTimeout(() => setShieldActive(false), duration);
            } else if (item.type === "boost") {
              setBoostActive(true);
              const duration = BOOST_DURATION * upgrades.boostPower;
              setTimeout(() => setBoostActive(false), duration);
            }

            setScore((prev) => prev + 5);
          }
        }
        return newItems;
      });

      if (bird.y > canvas.height - BIRD_HEIGHT || bird.y < 0) {
        if (!shieldActive && !gameOver) {
          setGameOver(true);
          playSound(hitSound.current);
        } else if (shieldActive) {
          setBird((prevBird) => ({
            ...prevBird,
            y: Math.max(0, Math.min(prevBird.y, canvas.height - BIRD_HEIGHT)),
          }));
        }
      }

      for (const pipe of pipes) {
        const topPipeRect = { x: pipe.x, y: 0, width: PIPE_WIDTH, height: pipe.topHeight };
        const bottomPipeRect = {
          x: pipe.x,
          y: pipe.topHeight + PIPE_GAP,
          width: PIPE_WIDTH,
          height: canvas.height - pipe.topHeight - PIPE_GAP,
        };

        if (
          (birdRect.x < topPipeRect.x + topPipeRect.width &&
            birdRect.x + birdRect.width > topPipeRect.x &&
            birdRect.y < topPipeRect.y + topPipeRect.height &&
            birdRect.y + birdRect.height > topPipeRect.y) ||
          (birdRect.x < bottomPipeRect.x + bottomPipeRect.width &&
            birdRect.x + birdRect.width > bottomPipeRect.x &&
            birdRect.y < bottomPipeRect.y + bottomPipeRect.height &&
            birdRect.y + birdRect.height > bottomPipeRect.y)
        ) {
          if (!shieldActive && !gameOver) {
            setGameOver(true);
            playSound(hitSound.current);
          }
        }

        if (!pipe.passed && pipe.x + PIPE_WIDTH < 50) {
          pipe.passed = true;
          updateCombo();
          const basePoints = 1;
          const comboPoints = Math.floor(basePoints * comboMultiplier);
          const totalPoints = basePoints + comboPoints;
          setScore((prev) => prev + totalPoints);
          setGameStats((prev) => ({
            ...prev,
            totalPoints: prev.totalPoints + totalPoints * 10,
          }));
          playSound(pointSound.current);
        }
      }

      pipes.forEach((pipe) => {
        if (pipeImage.current) {
          ctx.save();
          ctx.scale(1, -1);
          ctx.drawImage(pipeImage.current, pipe.x, -pipe.topHeight, PIPE_WIDTH, 320);
          ctx.restore();
          ctx.drawImage(pipeImage.current, pipe.x, pipe.topHeight + PIPE_GAP, PIPE_WIDTH, 320);
        } else {
          ctx.fillStyle = "#4ade80";
          ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.topHeight);
          ctx.fillRect(pipe.x, pipe.topHeight + PIPE_GAP, PIPE_WIDTH, canvas.height - pipe.topHeight - PIPE_GAP);
        }
      });

      items.forEach((item) => {
        if (!item.collected) {
          const image = item.type === "shield" ? shieldImage.current : boostImage.current;
          if (image) {
            ctx.save();
            ctx.filter = "drop-shadow(0 0 5px rgba(255, 255, 255, 0.8))";
            ctx.drawImage(image, item.x, item.y, ITEM_WIDTH, ITEM_HEIGHT);
            ctx.restore();
          } else {
            ctx.fillStyle = item.type === "shield" ? "#3b82f6" : "#f59e0b";
            ctx.fillRect(item.x, item.y, ITEM_WIDTH, ITEM_HEIGHT);
            ctx.strokeStyle = "white";
            ctx.lineWidth = 2;
            ctx.strokeRect(item.x, item.y, ITEM_WIDTH, ITEM_HEIGHT);
          }
        }
      });

      if (birdSprites.current.length > 0) {
        ctx.save();
        ctx.translate(50 + BIRD_WIDTH / 2, bird.y + BIRD_HEIGHT / 2);
        ctx.rotate(Math.min(Math.PI / 4, Math.max(-Math.PI / 4, bird.velocity * 0.1)));
        ctx.drawImage(birdSprites.current[bird.frame], -BIRD_WIDTH / 2, -BIRD_HEIGHT / 2, BIRD_WIDTH, BIRD_HEIGHT);
        ctx.restore();
      } else {
        ctx.fillStyle = "#fbbf24";
        ctx.fillRect(50, bird.y, BIRD_WIDTH, BIRD_HEIGHT);
      }

      ctx.fillStyle = "white";
      ctx.font = "36px Arial";
      ctx.textAlign = "center";
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
      ctx.strokeText(score.toString(), canvas.width / 2, 50);
      ctx.fillText(score.toString(), canvas.width / 2, 50);

      if (shieldActive) {
        ctx.fillStyle = "rgba(59, 130, 246, 0.9)";
        ctx.font = "16px Arial";
        ctx.fillText("Shield Active!", canvas.width / 2, 80);
      }
      if (boostActive) {
        ctx.fillStyle = "rgba(245, 158, 11, 0.9)";
        ctx.font = "16px Arial";
        ctx.fillText("Boost Active!", canvas.width / 2, 100);
      }
    }, 1000 / 60);

    return () => clearInterval(gameLoop);
  }, [bird, pipes, score, gameOver, gameStarted, isPaused, currentMap, shieldActive, boostActive, items, assetsLoaded]);

  return (
    <div className={`relative ${isPaused ? "opacity-50" : ""} transition-all duration-300`}>
      <canvas
        ref={canvasRef}
        width={288}
        height={512}
        className="shadow-2xl border-4 border-white/30"
        style={{ imageRendering: "pixelated" }}
        onClick={handleCanvasClick}
      />
      {(shieldActive || boostActive) && (
        <div className="absolute top-4 left-4 bg-black bg-opacity-50 rounded-lg p-2 text-white text-sm font-semibold animate-pulse">
          {shieldActive && <span className="text-blue-400">🛡️ Shield Active!</span>}
          {boostActive && <span className="ml-2 text-orange-400">🚀 Boost Active!</span>}
        </div>
      )}
      {combo > 0 && (
        <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg p-2 text-white text-sm font-bold animate-pulse">
          Combo x{combo}! (+{Math.floor(comboMultiplier * 100 - 100)}% điểm)
        </div>
      )}
      {showAchievement && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-top duration-300">
          <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-xl p-4 shadow-2xl border-2 border-white">
            <div className="flex items-center gap-3 text-white">
              <div className="text-3xl">🏆</div>
              <div>
                <div className="text-lg font-bold">Thành Tựu Mở Khóa!</div>
                <div className="text-sm">{showAchievement.name}</div>
                <div className="text-xs opacity-90">{showAchievement.description}</div>
                <div className="text-sm font-bold mt-1">+{showAchievement.reward} điểm</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameCanvas;