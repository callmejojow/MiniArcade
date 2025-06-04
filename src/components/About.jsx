import React from 'react';

export default function About({ onClose }) {
  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* Header */}
      <header className="bg-[#3B0B0B] text-white border-b-4 border-[#FEC006]">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3 sm:py-4">
            <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold tracking-wider sm:tracking-widest">
              <span className="block sm:hidden">Edward's<br/>MiniArcade</span>
              <span className="hidden sm:block">Edward's MiniArcade</span>
            </h1>
            
            <button 
              onClick={onClose}
              className="bg-[#EA00FF] text-white px-4 py-2 rounded hover:bg-[#D600E6] transition-colors font-bold text-sm sm:text-base"
            >
              Back to Home
            </button>
          </div>
        </div>
      </header>

      {/* About Content */}
      <main className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FEC006] mb-4 sm:mb-6">
              🎮 About Me
            </h2>
            <div className="w-24 sm:w-32 h-1 bg-[#FEC006] mx-auto"></div>
          </div>

          {/* Main Content */}
          <div className="space-y-6 sm:space-y-8 lg:space-y-10">
            {/* Introduction */}
            <div className="bg-[#3B0B0B] p-6 sm:p-8 lg:p-10 rounded-xl border-4 border-[#FEC006]">
              <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-[#6CA6E6] mb-4">
                Hi! I'm <span className="text-[#FEC006] font-bold">Edward</span> — a 10-year-old kid who loves both video games and classical piano. 
              </p>
              <p className="text-base sm:text-lg lg:text-xl leading-relaxed">
                When I'm not practicing Mozart or Chopin for my next piano competition, I'm probably thinking up a new game idea or coding something fun.
              </p>
            </div>

            {/* Game Creation */}
            <div className="bg-[#EA00FF] p-6 sm:p-8 lg:p-10 rounded-xl border-4 border-[#3B0B0B]">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-black mb-4 sm:mb-6">
                🕹️ Game Creation
              </h3>
              <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-black mb-4">
                I created MiniArcade to share the little games I make with the world. Some are silly, some are puzzling, and all of them are made with imagination (and a bit of pixel magic).
              </p>
              <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-black">
                I'm inspired by games like <span className="font-bold">Undertale</span> and <span className="font-bold">Minecraft</span>, and I hope to make things that are just as fun and full of surprises.
              </p>
            </div>

            {/* Piano Performance */}
            <div className="bg-[#6CA6E6] p-6 sm:p-8 lg:p-10 rounded-xl border-4 border-[#3B0B0B]">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-black mb-4 sm:mb-6">
                🎹 Piano Performance
              </h3>
              <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-black mb-4">
                When I'm not building games, I'm performing on stage — I've been learning piano since I was 5, and now I play advanced pieces like concertos and fantasias.
              </p>
              <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-black">
                You can check out my performances on my <span className="font-bold text-[#3B0B0B]">YouTube channel</span>.
              </p>
            </div>

            {/* Fun Facts Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              <div className="bg-gray-800 p-4 sm:p-6 rounded-lg border-2 border-[#FEC006]">
                <h4 className="text-lg sm:text-xl font-bold text-[#FEC006] mb-2 sm:mb-3">🎵 Piano Since</h4>
                <p className="text-2xl sm:text-3xl font-bold text-white">Age 5</p>
              </div>
              
              <div className="bg-gray-800 p-4 sm:p-6 rounded-lg border-2 border-[#EA00FF]">
                <h4 className="text-lg sm:text-xl font-bold text-[#EA00FF] mb-2 sm:mb-3">🎮 Current Age</h4>
                <p className="text-2xl sm:text-3xl font-bold text-white">10 Years</p>
              </div>
              
              <div className="bg-gray-800 p-4 sm:p-6 rounded-lg border-2 border-[#6CA6E6]">
                <h4 className="text-lg sm:text-xl font-bold text-[#6CA6E6] mb-2 sm:mb-3">🎯 Inspiration</h4>
                <p className="text-sm sm:text-base text-white">Undertale & Minecraft</p>
              </div>
              
              <div className="bg-gray-800 p-4 sm:p-6 rounded-lg border-2 border-[#FEC006]">
                <h4 className="text-lg sm:text-xl font-bold text-[#FEC006] mb-2 sm:mb-3">✨ Magic Ingredient</h4>
                <p className="text-sm sm:text-base text-white">Imagination + Pixels</p>
              </div>
            </div>

            {/* Closing Message */}
            <div className="bg-gradient-to-r from-[#3B0B0B] to-[#5A1010] p-6 sm:p-8 lg:p-10 rounded-xl border-4 border-[#FEC006] text-center">
              <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed text-[#6CA6E6] mb-4 sm:mb-6">
                Thanks for visiting MiniArcade. Have fun and come back soon — there's always something new cooking! 
              </p>
              <div className="text-4xl sm:text-5xl lg:text-6xl">
                🕹️🎹
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 