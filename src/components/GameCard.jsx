import React from 'react';

export default function GameCard({ game, onPlayClick }) {
  return (
    <div className="bg-plum p-3 sm:p-4 lg:p-5 rounded-xl border-4 border-yellow-gold hover:scale-105 transition-transform duration-200 cursor-pointer w-full shadow-lg">
      <div className="h-32 sm:h-36 lg:h-48 bg-light-blue rounded-md mb-3 flex items-end justify-center overflow-hidden border-2 border-steel-blue">
        {game.image ? (
          <img 
            src={game.image} 
            alt={game.name} 
            className="w-full h-full object-cover object-bottom rounded-md" 
            loading="lazy"
          />
        ) : (
          <span className="text-midnight font-bold text-sm sm:text-lg lg:text-xl p-2 text-center leading-tight">
            {game.name}
          </span>
        )}
      </div>
      <h4 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-1 sm:mb-2 line-clamp-2">
        {game.name}
      </h4>
      <p className="text-xs sm:text-sm lg:text-base text-cream mb-3 sm:mb-4 line-clamp-3 leading-relaxed">
        {game.description}
      </p>
      <button 
        onClick={() => onPlayClick(game)}
        className={`w-full py-2.5 sm:py-3 px-4 rounded-md text-sm sm:text-base font-bold transition-all duration-200 touch-manipulation border-2 ${
          game.component 
            ? 'bg-dark-teal text-white hover:bg-teal active:bg-midnight border-sky-blue hover:border-yellow-gold' 
            : 'bg-slate-purple text-lavender-gray cursor-not-allowed border-brown'
        }`}
      >
        {game.component ? 'Play Now' : 'Coming Soon'}
      </button>
    </div>
  );
} 