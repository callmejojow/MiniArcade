import React, { useState, useEffect, useCallback } from 'react';

const MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
const COMPOSERS = ['mozart', 'beethoven', 'debussy'];
const ROMAN_NUMERALS = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
const AFFIRMATIONS = ['iamloved', 'iamworthy', 'iamenough'];

export default function PasswordGame({ onClose }) {
  const [password, setPassword] = useState('');
  const [gameState, setGameState] = useState('playing'); // playing, won, failed
  const [currentRule, setCurrentRule] = useState(1);
  const [failedRules, setFailedRules] = useState(new Set());
  const [randomCaptcha, setRandomCaptcha] = useState('');
  const [randomCountry, setRandomCountry] = useState('');
  const [floweyAlive, setFloweyAlive] = useState(true);
  const [lastWaterTime, setLastWaterTime] = useState(Date.now());

  // Generate random values for dynamic rules
  useEffect(() => {
    setRandomCaptcha(Math.random().toString(36).substring(2, 8).toUpperCase());
    const countries = ['france', 'spain', 'italy', 'germany', 'canada', 'japan', 'brazil', 'australia'];
    setRandomCountry(countries[Math.floor(Math.random() * countries.length)]);
  }, []);

  // Check if Flowey needs watering
  useEffect(() => {
    // Only start timer if Flowey is in the password AND the rule is active AND game is still playing
    if (currentRule >= 6 && floweyAlive && password.includes('🌼') && gameState === 'playing') {
      const interval = setInterval(() => {
        const now = Date.now();
        if (now - lastWaterTime > 30000) { // 30 seconds without watering
          setFloweyAlive(false);
          setGameState('failed');
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [currentRule, lastWaterTime, floweyAlive, password, gameState]);

  const rules = [
    {
      id: 1,
      text: "Your password must be at least 5 characters.",
      check: (pwd) => pwd.length >= 5
    },
    {
      id: 2,
      text: "Your password must include a number.",
      check: (pwd) => /\d/.test(pwd)
    },
    {
      id: 3,
      text: "Your password must include an uppercase letter.",
      check: (pwd) => /[A-Z]/.test(pwd)
    },
    {
      id: 4,
      text: "Your password must include a special character.",
      check: (pwd) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd)
    },
    {
      id: 5,
      text: "The digits in your password must add up to 25.",
      check: (pwd) => {
        const digits = pwd.match(/\d/g);
        if (!digits) return false;
        const sum = digits.reduce((acc, digit) => acc + parseInt(digit), 0);
        return sum === 25;
      }
    },
    {
      id: 6,
      text: "🌼 ← Howdy! I'm Flowey, Flowey the Flower! Put me in your password and keep me happy!",
      check: (pwd) => pwd.includes('🌼') && floweyAlive
    },
    {
      id: 7,
      text: "Your password must include a month.",
      check: (pwd) => MONTHS.some(month => pwd.toLowerCase().includes(month))
    },
    {
      id: 8,
      text: "Your password must include a Roman numeral.",
      check: (pwd) => /[IVXLCDM]/.test(pwd.toUpperCase())
    },
    {
      id: 9,
      text: "Your password must include one of our composers: Mozart, Beethoven, Debussy.",
      check: (pwd) => COMPOSERS.some(composer => pwd.toLowerCase().includes(composer))
    },
    {
      id: 10,
      text: "Your password must include a two-letter symbol from the periodic table.",
      check: (pwd) => {
        const symbols = ['He', 'Li', 'Be', 'Ne', 'Na', 'Mg', 'Al', 'Si', 'Cl', 'Ar', 'Ca', 'Ti', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn', 'Ga', 'Ge', 'As', 'Se', 'Br', 'Kr', 'Rb', 'Sr', 'Zr', 'Nb', 'Mo', 'Tc', 'Ru', 'Rh', 'Pd', 'Ag', 'Cd', 'In', 'Sn', 'Sb', 'Te', 'Xe', 'Cs', 'Ba', 'La', 'Ce', 'Pr', 'Nd', 'Pm', 'Sm', 'Eu', 'Gd', 'Tb', 'Dy', 'Ho', 'Er', 'Tm', 'Yb', 'Lu', 'Hf', 'Ta', 'Re', 'Os', 'Ir', 'Pt', 'Au', 'Hg', 'Tl', 'Pb', 'Bi', 'Po', 'At', 'Rn', 'Fr', 'Ra', 'Ac', 'Th', 'Pa', 'Np', 'Pu', 'Am', 'Cm', 'Bk', 'Cf', 'Es', 'Fm', 'Md', 'No', 'Lr', 'Rf', 'Db', 'Sg', 'Bh', 'Hs', 'Mt', 'Ds', 'Rg', 'Cn', 'Nh', 'Fl', 'Mc', 'Lv', 'Ts', 'Og'];
        return symbols.some(symbol => pwd.includes(symbol));
      }
    },
    {
      id: 11,
      text: "Your password must include the current moon phase: 🌕",
      check: (pwd) => pwd.includes('🌕')
    },
    {
      id: 12,
      text: `Your password must include this country: ${randomCountry}`,
      check: (pwd) => pwd.toLowerCase().includes(randomCountry.toLowerCase())
    },
    {
      id: 13,
      text: "Your password must include a leap year.",
      check: (pwd) => {
        const years = pwd.match(/\d{4}/g);
        if (!years) return false;
        return years.some(year => {
          const y = parseInt(year);
          return (y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0);
        });
      }
    },
    {
      id: 14,
      text: "Your password must include the best chess move: e4",
      check: (pwd) => pwd.toLowerCase().includes('e4')
    },
    {
      id: 15,
      text: "Your password must include an affirmation. Hint: youareloved, youareworthy, youareenough. Say any of these to yourself.",
      check: (pwd) => AFFIRMATIONS.some(affirmation => pwd.toLowerCase().includes(affirmation))
    }
  ];

  const waterFlowey = useCallback(() => {
    if (password.includes('🌼') && currentRule >= 6) {
      setLastWaterTime(Date.now());
      // Add water drop temporarily
      setPassword(prev => prev + '💧');
      setTimeout(() => {
        setPassword(prev => prev.replace('💧', ''));
      }, 1000);
    }
  }, [password, currentRule]);

  const checkRules = useCallback(() => {
    // Don't validate anything if password is empty
    if (password.length === 0) {
      setFailedRules(new Set());
      setCurrentRule(1);
      return;
    }

    const newFailedRules = new Set();
    let maxPassedRule = 0;

    // Check all rules up to current rule
    for (let i = 0; i < Math.min(currentRule, rules.length); i++) {
      const rule = rules[i];
      if (rule.check(password)) {
        maxPassedRule = rule.id;
      } else {
        newFailedRules.add(rule.id);
      }
    }

    setFailedRules(newFailedRules);

    // Advance to next rule if current is passed
    if (maxPassedRule === currentRule && currentRule < rules.length) {
      setCurrentRule(prev => prev + 1);
    }

    // Also check win condition if we just completed the last rule
    if (maxPassedRule === rules.length && newFailedRules.size === 0) {
      setGameState('won');
      return;
    }

    // Check win condition: we've reached the last rule, all rules pass, and no failures
    if (currentRule >= rules.length && newFailedRules.size === 0) {
      // Double-check that ALL rules actually pass
      let allRulesPass = true;
      for (let i = 0; i < rules.length; i++) {
        if (!rules[i].check(password)) {
          allRulesPass = false;
          break;
        }
      }
      if (allRulesPass) {
        setGameState('won');
      }
    }
  }, [password, currentRule, rules]);

  useEffect(() => {
    checkRules();
  }, [password, checkRules]);

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    
    // Check if Flowey is being deleted
    if (password.includes('🌼') && !newPassword.includes('🌼') && currentRule >= 6) {
      setFloweyAlive(false);
      setGameState('failed');
      return;
    }
    
    // Reset watering timer if Flowey is first added to password
    if (!password.includes('🌼') && newPassword.includes('🌼') && currentRule >= 6) {
      setLastWaterTime(Date.now());
    }
    
    setPassword(newPassword);
  };

  const resetGame = () => {
    setPassword('');
    setGameState('playing');
    setCurrentRule(1);
    setFailedRules(new Set());
    setFloweyAlive(true);
    setLastWaterTime(Date.now());
  };

  const getRuleStatus = (ruleId) => {
    // If password is empty, show first rule as pending, others as not shown
    if (password.length === 0) {
      return ruleId === 1 ? 'pending' : 'hidden';
    }
    
    if (ruleId > currentRule) return 'pending';
    if (failedRules.has(ruleId)) return 'failed';
    return 'passed';
  };

  const getRuleColor = (status) => {
    switch (status) {
      case 'passed': return 'text-light-blue';
      case 'failed': return 'text-coral';
      case 'pending': return 'text-lavender-gray';
      case 'hidden': return 'text-lavender-gray';
      default: return 'text-white';
    }
  };

  const getRuleIcon = (status) => {
    switch (status) {
      case 'passed': return '✅';
      case 'failed': return '❌';
      case 'pending': return '⏳';
      case 'hidden': return '⚪';
      default: return '⚪';
    }
  };

  if (gameState === 'failed') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 font-mono">
        <div className="bg-crimson p-8 rounded-xl border-4 border-coral max-w-2xl w-full mx-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">💀 GAME OVER 💀</h2>
          <p className="text-xl text-cream mb-6">
            {!floweyAlive ? "Flowey wilted away... That's not very nice, is it? You were supposed to be friends!" : "You failed to meet the password requirements."}
          </p>
          <div className="flex gap-4 justify-center">
            <button 
              onClick={resetGame}
              className="bg-yellow-gold text-black px-6 py-3 rounded-lg font-bold hover:bg-pale-yellow transition-colors border-2 border-orange"
            >
              🔄 Try Again
            </button>
            <button 
              onClick={onClose}
              className="bg-slate-purple text-white px-6 py-3 rounded-lg font-bold hover:bg-dark-purple transition-colors border-2 border-lavender-gray"
            >
              🏠 Back to Arcade
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'won') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 font-mono">
        <div className="bg-teal p-8 rounded-xl border-4 border-sky-blue max-w-2xl w-full mx-4 text-center">
          <img src="/images/flowey.gif" alt="Flowey" className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-coral mb-6">🎉 CONGRATULATIONS! 🎉</h2>
          <p className="text-xl text-white mb-4">You survived the Password Game!</p>
          <p className="text-lg text-lavender-gray mb-6">Your final password: <span className="font-bold text-yellow-gold break-all">{password}</span></p>
          <div className="flex gap-4 justify-center">
            <button 
              onClick={resetGame}
              className="bg-yellow-gold text-black px-6 py-3 rounded-lg font-bold hover:bg-pale-yellow transition-colors border-2 border-orange"
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
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 font-mono overflow-y-auto">
      <div className="bg-plum p-6 rounded-xl border-4 border-yellow-gold max-w-4xl w-full mx-4 my-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-yellow-gold">🔐 The Password Game</h2>
          <button 
            onClick={onClose}
            className="bg-magenta text-white px-4 py-2 rounded hover:bg-violet transition-colors font-bold border-2 border-sky-blue"
          >
            Close
          </button>
        </div>

        <div className="mb-6">
          <label className="block text-white font-bold mb-2">
            Please choose a password:
          </label>
          <input
            type="text"
            value={password}
            onChange={handlePasswordChange}
            className="w-full p-3 rounded-lg border-2 border-yellow-gold bg-dark-purple text-white font-mono text-lg"
            placeholder="Start typing your password..."
          />
        </div>

        {currentRule >= 6 && floweyAlive && (
          <div className="mb-6 p-4 bg-dark-purple rounded-lg border-2 border-coral">
            {!password.includes('🌼') ? (
              <div>
                <p className="text-yellow-gold font-bold text-lg mb-2">
                  🌼 Howdy! I'm Flowey! Add me to your password first!
                </p>
                <p className="text-cream text-sm">
                  Type the flower emoji 🌼 into your password to let me join the fun!
                </p>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center">
                  <p className="text-coral font-bold">🌼 Flowey is looking a bit thirsty... Give me some water!</p>
                  <button 
                    onClick={waterFlowey}
                    className="bg-coral text-white px-3 py-1 rounded font-bold hover:bg-crimson transition-colors"
                  >
                    Water Flowey 💧
                  </button>
                </div>
                <p className="text-cream text-sm mt-2">
                  Last watered: {Math.floor((Date.now() - lastWaterTime) / 1000)}s ago (Water within 30s or I'll wilt!)
                </p>
              </div>
            )}
          </div>
        )}

        <div className="space-y-3 max-h-96 overflow-y-auto">
          {rules.slice(0, currentRule).filter((rule) => {
            const status = getRuleStatus(rule.id);
            return status !== 'hidden';
          }).map((rule) => {
            const status = getRuleStatus(rule.id);
            return (
              <div 
                key={rule.id} 
                className={`p-3 rounded-lg border-2 ${
                  status === 'failed' ? 'bg-crimson border-coral' : 
                  status === 'passed' ? 'bg-dark-teal border-sky-blue' : 
                  'bg-slate-purple border-lavender-gray'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-xl">{getRuleIcon(status)}</span>
                  <div className="flex-1">
                    <span className="font-bold text-cream">Rule {rule.id}:</span>
                    <span className={`ml-2 ${getRuleColor(status)}`}>
                      {rule.text}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-dark-purple rounded-lg border-2 border-yellow-gold">
          <div className="flex justify-between items-center">
            <span className="text-white font-bold">Progress:</span>
            <span className="text-yellow-gold font-bold">
              Rule {currentRule} of {rules.length}
            </span>
          </div>
          <div className="mt-2 w-full bg-midnight rounded-full h-3">
            <div 
              className="bg-yellow-gold h-3 rounded-full transition-all duration-300"
              style={{ width: `${(currentRule / rules.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 