'use client';

import { useRef } from 'react';
import { WEDDING_CONFIG } from '@/constants';
import { IllustratedInvite } from '../components/illustrated-invite';

export default function HomeView() {
  const audioRef = useRef<HTMLAudioElement>(null);

  return (
    <>
      <audio
        ref={audioRef}
        loop
        preload="auto"
        playsInline
        src={WEDDING_CONFIG.song.src}
        aria-label={WEDDING_CONFIG.song.title}
        className="fixed h-px w-px opacity-0 pointer-events-none"
      >
        <track kind="captions" srcLang="en" label={WEDDING_CONFIG.song.title} />
      </audio>
      <IllustratedInvite audioRef={audioRef} />
    </>
  );
}
