import React from 'react';

export default function GameCard({ game, onPlayClick }) {
  return (
    <div className="bg-[#EA00FF] p-4 rounded-xl border-4 border-[#3B0B0B] hover:scale-105 transition-transform duration-200 cursor-pointer">
      <div className="h-40 bg-[#6CA6E6] rounded-md mb-3 flex items-end justify-center">
        {game.image ? (
          <img src={game.image} alt={game.name} className="w-full h-full object-cover object-bottom rounded-md" />
        ) : (
          <span className="text-black font-bold text-xl">{game.name}</span>
        )}
      </div>
      <h4 className="text-xl font-bold text-black">{game.name}</h4>
      <p className="text-sm text-black mt-1">{game.description}</p>
      <button 
        onClick={() => onPlayClick(game)}
        className={`mt-3 px-4 py-2 rounded-md text-sm font-bold transition-colors duration-200 ${
          game.component 
            ? 'bg-[#3B0B0B] text-white hover:bg-[#5A1010]' 
            : 'bg-gray-600 text-gray-300 cursor-not-allowed'
        }`}
      >
        {game.component ? 'Play Now' : 'Coming Soon'}
      </button>
    </div>
  );
} 