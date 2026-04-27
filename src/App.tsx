import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Gamepad2, Music as MusicIcon, Trophy, Terminal, Cpu } from 'lucide-react';
import { SnakeGame } from './components/SnakeGame';
import { MusicPlayer } from './components/MusicPlayer';

export default function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const handleScoreUpdate = (newScore: number) => {
    setScore(newScore);
    if (newScore > highScore) {
      setHighScore(newScore);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 flex items-center justify-center relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-30">
        <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-neon-purple rounded-full blur-[160px]" />
        <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-neon-blue rounded-full blur-[160px]" />
      </div>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        
        {/* Left Column: Stats & Meta */}
        <div className="lg:col-span-3 space-y-6 order-2 lg:order-1">
          <div className="neon-border rounded-2xl bg-black/40 backdrop-blur-md p-6">
            <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
              <Terminal className="text-neon-green w-5 h-5" />
              <h2 className="font-mono text-sm uppercase tracking-widest text-neon-green">Session Status</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-mono text-white/40 uppercase tracking-tighter block mb-1">Current Score</label>
                <motion.div 
                  key={score}
                  initial={{ scale: 1.2, color: '#39ff14' }}
                  animate={{ scale: 1, color: '#fff' }}
                  className="text-4xl font-black font-mono"
                >
                  {score.toString().padStart(5, '0')}
                </motion.div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[10px] font-mono text-white/40 uppercase tracking-tighter flex items-center gap-1">
                    <Trophy className="w-3 h-3" /> All-Time High
                  </label>
                </div>
                <div className="text-2xl font-black font-mono text-neon-pink">
                  {highScore.toString().padStart(5, '0')}
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-white/30 truncate">ARCADE_OS</span>
                  <span className="text-neon-blue">v2.4.0</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-white/30">LATENCY</span>
                  <span className="text-neon-green">14ms</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-white/30">BUFFER</span>
                  <span className="text-neon-pink">STABLE</span>
                </div>
              </div>
            </div>
          </div>

          <div className="neon-border rounded-2xl bg-black/40 backdrop-blur-md p-6 hidden md:block">
            <div className="flex items-center gap-3 mb-4">
              <Cpu className="text-neon-blue w-5 h-5 animate-spin-slow" />
              <h3 className="font-mono text-xs uppercase tracking-widest">Hardware Info</h3>
            </div>
            <p className="text-[10px] text-white/40 font-mono leading-relaxed">
              NEURAL INTERFACE CONNECTED. SYNTHESIS ENGINE RUNNING AT 440HZ. GRID STABILITY: 99.8%. PLEASE MAINTAIN FOCUS.
            </p>
          </div>
        </div>

        {/* Center: Game Arena */}
        <main className="lg:col-span-6 order-1 lg:order-2">
          <div className="flex items-center justify-between mb-4 px-2">
             <div className="flex items-center gap-2">
                <Gamepad2 className="text-neon-blue w-6 h-6 animate-bounce" />
                <h1 className="text-2xl font-black italic tracking-tighter uppercase neon-text-blue">Neon Snake</h1>
             </div>
             <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
                <div className="w-2 h-2 rounded-full bg-neon-pink animate-pulse delay-75" />
                <div className="w-2 h-2 rounded-full bg-neon-blue animate-pulse delay-150" />
             </div>
          </div>
          <SnakeGame onScoreUpdate={handleScoreUpdate} />
          
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="bg-white/5 rounded-xl p-3 text-center border border-white/5">
              <span className="block text-[8px] text-white/40 uppercase font-mono mb-1">Grid Size</span>
              <span className="text-xs font-bold text-white/80">20x20</span>
            </div>
            <div className="bg-white/5 rounded-xl p-3 text-center border border-white/5">
              <span className="block text-[8px] text-white/40 uppercase font-mono mb-1">Control</span>
              <span className="text-xs font-bold text-white/80">WASD/Arrows</span>
            </div>
            <div className="bg-white/5 rounded-xl p-3 text-center border border-white/5">
              <span className="block text-[8px] text-white/40 uppercase font-mono mb-1">Difficulty</span>
              <span className="text-xs font-bold text-white/80 italic">Adaptive</span>
            </div>
          </div>
        </main>

        {/* Right Column: Player Controls */}
        <div className="lg:col-span-3 order-3">
          <div className="flex items-center gap-3 mb-4 px-2">
            <MusicIcon className="text-neon-pink w-5 h-5" />
            <h2 className="font-mono text-sm uppercase tracking-widest neon-text-pink">Rhythm Sync</h2>
          </div>
          <MusicPlayer />

          <div className="mt-6 p-4 rounded-2xl bg-gradient-to-br from-neon-pink/10 to-neon-blue/10 border border-white/5">
            <p className="text-[10px] font-mono text-white/60 mb-3 uppercase tracking-tighter">Upcoming Releases</p>
            <div className="space-y-3">
              {[1, 2].map(i => (
                <div key={i} className="flex items-center gap-3 opacity-40 grayscale group hover:grayscale-0 hover:opacity-100 transition-all cursor-not-allowed">
                  <div className="w-10 h-10 rounded border border-white/20 bg-white/5" />
                  <div className="flex-1">
                    <div className="w-2/3 h-2 bg-white/20 rounded mb-2" />
                    <div className="w-1/3 h-1 bg-white/10 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
      
      {/* Footer Meta */}
      <footer className="fixed bottom-4 left-4 z-50 pointer-events-none">
        <div className="text-[8px] font-mono text-white/20 uppercase tracking-[0.2em]">
          Arcade Protocol x Synthetica 198X
        </div>
      </footer>
    </div>
  );
}
