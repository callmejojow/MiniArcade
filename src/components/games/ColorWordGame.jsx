import React, { useState, useEffect, useCallback } from 'react';

const COLOR_WORDS = [
  'RED', 'YELLOW', 'BLUE', 'GREEN', 'PINK', 'ORANGE', 'PURPLE', 'WHITE', 'BLACK'
];

// Corresponding colors for the words above (same order)
const DISPLAY_COLORS = [
  '#FF0000', '#FFFF00', '#0000FF', '#00FF00', '#FFC0CB', '#FFA500', '#800080', '#FFFFFF', '#000000'
];

export default function ColorWordGame({ onClose }) {
  const [gameState, setGameState] = useState('ready'); // ready, playing, finished
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [totalTime, setTotalTime] = useState(0);
  const [gameWords, setGameWords] = useState([]);

  // Generate random word-color combinations from the same 9-color set
  const generateGameWords = useCallback(() => {
    const words = [];
    for (let i = 0; i < 20; i++) {
      // Choose word and color independently from the same color set
      const wordIndex = Math.floor(Math.random() * COLOR_WORDS.length);
      const colorIndex = Math.floor(Math.random() * COLOR_WORDS.length);
      
      const word = COLOR_WORDS[wordIndex];
      const color = DISPLAY_COLORS[colorIndex];
      
      words.push({ word, color, id: i });
    }
    return words;
  }, []);

  const startGame = () => {
    const words = generateGameWords();
    setGameWords(words);
    setCurrentWordIndex(0);
    setStartTime(Date.now());
    setTotalTime(0);
    setGameState('playing');
  };

  const nextWord = useCallback(() => {
    if (currentWordIndex < gameWords.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
    } else {
      // Game finished
      const endTime = Date.now();
      setTotalTime((endTime - startTime) / 1000);
      setGameState('finished');
    }
  }, [currentWordIndex, gameWords.length, startTime]);

  const resetGame = () => {
    setGameState('ready');
    setCurrentWordIndex(0);
    setStartTime(null);
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
  }, [gameState, nextWord]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  // Special styling for white text on dark background
  const getTextStyle = (color) => {
    if (color === '#FFFFFF') {
      return { 
        color: color, 
        textShadow: '2px 2px 4px rgba(0,0,0,0.8), -1px -1px 2px rgba(0,0,0,0.5)' 
      };
    } else if (color === '#FFFF00') {
      return { 
        color: color, 
        textShadow: '2px 2px 4px rgba(0,0,0,0.6)' 
      };
    }
    return { color: color };
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 font-mono">
      <div className="bg-[#3B0B0B] p-8 rounded-xl border-4 border-yellow-gold max-w-4xl w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-yellow-gold">Color Word Challenge</h2>
          <button 
            onClick={onClose}
            className="bg-magenta text-white px-4 py-2 rounded hover:bg-violet transition-colors font-bold border-2 border-sky-blue"
          >
            Close
          </button>
        </div>

        {gameState === 'ready' && (
          <div className="text-center text-white">
            <div className="bg-light-blue text-black p-6 rounded-lg mb-6 border-2 border-steel-blue">
              <h3 className="text-2xl font-bold mb-4">📖 How to Play</h3>
              <div className="text-left space-y-3">
                <p>• <strong>READ the WORD</strong>, not the color it's displayed in!</p>
                <p>• Say each word out loud as fast as you can</p>
                <p>• Press <kbd className="bg-midnight text-yellow-gold px-2 py-1 rounded font-mono border border-yellow-gold">SPACE</kbd> after saying each word</p>
                <p>• Complete all 20 words as quickly as possible!</p>
              </div>
            </div>
            
            <div className="bg-slate-purple p-4 rounded-lg mb-6 border-2 border-lavender-gray">
              <h4 className="text-yellow-gold font-bold mb-2">🏆 Scoring System</h4>
              <div className="text-sm space-y-1">
                <p>⚡ Under 20 seconds: 🌟🌟🌟🌟🌟</p>
                <p>🚀 20-25 seconds: ⭐⭐⭐⭐</p>
                <p>👍 25-30 seconds: ⭐⭐⭐</p>
                <p>😅 Over 30 seconds: 😭 Try again!</p>
              </div>
            </div>

            <div className="bg-slate-purple p-4 rounded-lg mb-6 border-2 border-lavender-gray">
              <h4 className="text-yellow-gold font-bold mb-2">🎨 Color Words</h4>
              <div className="flex flex-wrap justify-center gap-2 text-sm">
                {COLOR_WORDS.map((word) => (
                  <span key={word} className="bg-dark-purple px-3 py-1 rounded text-white border border-plum">
                    {word}
                  </span>
                ))}
              </div>
            </div>

            <button 
              onClick={startGame}
              className="bg-light-blue text-black px-8 py-4 rounded-lg font-bold text-xl hover:bg-steel-blue transition-colors border-2 border-yellow-gold"
            >
              🎮 Start Challenge
            </button>
          </div>
        )}

        {gameState === 'playing' && gameWords.length > 0 && (
          <div className="text-center">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-light-blue font-bold">
                  Word {currentWordIndex + 1} of {gameWords.length}
                </span>
                <div className="bg-magenta px-4 py-2 rounded text-white font-bold border border-yellow-gold">
                  {startTime ? `${((Date.now() - startTime) / 1000).toFixed(1)}s` : '0.0s'}
                </div>
              </div>
              
              <div className="bg-midnight border-4 border-yellow-gold rounded-xl p-8 mb-6">
                <div 
                  className="text-8xl font-bold mb-4" 
                  style={getTextStyle(gameWords[currentWordIndex]?.color)}
                >
                  {gameWords[currentWordIndex]?.word}
                </div>
                <p className="text-light-blue text-lg">
                  Say this word out loud, then press SPACE
                </p>
              </div>

              <div className="flex justify-center gap-4">
                <button 
                  onClick={nextWord}
                  className="bg-yellow-gold text-black px-6 py-3 rounded-lg font-bold hover:bg-pale-yellow transition-colors border-2 border-orange"
                >
                  📢 Said it! (SPACE)
                </button>
              </div>
            </div>

            <div className="bg-slate-purple p-4 rounded-lg border-2 border-lavender-gray">
              <div className="flex justify-center space-x-2 mb-2">
                {Array.from({ length: gameWords.length }, (_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full ${
                      i < currentWordIndex 
                        ? 'bg-light-blue' 
                        : i === currentWordIndex 
                          ? 'bg-yellow-gold' 
                          : 'bg-dark-purple'
                    }`}
                  />
                ))}
              </div>
              <p className="text-lavender-gray text-sm">Progress</p>
            </div>
          </div>
        )}

        {gameState === 'finished' && (
          <div className="text-center text-white">
            <div className="bg-light-blue text-black p-6 rounded-lg mb-6 border-2 border-steel-blue">
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
                className="bg-magenta text-white px-6 py-3 rounded-lg font-bold hover:bg-violet transition-colors border-2 border-sky-blue"
              >
                🔄 Play Again
              </button>
              <button 
                onClick={onClose}
                className="bg-slate-purple text-white px-6 py-3 rounded-lg font-bold hover:bg-dark-purple transition-colors border-2 border-lavender-gray"
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