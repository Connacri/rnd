import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export const AudioPlayer: React.FC = () => {
  const { lang, t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Pick audio file according to language
  const audioSrc = lang === 'ar' ? '/assets/audio/ar.mp3' : '/assets/audio/fr.mp3';

  useEffect(() => {
    // When language changes, reset audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setHasError(false);

    const audio = new Audio(audioSrc);
    audioRef.current = audio;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => setIsPlaying(false);
    const onError = () => {
      setHasError(true);
      setIsPlaying(false);
    };

    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onError);
      audio.pause();
    };
  }, [audioSrc]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => {
        console.warn('Playback error:', err);
        setHasError(true);
      });
    }
  };

  return (
    <div className="relative overflow-hidden rounded-full p-[2px] bg-gradient-to-r from-amber-400 via-rose-400 to-sky-400 shadow-lg shadow-rose-950/5 max-w-sm mx-auto">
      <div className="flex items-center gap-3 px-4 py-2.5 bg-[#FAF7F2] dark:bg-[#1C1A17] rounded-full transition-all">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? t('stopAudio') : t('listenSpeech')}
          className={`relative flex items-center justify-center w-11 h-11 rounded-full text-white shadow-md transition-transform active:scale-95 ${
            isPlaying
              ? 'bg-gradient-to-tr from-rose-500 to-amber-500 scale-105 animate-pulse'
              : 'bg-[#18181B] hover:bg-[#27272A]'
          }`}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 fill-current" />
          ) : (
            <Play className="w-5 h-5 fill-current translate-x-0.5" />
          )}
        </button>

        {/* Soundwave Bars */}
        <div className="flex items-center gap-1 h-6 px-1">
          {[12, 22, 14, 26, 18, 10, 20, 16].map((h, i) => (
            <span
              key={i}
              style={{
                height: isPlaying ? `${Math.max(6, (h * (i % 2 === 0 ? 1.2 : 0.8)))}px` : '4px',
                animationDelay: `${i * 0.1}s`,
              }}
              className={`w-1 rounded-full transition-all duration-200 ${
                isPlaying
                  ? 'bg-gradient-to-t from-rose-500 to-amber-500 animate-bounce'
                  : 'bg-zinc-300 dark:bg-zinc-700'
              }`}
            />
          ))}
        </div>

        {/* Status / Label */}
        <div className="flex-1 min-w-0 pr-1">
          <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate">
            {isPlaying ? t('listeningAudio') : t('audioMessage')}
          </p>
          <p className="text-[10px] text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
            {hasError ? (
              <span className="text-rose-500 flex items-center gap-1">
                <VolumeX className="w-3 h-3" /> {lang.toUpperCase()}
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <Volume2 className="w-3 h-3 text-amber-500" />
                {lang === 'ar' ? 'رسالة باللغة العربية' : 'Message officiel (Français)'}
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
