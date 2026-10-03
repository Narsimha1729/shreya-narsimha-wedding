'use client';

import {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  type ReactNode,
  type RefObject,
} from 'react';
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

      <section
        id="hero"
        className="h-dvh snap-start snap-always overflow-hidden"
      >
        <HeroSection
          isLoaded={isLoaded}
          couple={WEDDING_CONFIG}
          onScrollToSection={onScrollToSection}
        />
      </section>

      <Screen id="couple">
        <CoupleIntroduction
          bride={WEDDING_CONFIG.bride}
          groom={WEDDING_CONFIG.groom}
          isVisible={isLoaded}
        />
      </Screen>

      <Screen id="details">
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
      </Screen>

      <Screen id="venue">
        <VenueInformation venue={WEDDING_CONFIG.venue} />
        <EventSchedule />
      </Screen>

      <Screen id="gallery">
        <GalleryPreview />
      </Screen>

      <Screen id="rsvp">
        <RSVP />
      </Screen>

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
};

const Screen = ({ id, children }: { id: string; children: ReactNode }) => {
  const frame = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const fit = () => {
      const frameEl = frame.current;
      const contentEl = content.current;

      if (!frameEl || !contentEl) return;

      contentEl.style.transform = 'none';
      const available = frameEl.clientHeight;
      const needed = contentEl.offsetHeight;
      const next = needed > available && needed > 0 ? available / needed : 1;

      contentEl.style.transform = `scale(${next})`;
    };

    fit();

    const observer = new ResizeObserver(fit);

    if (frame.current) observer.observe(frame.current);
    if (content.current) observer.observe(content.current);
    window.addEventListener('resize', fit);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', fit);
    };
  }, []);

  return (
    <section
      id={id}
      className="h-dvh snap-start snap-always overflow-hidden pt-14 sm:pt-16"
    >
      <div
        ref={frame}
        className="h-full overflow-hidden flex items-center justify-center"
      >
        <div ref={content} className="one-screen w-full origin-center">
          {children}
        </div>
      </div>
    </section>
  );
};
