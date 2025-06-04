import React, { useState } from 'react';
import SnakeGame from './games/SnakeGame';
import ColorWordGame from './games/ColorWordGame';
import GameCard from './GameCard';

export default function HomePage() {
  const [currentGame, setCurrentGame] = useState(null);

  const games = [
    { 
      id: 1, 
      name: 'Snake Game', 
      image: '/images/snake-game.png',
      description: 'Classic snake game with pixel-perfect controls.',
      component: SnakeGame 
    },
    { 
      id: 2, 
      name: 'Block Jumper', 
      description: 'Jump through challenging block obstacles.',
      component: null // Coming soon
    },
    { 
      id: 3, 
      name: 'Color Word Challenge', 
      image: '/images/color-word-game.png',
      description: 'Read color words displayed in different colors. Test your focus!',
      component: ColorWordGame 
    },
    { 
      id: 4, 
      name: 'Neon Runner', 
      description: 'Run through neon-lit corridors at high speed.',
      component: null // Coming soon
    },
    { 
      id: 5, 
      name: 'Puzzle Master', 
      description: 'Solve mind-bending puzzles in record time.',
      component: null // Coming soon
    },
    { 
      id: 6, 
      name: 'Color Match', 
      description: 'Match colors in this fast-paced arcade game.',
      component: null // Coming soon
    }
  ];

  const handlePlayGame = (game) => {
    if (game.component) {
      setCurrentGame(game);
    } else {
      alert('This game is coming soon! 🎮');
    }
  };

  const closeGame = () => {
    setCurrentGame(null);
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* Header */}
      <header className="bg-[#3B0B0B] text-white py-4 px-6 flex justify-between items-center border-b-4 border-[#FEC006]">
        <h1 className="text-3xl font-bold tracking-widest">Edward's MiniArcade</h1>
        <nav className="space-x-4 text-lg">
          <a href="#" className="hover:text-[#FEC006] transition-colors duration-200">Home</a>
          <a href="#" className="hover:text-[#FEC006] transition-colors duration-200">About</a>
          <a href="#" className="hover:text-[#FEC006] transition-colors duration-200">Submit Game</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="text-center py-12 px-4 bg-[#6CA6E6] text-black">
        <h2 className="text-4xl font-bold mb-4">Welcome to Edward's MiniArcade!</h2>
        <p className="text-xl">Everything is a game, and everything is a work in progress.</p>
      </section>

      {/* Game Grid */}
      <section className="px-6 py-12 bg-[#000000]">
        <h3 className="text-2xl mb-6 text-[#FEC006] font-semibold">Featured Games</h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {games.map((game) => (
            <GameCard 
              key={game.id} 
              game={game} 
              onPlayClick={handlePlayGame}
            />
          ))}
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="px-6 py-8 bg-[#3B0B0B]">
        <h3 className="text-2xl mb-6 text-[#FEC006] font-semibold text-center">More Games In Development</h3>
        <div className="grid gap-4 md:grid-cols-4">
          {['Tetris Clone', 'Pac-Man Mini', 'Space Invaders', 'Breakout'].map((name, id) => (
            <div key={id} className="bg-gray-800 p-4 rounded-lg border-2 border-gray-600 opacity-60">
              <div className="h-24 bg-gray-700 rounded-md mb-2 flex items-center justify-center">
                <span className="text-gray-400 text-sm">Coming Soon</span>
              </div>
              <h5 className="text-sm font-bold text-gray-400">{name}</h5>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-[#6CA6E6] border-t-2 border-[#3B0B0B]">
        <p>Built with ❤️ by Edward Z</p>
        <p className="text-sm mt-2 text-gray-400">© 2024 Edward's MiniArcade. All games are for entertainment purposes.</p>
      </footer>

      {/* Game Modal */}
      {currentGame && currentGame.component && (
        <currentGame.component onClose={closeGame} />
      )}
    </div>
  );
} 