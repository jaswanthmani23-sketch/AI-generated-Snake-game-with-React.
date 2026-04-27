import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';

const GRID_SIZE = 20;
const INITIAL_SPEED = 150;
const SPEED_INCREMENT = 2;

type Point = { x: number; y: number };
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export const SnakeGame: React.FC<{ onScoreUpdate: (score: number) => void }> = ({ onScoreUpdate }) => {
  const [snake, setSnake] = useState<Point[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Point>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const [speed, setSpeed] = useState(INITIAL_SPEED);

  const gameLoopRef = useRef<number | null>(null);

  const generateFood = useCallback((currentSnake: Point[]) => {
    let newFood: Point;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      if (!currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y)) {
        break;
      }
    }
    return newFood;
  }, []);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(generateFood([{ x: 10, y: 10 }]));
    setDirection('RIGHT');
    setIsGameOver(false);
    setScore(0);
    setSpeed(INITIAL_SPEED);
    setIsPaused(false);
    onScoreUpdate(0);
  };

  const moveSnake = useCallback(() => {
    if (isPaused || isGameOver) return;

    setSnake(prevSnake => {
      const head = prevSnake[0];
      const newHead = { ...head };

      switch (direction) {
        case 'UP': newHead.y -= 1; break;
        case 'DOWN': newHead.y += 1; break;
        case 'LEFT': newHead.x -= 1; break;
        case 'RIGHT': newHead.x += 1; break;
      }

      // Check wall collision
      if (
        newHead.x < 0 || 
        newHead.x >= GRID_SIZE || 
        newHead.y < 0 || 
        newHead.y >= GRID_SIZE ||
        prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)
      ) {
        setIsGameOver(true);
        return prevSnake;
      }

      const nextSnake = [newHead, ...prevSnake];

      // Check food
      if (newHead.x === food.x && newHead.y === food.y) {
        const newScore = score + 10;
        setScore(newScore);
        onScoreUpdate(newScore);
        setFood(generateFood(nextSnake));
        setSpeed(prev => Math.max(50, prev - SPEED_INCREMENT));
        
        if (newScore % 50 === 0) {
           confetti({
             particleCount: 40,
             spread: 70,
             origin: { y: 0.6 },
             colors: ['#ff00ff', '#00ffff', '#39ff14']
           });
        }
      } else {
        nextSnake.pop();
      }

      return nextSnake;
    });
  }, [direction, food, isGameOver, isPaused, score, generateFood, onScoreUpdate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp': if (direction !== 'DOWN') setDirection('UP'); break;
        case 'ArrowDown': if (direction !== 'UP') setDirection('DOWN'); break;
        case 'ArrowLeft': if (direction !== 'RIGHT') setDirection('LEFT'); break;
        case 'ArrowRight': if (direction !== 'LEFT') setDirection('RIGHT'); break;
        case ' ': setIsPaused(p => !p); break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  useEffect(() => {
    if (!isPaused && !isGameOver) {
      gameLoopRef.current = window.setInterval(moveSnake, speed);
    } else {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    }
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [moveSnake, speed, isPaused, isGameOver]);

  return (
    <div className="relative w-full max-w-md mx-auto aspect-square neon-border rounded-xl bg-black/40 backdrop-blur-sm overflow-hidden p-1 shadow-2xl">
      <div className="absolute inset-0 pixel-grid opacity-20 pointer-events-none" />
      
      {/* Game Board */}
      <div className="grid grid-cols-20 grid-rows-20 w-full h-full gap-0.5">
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
          const x = i % GRID_SIZE;
          const y = Math.floor(i / GRID_SIZE);
          const isSnake = snake.some(s => s.x === x && s.y === y);
          const isHead = snake[0].x === x && snake[0].y === y;
          const isFood = food.x === x && food.y === y;

          return (
            <div 
              key={i} 
              className={`rounded-sm transition-all duration-100 ${
                isSnake 
                  ? isHead 
                    ? 'bg-neon-blue shadow-[0_0_10px_rgba(0,255,255,0.8)] z-10 scale-110' 
                    : 'bg-neon-blue/40' 
                  : isFood 
                    ? 'bg-neon-pink shadow-[0_0_15px_rgba(255,0,255,0.8)] animate-pulse' 
                    : 'bg-white/5'
              }`}
            />
          );
        })}
      </div>

      {/* Overlay */}
      <AnimatePresence>
        {(isGameOver || isPaused) && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-center p-6"
          >
            {isGameOver ? (
              <>
                <h2 className="text-4xl font-black neon-text-pink mb-2">CRASHED</h2>
                <p className="text-white/60 mb-6 font-mono">SCORE: {score}</p>
                <button 
                  onClick={resetGame}
                  className="px-8 py-3 bg-neon-pink text-black font-bold uppercase rounded-full hover:scale-105 active:scale-95 transition-transform neon-glow-pink"
                >
                  Reboot System
                </button>
              </>
            ) : (
              <>
                <h2 className="text-4xl font-black neon-text-blue mb-4">PAUSED</h2>
                <p className="text-white/60 mb-6 font-mono">PRESS SPACE TO RESUME</p>
                <button 
                  onClick={() => setIsPaused(false)}
                  className="px-8 py-3 bg-neon-blue text-black font-bold uppercase rounded-full hover:scale-105 active:scale-95 transition-transform neon-glow-blue"
                >
                  Continue
                </button>
                {score > 0 && (
                  <button 
                    onClick={resetGame}
                    className="mt-4 text-white/40 hover:text-white transition-colors text-sm font-mono uppercase"
                  >
                    Reset Grid
                  </button>
                )}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
