import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio('/muiscalHa.MP3');
    audio.loop = true;
    audio.volume = 0.4;
    // Start muted — browsers always allow muted autoplay
    audio.muted = true;
    audioRef.current = audio;

    audio.play()
      .then(() => {
        // Immediately unmute after play starts — audio is now audible
        audio.muted = false;
        setIsPlaying(true);
      })
      .catch(() => {
        // Absolute fallback: play on first user gesture
        audio.muted = false;
        const onFirstGesture = () => {
          audio.play().then(() => setIsPlaying(true)).catch(() => {});
          window.removeEventListener('click', onFirstGesture);
          window.removeEventListener('keydown', onFirstGesture);
          window.removeEventListener('touchstart', onFirstGesture);
        };
        window.addEventListener('click', onFirstGesture, { once: true });
        window.addEventListener('keydown', onFirstGesture, { once: true });
        window.addEventListener('touchstart', onFirstGesture, { once: true });
      });

    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  return (
    <div className="fixed bottom-7 right-7 z-[9999]">
      {/* Pulse ring while playing */}
      {isPlaying && (
        <motion.div
          className="absolute inset-0 rounded-full bg-primary/30"
          animate={{ scale: [1, 1.9, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      <motion.button
        onClick={handleToggle}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.9 }}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
        className="relative w-9 h-9 rounded-full flex items-center justify-center shadow-xl cursor-pointer border border-white/10"
        style={{
          background: isPlaying
            ? 'linear-gradient(135deg, #e63946 0%, #c1121f 100%)'
            : 'rgba(27,38,59,0.92)',
          backdropFilter: 'blur(12px)',
        }}
      >
        {isPlaying ? (
          <div className="flex items-end gap-[2px] h-[14px]">
            {[0, 1, 2, 3].map((i) => (
              <motion.span
                key={i}
                className="w-[2px] rounded-full bg-white"
                animate={{ height: ['30%', '100%', '55%', '85%', '30%'] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.13, ease: 'easeInOut' }}
                style={{ display: 'block' }}
              />
            ))}
          </div>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
            fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="2.2"
            strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        )}
      </motion.button>
    </div>
  );
}
