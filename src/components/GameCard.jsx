import React from 'react';

export default function GameCard({ game, onPlayClick }) {
  return (
    <div className="bg-[#EA00FF] p-3 sm:p-4 lg:p-5 rounded-xl border-4 border-[#3B0B0B] hover:scale-105 transition-transform duration-200 cursor-pointer w-full">
      <div className="h-32 sm:h-36 lg:h-40 bg-[#6CA6E6] rounded-md mb-3 flex items-end justify-center overflow-hidden">
        {game.image ? (
          <img 
            src={game.image} 
            alt={game.name} 
            className="w-full h-full object-cover object-bottom rounded-md" 
            loading="lazy"
          />
        ) : (
          <span className="text-black font-bold text-sm sm:text-lg lg:text-xl p-2 text-center leading-tight">
            {game.name}
          </span>
        )}
      </div>
      <h4 className="text-base sm:text-lg lg:text-xl font-bold text-black mb-1 sm:mb-2 line-clamp-2">
        {game.name}
      </h4>
      <p className="text-xs sm:text-sm lg:text-base text-black mb-3 sm:mb-4 line-clamp-3 leading-relaxed">
        {game.description}
      </p>
      <button 
        onClick={() => onPlayClick(game)}
        className={`w-full py-2.5 sm:py-3 px-4 rounded-md text-sm sm:text-base font-bold transition-colors duration-200 touch-manipulation ${
          game.component 
            ? 'bg-[#3B0B0B] text-white hover:bg-[#5A1010] active:bg-[#2A0808]' 
            : 'bg-gray-600 text-gray-300 cursor-not-allowed'
        }`}
      >
        {game.component ? 'Play Now' : 'Coming Soon'}
      </button>
    </div>
  );
} 