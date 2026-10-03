'use client';

import { useState, useEffect, useRef, type RefObject } from 'react';
import { useScrollSpy } from '@/hooks/use-scroll-spy';
import { LetterAnimation } from '@/components';
import {
  HeroSection,
  CoupleIntroduction,
  WeddingDetailsCard,
  CountdownTimer,
  VenueInformation,
  EventSchedule,
  RSVP,
  GalleryPreview,
  ClosingMessage,
  FloatingNavigation,
  NavigationFAB,
  MusicPlayer,
  ScrollProgressIndicator,
} from '../components';
import { NAVIGATION_SECTIONS, WEDDING_CONFIG } from '@/constants';

export default function HomeView() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLetter, setShowLetter] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  const startMusic = () => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.play().catch(() => undefined);
  };

  // Auto-detect active section using scroll spy
  const activeSection = useScrollSpy(
    NAVIGATION_SECTIONS.map((section) => section.id)
  );

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const handleLetterOpen = () => {
    setShowLetter(false);
    setTimeout(() => setIsLoaded(true), 300);
  };

  return (
    <>
      <audio
        ref={audioRef}
        loop
        preload="auto"
        playsInline
        src={WEDDING_CONFIG.song.src}
        aria-label={WEDDING_CONFIG.song.title}
        className="fixed w-px h-px opacity-0 pointer-events-none"
      >
        <track kind="captions" srcLang="en" label={WEDDING_CONFIG.song.title} />
      </audio>
      {showLetter ? (
        <LetterAnimation
          onOpen={handleLetterOpen}
          onStartMusic={startMusic}
          coupleName={`${WEDDING_CONFIG.bride.name} & ${WEDDING_CONFIG.groom.name}`}
        />
      ) : (
        <Invitation
          isLoaded={isLoaded}
          activeSection={activeSection}
          audioRef={audioRef}
          onScrollToSection={scrollToSection}
        />
      )}
    </>
  );
}

const Invitation = ({
  isLoaded,
  activeSection,
  audioRef,
  onScrollToSection,
}: {
  isLoaded: boolean;
  activeSection: string;
  audioRef: RefObject<HTMLAudioElement | null>;
  onScrollToSection: (sectionId: string) => void;
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      <FloatingNavigation
        activeSection={activeSection}
        onScrollToSection={onScrollToSection}
      />

      {/* Hero Section */}
      <section id="hero" className="relative">
        <HeroSection
          isLoaded={isLoaded}
          couple={WEDDING_CONFIG}
          onScrollToSection={onScrollToSection}
        />
      </section>

      {/* Couple Introduction */}
      <section id="couple" className="relative">
        <CoupleIntroduction
          bride={WEDDING_CONFIG.bride}
          groom={WEDDING_CONFIG.groom}
          isVisible={isLoaded}
        />
      </section>

      {/* Wedding Details */}
      <section id="details" className="relative">
        <WeddingDetailsCard
          date={WEDDING_CONFIG.date}
          weddingDate={WEDDING_CONFIG.weddingDate}
          venue={WEDDING_CONFIG.venue}
          dateConfirmed={WEDDING_CONFIG.dateConfirmed}
        />
        <CountdownTimer
          targetDate={WEDDING_CONFIG.date}
          announced={WEDDING_CONFIG.dateConfirmed}
        />
      </section>

      {/* Venue Information */}
      <section id="venue" className="relative">
        <VenueInformation venue={WEDDING_CONFIG.venue} />
        <EventSchedule />
      </section>

      {/* Gallery Preview */}
      <section id="gallery" className="relative">
        <GalleryPreview />
      </section>

      {/* RSVP Section */}
      <section id="rsvp" className="relative">
        <RSVP />
      </section>

      {/* Closing Message */}
      <section id="closing" className="relative">
        <ClosingMessage
          bride={WEDDING_CONFIG.bride.fullName}
          groom={WEDDING_CONFIG.groom.fullName}
        />
      </section>

      {/* Music Player */}
      <MusicPlayer audioRef={audioRef} />

      {/* Mobile Navigation FAB */}
      <NavigationFAB
        activeSection={activeSection}
        onScrollToSection={onScrollToSection}
      />

      {/* Scroll Progress Indicator */}
      <ScrollProgressIndicator activeSection={activeSection} />
    </div>
  );
}
