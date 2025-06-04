import React, { useState, useEffect, useCallback } from 'react';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_FOOD = { x: 5, y: 5 };
const INITIAL_DIRECTION = { x: 0, y: -1 };

export default function SnakeGame({ onClose }) {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(INITIAL_FOOD);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [gameRunning, setGameRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    };
    return newFood;
  }, []);

  const moveSnake = useCallback(() => {
    if (!gameRunning || gameOver) return;

    setSnake(currentSnake => {
      const newSnake = [...currentSnake];
      const head = { ...newSnake[0] };
      
      head.x += direction.x;
      head.y += direction.y;

      // Check wall collision
      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        setGameOver(true);
        setGameRunning(false);
        return currentSnake;
      }

      // Check self collision
      if (newSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
        setGameRunning(false);
        return currentSnake;
      }

      newSnake.unshift(head);

      // Check food collision
      if (head.x === food.x && head.y === food.y) {
        setScore(prev => prev + 10);
        setFood(generateFood());
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, gameRunning, gameOver, generateFood]);

  const handleKeyPress = useCallback((e) => {
    if (!gameRunning) return;

    switch (e.key) {
      case 'ArrowUp':
        if (direction.y === 0) setDirection({ x: 0, y: -1 });
        break;
      case 'ArrowDown':
        if (direction.y === 0) setDirection({ x: 0, y: 1 });
        break;
      case 'ArrowLeft':
        if (direction.x === 0) setDirection({ x: -1, y: 0 });
        break;
      case 'ArrowRight':
        if (direction.x === 0) setDirection({ x: 1, y: 0 });
        break;
      default:
        break;
    }
  }, [direction, gameRunning]);

  const startGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(generateFood());
    setDirection(INITIAL_DIRECTION);
    setScore(0);
    setGameOver(false);
    setGameRunning(true);
  };

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(INITIAL_FOOD);
    setDirection(INITIAL_DIRECTION);
    setScore(0);
    setGameOver(false);
    setGameRunning(false);
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    if (gameRunning) {
      const gameInterval = setInterval(moveSnake, 150);
      return () => clearInterval(gameInterval);
    }
  }, [moveSnake, gameRunning]);

  const renderGrid = () => {
    const cells = [];
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        const isSnake = snake.some(segment => segment.x === x && segment.y === y);
        const isFood = food.x === x && food.y === y;
        const isHead = snake[0] && snake[0].x === x && snake[0].y === y;
        
        cells.push(
          <div
            key={`${x}-${y}`}
            className={`w-4 h-4 border border-gray-600 ${
              isSnake 
                ? isHead 
                  ? 'bg-[#FEC006]' 
                  : 'bg-[#6CA6E6]'
                : isFood 
                  ? 'bg-[#EA00FF]' 
                  : 'bg-gray-900'
            }`}
          />
        );
      }
    }
    return cells;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div className="bg-[#3B0B0B] p-6 rounded-xl border-4 border-[#FEC006] max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-[#FEC006]">Snake Game</h2>
          <button 
            onClick={onClose}
            className="bg-[#EA00FF] text-white px-4 py-2 rounded hover:bg-[#D600E6] transition-colors"
          >
            Close
          </button>
        </div>
        
        <div className="mb-4 text-white">
          <p>Score: <span className="text-[#FEC006] font-bold">{score}</span></p>
          <p className="text-sm text-gray-300">Use arrow keys to control the snake</p>
        </div>

        <div className="grid grid-cols-20 gap-0 border-2 border-[#FEC006] mb-4" style={{gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`}}>
          {renderGrid()}
        </div>

        <div className="flex gap-4 justify-center">
          {!gameRunning && !gameOver && (
            <button 
              onClick={startGame}
              className="bg-[#6CA6E6] text-black px-6 py-2 rounded font-bold hover:bg-[#5A96D6] transition-colors"
            >
              Start Game
            </button>
          )}
          
          {gameOver && (
            <div className="text-center">
              <p className="text-[#EA00FF] font-bold mb-2">Game Over!</p>
              <button 
                onClick={resetGame}
                className="bg-[#6CA6E6] text-black px-6 py-2 rounded font-bold hover:bg-[#5A96D6] transition-colors"
              >
                Play Again
              </button>
            </div>
          )}
          
          {gameRunning && (
            <button 
              onClick={() => setGameRunning(false)}
              className="bg-gray-600 text-white px-6 py-2 rounded font-bold hover:bg-gray-700 transition-colors"
            >
              Pause
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 