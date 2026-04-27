import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, SkipBack, SkipForward, Music, Volume2 } from 'lucide-react';
import { TRACKS, Track } from '../constants';

export const MusicPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    let interval: number;
    if (isPlaying) {
      interval = window.setInterval(() => {
        setProgress(p => (p >= 100 ? 0 : p + 0.5));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  const nextTrack = () => {
    setCurrentTrackIndex((currentTrackIndex + 1) % TRACKS.length);
    setProgress(0);
  };
  const prevTrack = () => {
    setCurrentTrackIndex((currentTrackIndex - 1 + TRACKS.length) % TRACKS.length);
    setProgress(0);
  };

  return (
    <div className="neon-border rounded-2xl bg-black/60 backdrop-blur-md p-6 flex flex-col gap-6 shadow-2xl overflow-hidden relative group">
      <div 
        className="absolute inset-0 opacity-10 blur-3xl pointer-events-none transition-all duration-700" 
        style={{ backgroundColor: currentTrack.color }}
      />
      
      <div className="flex items-center gap-4 relative z-10">
        <motion.div 
          key={currentTrack.id}
          initial={{ rotate: -10, scale: 0.8, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 neon-border shadow-lg"
        >
          <img 
            src={currentTrack.cover} 
            alt={currentTrack.title} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        
        <div className="flex-1 overflow-hidden">
          <h3 className="text-xl font-bold truncate neon-text-blue">{currentTrack.title}</h3>
          <p className="text-white/60 text-sm truncate font-mono uppercase tracking-widest">{currentTrack.artist}</p>
          <div className="flex items-center gap-2 mt-2 text-neon-pink">
            <Music className="w-4 h-4 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-tighter">AI Generated Synth</span>
          </div>
        </div>
      </div>

      <div className="space-y-2 relative z-10">
        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-right"
            style={{ 
              width: `${progress}%`,
              backgroundColor: currentTrack.color,
              boxShadow: `0 0 10px ${currentTrack.color}`
            }}
          />
        </div>
        <div className="flex justify-between text-[10px] font-mono text-white/40 uppercase tracking-tighter">
          <span>03:24</span>
          <span>SYSTEM ENABLED</span>
        </div>
      </div>

      <div className="flex items-center justify-around relative z-10">
        <button onClick={prevTrack} className="p-2 text-white/60 hover:text-white transition-colors hover:scale-110 active:scale-95">
          <SkipBack className="w-6 h-6" />
        </button>
        
        <button 
          onClick={togglePlay}
          className="w-16 h-16 rounded-full flex items-center justify-center bg-white text-black hover:scale-110 active:scale-95 transition-transform neon-glow-blue"
          style={{ backgroundColor: currentTrack.color }}
        >
          {isPlaying ? <Pause className="w-8 h-8 fill-black" /> : <Play className="w-8 h-8 fill-black ml-1" />}
        </button>

        <button onClick={nextTrack} className="p-2 text-white/60 hover:text-white transition-colors hover:scale-110 active:scale-95">
          <SkipForward className="w-6 h-6" />
        </button>
      </div>

      <div className="flex items-center gap-4 px-2 relative z-10">
        <Volume2 className="w-4 h-4 text-white/40" />
        <div className="flex-1 h-0.5 bg-white/5 rounded-full overflow-hidden">
          <div className="h-full bg-white/40 w-2/3" />
        </div>
      </div>

      {/* Visualizer bars */}
      <div className="flex items-end justify-center gap-1 h-8 opacity-20 group-hover:opacity-60 transition-opacity">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            animate={isPlaying ? {
              height: [8, Math.random() * 24 + 4, 8],
            } : { height: 4 }}
            transition={{
              duration: 0.5 + Math.random(),
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-1 rounded-full"
            style={{ backgroundColor: currentTrack.color }}
          />
        ))}
      </div>
    </div>
  );
};
