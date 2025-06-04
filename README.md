# Edward's MiniArcade 🎮

A modern web-based arcade featuring classic pixel-style mini games built with React and Tailwind CSS. Inspired by neel.fun, this project brings retro gaming to the modern web.

## 🎯 Features

- **Responsive Design**: Beautiful UI that works on desktop and mobile
- **Pixel Perfect**: Retro-inspired design with modern UX
- **Multiple Games**: Growing collection of classic arcade games
- **Real-time Gameplay**: Smooth, interactive gaming experience
- **Modern Stack**: Built with React and Tailwind CSS

## 🎮 Available Games

### Currently Playable
- **Snake Game**: Classic snake game with pixel-perfect controls
  - Arrow key controls
  - Score tracking
  - Collision detection
  - Food generation

### Coming Soon
- Block Jumper
- Mini Quest  
- Neon Runner
- Puzzle Master
- Color Match
- Tetris Clone
- Pac-Man Mini
- Space Invaders
- Breakout

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd miniarcade
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 🎨 Design System

### Color Palette
- **Dark Maroon**: `#3B0B0B` - Headers and borders
- **Bright Gold**: `#FEC006` - Accents and highlights  
- **Soft Blue**: `#6CA6E6` - Game elements and text
- **Neon Magenta**: `#EA00FF` - Cards and interactive elements
- **Black**: `#000000` - Background

### Typography
- **Font**: Monospace for that classic arcade feel
- **Responsive**: Scales beautifully across devices

## 🛠️ Project Structure

```
src/
├── components/
│   ├── HomePage.jsx          # Main homepage component
│   ├── GameCard.jsx          # Reusable game card component
│   └── games/
│       └── SnakeGame.jsx     # Snake game implementation
├── App.js                    # Main app component
├── index.css                 # Tailwind CSS imports
└── index.js                  # React entry point
```

## 🎯 Adding New Games

To add a new game to the arcade:

1. Create a new component in `src/components/games/`
2. Implement your game logic with React hooks
3. Add the game to the `games` array in `HomePage.jsx`
4. Set the `component` property to your new game component

### Game Component Template
```jsx
import React from 'react';

export default function YourGame({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div className="bg-[#3B0B0B] p-6 rounded-xl border-4 border-[#FEC006]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-[#FEC006]">Your Game</h2>
          <button onClick={onClose} className="bg-[#EA00FF] text-white px-4 py-2 rounded">
            Close
          </button>
        </div>
        {/* Your game content here */}
      </div>
    </div>
  );
}
```

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Inspired by [neel.fun](https://neel.fun)
- Built with love by Edward
- Special thanks to the React and Tailwind CSS communities

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Static Hosting
The `build` folder can be deployed to any static hosting service like:
- Netlify
- Vercel
- GitHub Pages
- AWS S3

---

**Happy Gaming! 🎮✨**
