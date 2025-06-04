import React from 'react';

export default function About({ onClose }) {
  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* Header */}
      <header className="bg-[#3B0B0B] text-white border-b-4 border-yellow-gold">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3 sm:py-4">
            <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold tracking-wider sm:tracking-widest">
              <span className="block sm:hidden">Edward's<br/>MiniArcade</span>
              <span className="hidden sm:block">Edward's MiniArcade</span>
            </h1>
            
            <button 
              onClick={onClose}
              className="bg-magenta text-white px-4 py-2 rounded hover:bg-violet transition-colors font-bold text-sm sm:text-base border-2 border-sky-blue"
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
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-yellow-gold mb-4 sm:mb-6">
              🎮 About Me
            </h2>
            <div className="w-full h-1 bg-yellow-gold mx-auto"></div>
          </div>

          {/* Main Content */}
          <div className="space-y-6 sm:space-y-8 lg:space-y-10">
            {/* Introduction */}
            <div className="bg-plum p-6 sm:p-8 lg:p-10 rounded-xl border-4 border-yellow-gold shadow-lg">
              <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-light-blue mb-4">
                Hi! I'm <span className="text-yellow-gold font-bold">Edward</span>, I'm 10 years old. I love both video games and classical music. 
              </p>
              <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-cream">
                When I'm not practicing Mozart or Chopin for my next piano competition, I'm probably thinking up a new game idea or coding something fun.
              </p>
            </div>

            {/* Game Creation */}
            <div className="bg-coral p-6 sm:p-8 lg:p-10 rounded-xl border-4 border-peach shadow-lg">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-midnight mb-4 sm:mb-6">
                🕹️ Game Creation
              </h3>
              <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-midnight mb-4">
                I created MiniArcade to share the little games I make with the world. Some are silly, some are puzzling, and all of them are made with imagination (and a bit of pixel magic).
              </p>
              <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-midnight">
                I'm inspired by games like <span className="font-bold text-dark-brown">Undertale</span> and <span className="font-bold text-dark-brown">Minecraft</span>, and I hope to make things that are just as fun and full of surprises.
              </p>
            </div>

            {/* Piano Performance */}
            <div className="bg-light-blue p-6 sm:p-8 lg:p-10 rounded-xl border-4 border-steel-blue shadow-lg">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-midnight mb-4 sm:mb-6">
                🎹 Piano Performance
              </h3>
              <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-midnight mb-4">
                When I'm not designing or building games, I'm performing on stage. I've been learning piano since I was 7, and now I play advanced pieces like Mozart's Concertos and Bach's Well-Tempered Clavier.
              </p>
              <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-midnight">
                You can check out my performances on my <span className="font-bold text-indigo-700"><a href="https://www.youtube.com/@edwardzpiano" target="_blank" rel="noopener noreferrer">YouTube channel</a></span>.
              </p>
            </div>

            {/* Fun Facts Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              <div className="bg-slate-purple p-4 sm:p-6 rounded-lg border-4 border-yellow-gold shadow-md">
                <h4 className="text-lg sm:text-xl font-bold text-yellow-gold mb-2 sm:mb-3">🎵 Piano Since</h4>
                <p className="text-2xl sm:text-3xl font-bold text-cream">Age 7</p>
              </div>
              
              <div className="bg-dark-purple p-4 sm:p-6 rounded-lg border-4 border-magenta shadow-md">
                <h4 className="text-lg sm:text-xl font-bold text-magenta mb-2 sm:mb-3">🎮 Current Age</h4>
                <p className="text-2xl sm:text-3xl font-bold text-cream">10 Years</p>
              </div>
              
              <div className="bg-teal p-4 sm:p-6 rounded-lg border-4 border-sky-blue shadow-md">
                <h4 className="text-lg sm:text-xl font-bold text-midnight mb-2 sm:mb-3">🎯 Hobbies</h4>
                <p className="text-sm sm:text-base text-white">Piano, Coding, Snowboarding, Biking, Reading and Gaming</p>
              </div>
              
              <div className="bg-rust p-4 sm:p-6 rounded-lg border-4 border-orange shadow-md">
                <h4 className="text-lg sm:text-xl font-bold text-cream mb-2 sm:mb-3">✨ Favorite Games</h4>
                <p className="text-sm sm:text-base text-white">Undertale, Minecraft, Roblox, Super Mario Series, and more!</p>
              </div>
            </div>

            <img src="/images/sus.gif" alt="among_us_gif" className="w-full h-auto rounded-xl" />

            {/* Closing Message */}
            <div className="bg-brown p-6 sm:p-8 lg:p-10 rounded-xl border-4 border-yellow-gold text-center shadow-lg">
              <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed text-light-blue mb-4 sm:mb-6">
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