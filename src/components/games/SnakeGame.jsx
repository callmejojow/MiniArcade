import React, { useState, useEffect, useCallback, useRef } from 'react';

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
  const [isMobile, setIsMobile] = useState(false);
  
  // Touch and swipe handling
  const touchStartRef = useRef({ x: 0, y: 0 });
  const gameAreaRef = useRef(null);

  // Detect if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    };
    return newFood;
  }, []);

  const changeDirection = useCallback((newDirection) => {
    if (!gameRunning) return;
    
    // Prevent reversing direction
    if ((direction.x !== 0 && newDirection.x === -direction.x) ||
        (direction.y !== 0 && newDirection.y === -direction.y)) {
      return;
    }
    
    setDirection(newDirection);
  }, [direction, gameRunning]);

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

  // Keyboard controls (desktop)
  const handleKeyPress = useCallback((e) => {
    if (!gameRunning) return;

    switch (e.key) {
      case 'ArrowUp':
        changeDirection({ x: 0, y: -1 });
        break;
      case 'ArrowDown':
        changeDirection({ x: 0, y: 1 });
        break;
      case 'ArrowLeft':
        changeDirection({ x: -1, y: 0 });
        break;
      case 'ArrowRight':
        changeDirection({ x: 1, y: 0 });
        break;
      default:
        break;
    }
  }, [changeDirection, gameRunning]);

  // Touch controls (mobile)
  const handleTouchStart = useCallback((e) => {
    if (!gameRunning) return;
    
    const touch = e.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY
    };
  }, [gameRunning]);

  const handleTouchEnd = useCallback((e) => {
    if (!gameRunning) return;
    
    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    
    // Minimum swipe distance to register as a swipe
    const minSwipeDistance = 30;
    
    if (Math.abs(deltaX) < minSwipeDistance && Math.abs(deltaY) < minSwipeDistance) {
      return; // Too small to be a swipe
    }
    
    // Determine swipe direction
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      if (deltaX > 0) {
        changeDirection({ x: 1, y: 0 }); // Right
      } else {
        changeDirection({ x: -1, y: 0 }); // Left
      }
    } else {
      // Vertical swipe
      if (deltaY > 0) {
        changeDirection({ x: 0, y: 1 }); // Down
      } else {
        changeDirection({ x: 0, y: -1 }); // Up
      }
    }
  }, [changeDirection, gameRunning]);

  // Virtual D-pad button handlers
  const handleDirectionClick = useCallback((newDirection) => {
    changeDirection(newDirection);
  }, [changeDirection]);

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
            className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'} border border-gray-600 ${
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
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-[#3B0B0B] p-3 sm:p-6 rounded-xl border-4 border-[#FEC006] max-w-4xl w-full max-h-full overflow-y-auto">
        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#FEC006]">Snake Game</h2>
          <button 
            onClick={onClose}
            className="bg-[#EA00FF] text-white px-3 py-2 sm:px-4 sm:py-2 rounded hover:bg-[#D600E6] transition-colors text-sm sm:text-base"
          >
            Close
          </button>
        </div>
        
        <div className="mb-3 sm:mb-4 text-white">
          <p className="text-sm sm:text-base">Score: <span className="text-[#FEC006] font-bold">{score}</span></p>
          <p className="text-xs sm:text-sm text-gray-300">
            {isMobile ? 'Swipe or use buttons to control' : 'Use arrow keys to control the snake'}
          </p>
        </div>

        <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-4 justify-center items-center`}>
          {/* Game Grid */}
          <div 
            ref={gameAreaRef}
            className={`grid gap-0 border-2 border-[#FEC006] ${isMobile ? 'order-1' : ''}`}
            style={{
              gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
              maxWidth: isMobile ? '300px' : '400px',
              aspectRatio: '1'
            }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {renderGrid()}
          </div>

          {/* Mobile Controls */}
          {isMobile && (
            <div className="order-2 flex flex-col items-center gap-2 touch-manipulation">
              <div className="flex flex-col items-center gap-2">
                <button
                  onTouchStart={(e) => { e.preventDefault(); handleDirectionClick({ x: 0, y: -1 }); }}
                  onClick={() => handleDirectionClick({ x: 0, y: -1 })}
                  className="bg-[#6CA6E6] text-black w-12 h-12 rounded font-bold hover:bg-[#5A96D6] transition-colors border-2 border-[#FEC006] active:bg-[#4A86C6] flex items-center justify-center"
                  disabled={!gameRunning}
                >
                  ↑
                </button>
                <div className="flex gap-2">
                  <button
                    onTouchStart={(e) => { e.preventDefault(); handleDirectionClick({ x: -1, y: 0 }); }}
                    onClick={() => handleDirectionClick({ x: -1, y: 0 })}
                    className="bg-[#6CA6E6] text-black w-12 h-12 rounded font-bold hover:bg-[#5A96D6] transition-colors border-2 border-[#FEC006] active:bg-[#4A86C6] flex items-center justify-center"
                    disabled={!gameRunning}
                  >
                    ←
                  </button>
                  <button
                    onTouchStart={(e) => { e.preventDefault(); handleDirectionClick({ x: 1, y: 0 }); }}
                    onClick={() => handleDirectionClick({ x: 1, y: 0 })}
                    className="bg-[#6CA6E6] text-black w-12 h-12 rounded font-bold hover:bg-[#5A96D6] transition-colors border-2 border-[#FEC006] active:bg-[#4A86C6] flex items-center justify-center"
                    disabled={!gameRunning}
                  >
                    →
                  </button>
                </div>
                <button
                  onTouchStart={(e) => { e.preventDefault(); handleDirectionClick({ x: 0, y: 1 }); }}
                  onClick={() => handleDirectionClick({ x: 0, y: 1 })}
                  className="bg-[#6CA6E6] text-black w-12 h-12 rounded font-bold hover:bg-[#5A96D6] transition-colors border-2 border-[#FEC006] active:bg-[#4A86C6] flex items-center justify-center"
                  disabled={!gameRunning}
                >
                  ↓
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2 sm:gap-4 justify-center mt-4 flex-wrap">
          {!gameRunning && !gameOver && (
            <button 
              onClick={startGame}
              className="bg-[#6CA6E6] text-black px-4 py-2 sm:px-6 sm:py-2 rounded font-bold hover:bg-[#5A96D6] transition-colors text-sm sm:text-base border-2 border-[#FEC006]"
            >
              Start Game
            </button>
          )}
          
          {gameOver && (
            <div className="text-center w-full">
              <p className="text-[#EA00FF] font-bold mb-2 text-sm sm:text-base">Game Over!</p>
              <button 
                onClick={resetGame}
                className="bg-[#6CA6E6] text-black px-4 py-2 sm:px-6 sm:py-2 rounded font-bold hover:bg-[#5A96D6] transition-colors text-sm sm:text-base border-2 border-[#FEC006]"
              >
                Play Again
              </button>
            </div>
          )}
          
          {gameRunning && (
            <button 
              onClick={() => setGameRunning(false)}
              className="bg-gray-600 text-white px-4 py-2 sm:px-6 sm:py-2 rounded font-bold hover:bg-gray-700 transition-colors text-sm sm:text-base border-2 border-[#FEC006]"
            >
              Pause
            </button>
          )}
        </div>

        {/* Instructions for mobile */}
        {isMobile && (
          <div className="mt-4 p-3 bg-gray-800 rounded-lg border border-[#FEC006]">
            <p className="text-xs text-gray-300 text-center">
              💡 <strong>Mobile Tips:</strong> Swipe anywhere on the game grid or use the directional buttons below
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 