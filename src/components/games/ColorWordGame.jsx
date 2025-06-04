import React, { useState, useEffect, useCallback } from 'react';

const COLOR_WORDS = [
  'RED', 'YELLOW', 'BLUE', 'GREEN', 'PINK', 'ORANGE', 'PURPLE', 'WHITE', 'BLACK'
];

const DISPLAY_COLORS = [
  '#ff6666', '#ffbd55', '#ffff66', '#9de24f', '#87cefa', '#FFFFFF', '#000000'
];

export default function ColorWordGame({ onClose }) {
  const [gameState, setGameState] = useState('ready'); // ready, playing, finished
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [totalTime, setTotalTime] = useState(0);
  const [gameWords, setGameWords] = useState([]);

  // Generate random word-color combinations
  const generateGameWords = useCallback(() => {
    const words = [];
    for (let i = 0; i < 20; i++) {
      const word = COLOR_WORDS[Math.floor(Math.random() * COLOR_WORDS.length)];
      const color = DISPLAY_COLORS[Math.floor(Math.random() * DISPLAY_COLORS.length)];
      words.push({ word, color, id: i });
    }
    return words;
  }, []);

  const startGame = () => {
    const words = generateGameWords();
    setGameWords(words);
    setCurrentWordIndex(0);
    setStartTime(Date.now());
    setEndTime(null);
    setTotalTime(0);
    setGameState('playing');
  };

  const nextWord = () => {
    if (currentWordIndex < gameWords.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
    } else {
      // Game finished
      const endTime = Date.now();
      setEndTime(endTime);
      setTotalTime((endTime - startTime) / 1000);
      setGameState('finished');
    }
  };

  const resetGame = () => {
    setGameState('ready');
    setCurrentWordIndex(0);
    setStartTime(null);
    setEndTime(null);
    setTotalTime(0);
    setGameWords([]);
  };

  const getStars = (time) => {
    if (time < 20) return 5;
    if (time < 25) return 4;
    if (time < 30) return 3;
    return 0; // fail
  };

  const getPerformanceMessage = (time) => {
    const stars = getStars(time);
    if (stars === 5) return "🌟🌟🌟🌟🌟 AMAZING! Lightning fast!";
    if (stars === 4) return "⭐⭐⭐⭐ Great job! Very quick!";
    if (stars === 3) return "⭐⭐⭐ Good work! Keep practicing!";
    return "😭 Don't give up! Try again!";
  };

  const handleKeyPress = useCallback((e) => {
    if (gameState === 'playing' && e.code === 'Space') {
      e.preventDefault();
      nextWord();
    }
  }, [gameState, currentWordIndex, gameWords.length, startTime]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 font-mono">
      <div className="bg-[#3B0B0B] p-8 rounded-xl border-4 border-[#FEC006] max-w-4xl w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-[#FEC006]">Color Word Challenge</h2>
          <button 
            onClick={onClose}
            className="bg-[#EA00FF] text-white px-4 py-2 rounded hover:bg-[#D600E6] transition-colors font-bold"
          >
            Close
          </button>
        </div>

        {gameState === 'ready' && (
          <div className="text-center text-white">
            <div className="bg-[#6CA6E6] text-black p-6 rounded-lg mb-6">
              <h3 className="text-2xl font-bold mb-4">📖 How to Play</h3>
              <div className="text-left space-y-3">
                <p>• <strong>READ the WORD</strong>, not the color it's displayed in!</p>
                <p>• Say each word out loud as fast as you can</p>
                <p>• Press <kbd className="bg-black text-[#FEC006] px-2 py-1 rounded font-mono">SPACE</kbd> after saying each word</p>
                <p>• Complete all 20 words as quickly as possible!</p>
              </div>
            </div>
            
            <div className="bg-gray-800 p-4 rounded-lg mb-6">
              <h4 className="text-[#FEC006] font-bold mb-2">🏆 Scoring System</h4>
              <div className="text-sm space-y-1">
                <p>⚡ Under 20 seconds: 🌟🌟🌟🌟🌟</p>
                <p>🚀 20-25 seconds: ⭐⭐⭐⭐</p>
                <p>👍 25-30 seconds: ⭐⭐⭐</p>
                <p>😅 Over 30 seconds: 😭 Try again!</p>
              </div>
            </div>

            <button 
              onClick={startGame}
              className="bg-[#6CA6E6] text-black px-8 py-4 rounded-lg font-bold text-xl hover:bg-[#5A96D6] transition-colors"
            >
              🎮 Start Challenge
            </button>
          </div>
        )}

        {gameState === 'playing' && gameWords.length > 0 && (
          <div className="text-center">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[#6CA6E6] font-bold">
                  Word {currentWordIndex + 1} of {gameWords.length}
                </span>
                <div className="bg-[#EA00FF] px-4 py-2 rounded text-white font-bold">
                  {startTime ? `${((Date.now() - startTime) / 1000).toFixed(1)}s` : '0.0s'}
                </div>
              </div>
              
              <div className="bg-gray-900 border-4 border-[#FEC006] rounded-xl p-8 mb-6">
                <div className="text-8xl font-bold mb-4" style={{ color: gameWords[currentWordIndex]?.color }}>
                  {gameWords[currentWordIndex]?.word}
                </div>
                <p className="text-[#6CA6E6] text-lg">
                  Say this word out loud, then press SPACE
                </p>
              </div>

              <div className="flex justify-center gap-4">
                <button 
                  onClick={nextWord}
                  className="bg-[#FEC006] text-black px-6 py-3 rounded-lg font-bold hover:bg-[#E6AB05] transition-colors"
                >
                  📢 Said it! (SPACE)
                </button>
              </div>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="flex justify-center space-x-2 mb-2">
                {Array.from({ length: gameWords.length }, (_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full ${
                      i < currentWordIndex 
                        ? 'bg-[#6CA6E6]' 
                        : i === currentWordIndex 
                          ? 'bg-[#FEC006]' 
                          : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-400 text-sm">Progress</p>
            </div>
          </div>
        )}

        {gameState === 'finished' && (
          <div className="text-center text-white">
            <div className="bg-[#6CA6E6] text-black p-6 rounded-lg mb-6">
              <h3 className="text-3xl font-bold mb-4">🎉 Challenge Complete!</h3>
              <div className="text-6xl font-bold mb-4">{totalTime.toFixed(2)}s</div>
              <div className="text-2xl font-bold mb-4">
                {getPerformanceMessage(totalTime)}
              </div>
              
              {getStars(totalTime) > 0 && (
                <div className="flex justify-center mb-4">
                  {Array.from({ length: getStars(totalTime) }, (_, i) => (
                    <span key={i} className="text-4xl">⭐</span>
                  ))}
                </div>
              )}
              
              {getStars(totalTime) === 0 && (
                <div className="text-6xl mb-4">😭</div>
              )}
            </div>

            <div className="flex gap-4 justify-center">
              <button 
                onClick={resetGame}
                className="bg-[#EA00FF] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#D600E6] transition-colors"
              >
                🔄 Play Again
              </button>
              <button 
                onClick={onClose}
                className="bg-gray-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-700 transition-colors"
              >
                🏠 Back to Arcade
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 