import React, { useState } from 'react';
import SnakeGame from './games/SnakeGame';
import ColorWordGame from './games/ColorWordGame';
import GameCard from './GameCard';
import About from './About';

export default function HomePage() {
  const [currentGame, setCurrentGame] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home'); // home, about

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

  const navigateToPage = (page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false); // Close mobile menu when navigating
  };

  const handleSubmitGame = () => {
    alert('Submit Game feature coming soon! 🚀');
  };

  // If About page is active, show About component
  if (currentPage === 'about') {
    return <About onClose={() => setCurrentPage('home')} />;
  }

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* Header - Mobile First */}
      <header className="bg-[#3B0B0B] text-white border-b-4 border-yellow-gold">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3 sm:py-4">
            {/* Logo - Responsive sizing */}
            <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold tracking-wider sm:tracking-widest">
              <span className="block sm:hidden">Edward's<br/>MiniArcade</span>
              <span className="hidden sm:block">Edward's MiniArcade</span>
            </h1>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-4 lg:space-x-6 text-sm lg:text-lg">
              <button 
                onClick={() => navigateToPage('home')}
                className={`hover:text-yellow-gold transition-colors duration-200 ${currentPage === 'home' ? 'text-yellow-gold' : ''}`}
              >
                Home
              </button>
              <button 
                onClick={() => navigateToPage('about')}
                className={`hover:text-yellow-gold transition-colors duration-200 ${currentPage === 'about' ? 'text-yellow-gold' : ''}`}
              >
                About
              </button>
              <button 
                onClick={handleSubmitGame}
                className="hover:text-yellow-gold transition-colors duration-200"
              >
                Submit Game
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 rounded-md hover:bg-plum transition-colors border border-yellow-gold"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <div className="w-5 h-5 flex flex-col justify-center items-center">
                <span className={`bg-white block h-0.5 w-5 rounded-sm transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`}></span>
                <span className={`bg-white block h-0.5 w-5 rounded-sm transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`bg-white block h-0.5 w-5 rounded-sm transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`}></span>
              </div>
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          <div className={`md:hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-48 pb-4' : 'max-h-0 overflow-hidden'}`}>
            <nav className="flex flex-col space-y-3 pt-3 border-t border-yellow-gold/30">
              <button 
                onClick={() => navigateToPage('home')}
                className={`block hover:text-yellow-gold transition-colors duration-200 text-base text-left ${currentPage === 'home' ? 'text-yellow-gold' : ''}`}
              >
                Home
              </button>
              <button 
                onClick={() => navigateToPage('about')}
                className={`block hover:text-yellow-gold transition-colors duration-200 text-base text-left ${currentPage === 'about' ? 'text-yellow-gold' : ''}`}
              >
                About
              </button>
              <button 
                onClick={handleSubmitGame}
                className="block hover:text-yellow-gold transition-colors duration-200 text-base text-left"
              >
                Submit Game
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section - Responsive */}
      <section className="text-center py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-light-blue text-black border-b-4 border-steel-blue">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 lg:mb-6">
          Welcome to Edward's MiniArcade!
        </h2>
        <p className="text-base sm:text-lg lg:text-xl xl:text-2xl max-w-4xl mx-auto leading-relaxed">
          Everything is a game, and everything is a work in progress.
        </p>
      </section>

      {/* Game Grid - Mobile First Grid */}
      <section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 bg-[#000000]">
        <h3 className="text-xl sm:text-2xl lg:text-3xl mb-6 sm:mb-8 lg:mb-10 text-[#FEC006] font-semibold text-center sm:text-left">
          Featured Games
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {games.map((game) => (
            <GameCard 
              key={game.id} 
              game={game} 
              onPlayClick={handlePlayGame}
            />
          ))}
        </div>
      </section>

      {/* Coming Soon Section - Responsive Grid */}
      <section className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 bg-[#3B0B0B]">
        <h3 className="text-xl sm:text-2xl lg:text-3xl mb-6 sm:mb-8 text-yellow-gold font-semibold text-center">
          More Games In Development
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {['IDK', 'IDK', 'IDK', 'IDK'].map((name, id) => (
            <div key={id} className="bg-slate-purple p-3 sm:p-4 rounded-lg border-4 border-lavender-gray opacity-60">
              <div className="h-16 sm:h-20 lg:h-24 bg-dark-purple rounded-md mb-2 sm:mb-3 flex items-center justify-center border border-midnight">
                <span className="text-lavender-gray text-xs sm:text-sm">Coming Soon</span>
              </div>
              <h5 className="text-xs sm:text-sm lg:text-base font-bold text-cream text-center">
                {name}
              </h5>
            </div>
          ))}
        </div>
      </section>

      {/* Footer - Responsive */}
      <footer className="text-center py-6 sm:py-8 lg:py-10 px-4 text-steel-blue border-t-2 border-plum">
        <p className="text-sm sm:text-base lg:text-lg mb-2">Built with ❤️ by Edward Z</p>
        <p className="text-xs sm:text-sm text-lavender-gray max-w-2xl mx-auto">
          © 2025 Edward's MiniArcade. All games are for entertainment purposes.
        </p>
      </footer>

      {/* Game Modal - Responsive */}
      {currentGame && currentGame.component && (
        <currentGame.component onClose={closeGame} />
      )}
    </div>
  );
} 