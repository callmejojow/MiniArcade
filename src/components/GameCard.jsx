import React from 'react';

export default function GameCard({ game, onPlayClick }) {
  return (
    <div className="bg-[#EA00FF] p-4 rounded-xl border-4 border-[#3B0B0B] hover:scale-105 transition-transform duration-200 cursor-pointer">
      <div className="h-40 bg-[#6CA6E6] rounded-md mb-3 flex items-center justify-center">
        {game.image ? (
          <img src={game.image} alt={game.name} className="w-full h-full object-cover rounded-md" />
        ) : (
          <span className="text-black font-bold text-xl">{game.name}</span>
        )}
      </div>
      <h4 className="text-xl font-bold text-black">{game.name}</h4>
      <p className="text-sm text-black mt-1">{game.description}</p>
      <button 
        onClick={() => onPlayClick(game)}
        className="mt-3 bg-[#3B0B0B] text-white px-4 py-2 rounded-md hover:bg-[#5A1010] transition-colors duration-200 text-sm font-bold"
      >
        Play Now
      </button>
    </div>
  );
} 