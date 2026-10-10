'use client';

import { useEffect, useRef, useState, type FormEvent, type RefObject } from 'react';
import { useTranslation } from 'react-i18next';
import { WEDDING_CONFIG } from '@/constants';
import { generateMapLink } from '@/lib/wedding-utils';

const PETALS = [
  { left: '6%', delay: '0s', duration: '13s', size: 12 },
  { left: '18%', delay: '2s', duration: '15s', size: 9 },
  { left: '34%', delay: '5s', duration: '12s', size: 14 },
  { left: '52%', delay: '1s', duration: '16s', size: 8 },
  { left: '68%', delay: '4s', duration: '14s', size: 13 },
  { left: '82%', delay: '7s', duration: '12s', size: 10 },
  { left: '92%', delay: '3s', duration: '17s', size: 11 },
];

const inputClass =
  'w-full rounded-xl border border-[#e2d0b4] bg-white/80 px-3 py-2.5 text-base text-[#3d2b22] outline-none focus:border-[#b8894a]';

function youtubeEmbed(url: string) {
  if (!url) return '';

  try {
    const parsed = new URL(url);

    const fromPath = parsed.hostname.includes('youtu.be')
      ? parsed.pathname.replace('/', '')
      : parsed.searchParams.get('v') || '';

    return fromPath ? `https://www.youtube.com/embed/${fromPath}` : '';
  } catch {
    return '';
  }
}

export function IllustratedInvite({
  audioRef,
}: {
  audioRef: RefObject<HTMLAudioElement | null>;
}) {
  const { t } = useTranslation('home');
  const galleryRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [shift, setShift] = useState(0);

  const [form, setForm] = useState({
    name: '',
    attendance: '',
    extraGuests: '',
    arrivalDate: '',
    arrivalTime: '',
    departureDate: '',
    departureTime: '',
  });

  const couple = `${WEDDING_CONFIG.bride.name} & ${WEDDING_CONFIG.groom.name}`;
  const film = youtubeEmbed(WEDDING_CONFIG.film);
  const ceremonyMap = generateMapLink(WEDDING_CONFIG.venue.ceremony.mapQuery);
  const stayMap = generateMapLink(WEDDING_CONFIG.venue.reception.mapQuery);

  const haldiShades = [
    { name: t('invite.shade-yellow'), color: '#F4D35E' },
    { name: t('invite.shade-mustard'), color: '#C69214' },
    { name: t('invite.shade-orange'), color: '#C45C26' },
    { name: t('invite.shade-turmeric'), color: '#E0A106' },
    { name: t('invite.shade-saffron'), color: '#E08A2F' },
  ];

  const events = [
    {
      title: t('invite.haldi'),
      date: t('invite.date-18'),
      when: t('invite.late-afternoon'),
      image: WEDDING_CONFIG.art.haldi,
      shades: haldiShades,
      dress: '',
      lines: [] as string[],
    },
    {
      title: t('invite.sangeet'),
      date: t('invite.date-18'),
      when: t('invite.evening'),
      image: WEDDING_CONFIG.art.sangeet,
      shades: [],
      dress: t('invite.sangeet-dress'),
      lines: [] as string[],
    },
    {
      title: t('invite.vidhi'),
      date: t('invite.date-19'),
      when: t('invite.morning'),
      image: WEDDING_CONFIG.art.vidhi,
      shades: [],
      dress: t('invite.vidhi-dress'),
      lines: [] as string[],
    },
    {
      title: t('invite.mangal'),
      date: t('invite.date-19'),
      when: t('invite.afternoon'),
      image: WEDDING_CONFIG.art.mangal,
      shades: [],
      dress: '',
      lines: [
        t('invite.mangal-look'),
        t('invite.mangal-ladies'),
        t('invite.mangal-gentlemen'),
        t('invite.mangal-aunties'),
      ],
    },
  ];

  useEffect(() => {
    let frame = 0;

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setShift(window.scrollY);
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const sceneShift = Math.min(shift, 900) * 0.34;
  const paperShift = Math.min(shift * 0.14, 110);

  const beginMusic = () => {
    const audio = audioRef.current;

    if (!audio || started.current) return;

    started.current = true;
    audio.play().then(() => setPlaying(true)).catch(() => {
      started.current = false;
    });
  };

  const toggleMusic = () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (audio.paused) {
      audio.play().then(() => setPlaying(true)).catch(() => undefined);
      started.current = true;
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  const slideGallery = (direction: number) => {
    const scroller = galleryRef.current;

    if (!scroller) return;

    scroller.scrollBy({
      left: direction * scroller.clientWidth * 0.82,
      behavior: 'smooth',
    });
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');

    const url = process.env.NEXT_PUBLIC_RSVP_URL;

    if (!url) {
      setError(t('invite.sheet-waiting'));

      return;
    }

    setSending(true);

    try {
      await fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          ...form,
          submittedAt: new Date().toISOString(),
        }),
      });
      setSent(true);
    } catch {
      setError(t('invite.send-failed'));
    } finally {
      setSending(false);
    }
  };

  return (
    <div
      className="min-h-dvh bg-[#f4eadc] bg-cover bg-center"
      style={{ backgroundImage: `url(${WEDDING_CONFIG.art.paper})` }}
      onPointerDown={(event) => {
        const target = event.target as HTMLElement;

        if (target.closest('[data-music]')) return;

        beginMusic();
      }}
    >
      <div className="mx-auto min-h-dvh w-full max-w-[480px] bg-[#f7f0e6] shadow-[0_0_40px_rgba(90,50,20,0.12)]">
        <section className="relative h-[150dvh]">
          <div className="sticky top-0 flex h-dvh flex-col overflow-hidden px-6 pb-10 pt-8 text-center">
          <div
            className="absolute inset-0 will-change-transform"
            style={{ transform: `translate3d(0, ${sceneShift}px, 0)` }}
          >
            <img
              src={WEDDING_CONFIG.art.cover}
              alt=""
              className="absolute top-[-22%] left-1/2 h-[150%] w-[124%] max-w-none -translate-x-1/2 object-cover"
            />
            {PETALS.map((petal) => (
              <span
                key={petal.left}
                className="invite-petal"
                style={{
                  left: petal.left,
                  width: petal.size,
                  height: petal.size * 1.45,
                  animationDuration: petal.duration,
                  animationDelay: petal.delay,
                }}
              />
            ))}
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#f7f0e6]" />
          <div className="relative z-10 mt-10">
            <h1 className="font-script text-7xl leading-none text-[#6b2d3c] [text-shadow:0_2px_16px_rgba(255,255,255,0.9)]">
              {WEDDING_CONFIG.bride.name}
            </h1>
            <p className="font-script mt-1 text-4xl text-[#8a4a3a] [text-shadow:0_2px_12px_rgba(255,255,255,0.85)]">
              {t('invite.weds')}
            </p>
            <h1 className="font-script text-7xl leading-none text-[#6b2d3c] [text-shadow:0_2px_16px_rgba(255,255,255,0.9)]">
              {WEDDING_CONFIG.groom.name}
            </h1>
          </div>
          <p
            className="relative z-10 mt-auto pt-16 text-xs uppercase tracking-[0.28em] text-white [text-shadow:0_1px_6px_rgba(60,20,10,0.6)]"
            style={{ opacity: Math.max(0, 1 - shift / 180) }}
          >
            {t('invite.scroll')}
          </p>
          </div>
        </section>

        <div className="relative z-10 -mt-[22vh] overflow-hidden">
          <img
            src={WEDDING_CONFIG.art.paper}
            alt=""
            className="pointer-events-none absolute top-0 left-0 h-[130%] w-full object-cover will-change-transform"
            style={{ transform: `translate3d(0, ${paperShift}px, 0)` }}
          />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-transparent to-[#f7f0e6]" />
          <div className="relative">
        <section className="px-8 pt-28 pb-14 text-center">
          <p className="font-serif text-base tracking-wide text-[#3d2b22]">
            {t('invite.invocation')}
          </p>
          <img
            src={WEDDING_CONFIG.art.ganpati}
            alt={t('invite.ganpati')}
            className="mx-auto mt-4 h-56 w-auto object-contain"
          />
          <p className="mt-8 font-serif text-xl italic text-[#3d2b22]">
            {t('invite.invite-lead')}
          </p>
          <p className="mt-4 font-serif text-lg leading-relaxed whitespace-pre-line text-[#3d2b22]">
            {t('invite.parents-todmal')}
          </p>
          <span className="mx-auto mt-3 block w-8 border-t border-[#3d2b22]" />
          <p className="mt-3 font-serif text-lg leading-relaxed whitespace-pre-line text-[#3d2b22]">
            {t('invite.parents-thaluri')}
          </p>
          <p className="mt-6 font-serif text-lg italic leading-snug text-[#3d2b22]">
            {t('invite.invite-you')}
          </p>
          <p className="font-script mt-2 text-5xl text-[#6b2d3c]">{couple}</p>
          <div className="mt-8 rounded-3xl border border-[#eadcc4] bg-white/75 px-6 py-8 text-left shadow-sm">
            <p className="font-serif text-2xl italic text-[#6b2d3c]">
              {t('invite.letter-dear')}
            </p>
            <p className="mt-4 font-serif text-lg leading-relaxed text-[#4d3b32]">
              {t('invite.letter-body')}
            </p>
            <p className="mt-6 font-serif text-lg italic text-[#6b2d3c]">
              {t('invite.letter-sign')}
            </p>
            <p className="font-script mt-1 text-4xl text-[#8a4a3a]">{couple}</p>
          </div>
        </section>

        <section className="px-6 pb-14">
          <h2 className="text-center font-serif text-3xl text-[#3d2b22]">
            {t('invite.events-title')}
          </h2>
          <div className="mt-8 space-y-8">
            {events.map((item) => (
              <article
                key={item.title}
                className="overflow-hidden rounded-3xl border border-[#eadcc4] bg-white/80 shadow-sm"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-64 w-full object-cover"
                />
                <div className="px-5 py-5 text-center">
                  <h3 className="font-script text-5xl text-[#6b2d3c]">
                    {item.title}
                  </h3>
                  <p className="mt-2 font-serif text-lg text-[#4d3b32]">
                    {item.date}
                  </p>
                  <p className="mt-1 text-sm uppercase tracking-[0.18em] text-[#a68456]">
                    {item.when}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[#5c463c]">
                    {WEDDING_CONFIG.venue.ceremony.name}
                  </p>
                  <div className="mt-5">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-[#a68456]">
                      {t('invite.dress')}
                    </p>
                    {item.shades.length > 0 ? (
                      <div className="mt-3 grid grid-cols-5 gap-2">
                        {item.shades.map((shade) => (
                          <div key={shade.name}>
                            <div
                              className="h-12 rounded-xl border border-[#eadcc4]"
                              style={{ backgroundColor: shade.color }}
                            />
                            <p className="mt-1 text-center text-[10px] leading-tight text-[#5c463c]">
                              {shade.name}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : item.lines.length > 0 ? (
                      <div className="mt-2 space-y-0.5">
                        <p className="font-serif text-sm text-[#6b2d3c]">
                          {item.lines[0]}
                        </p>
                        {item.lines.slice(1).map((line) => (
                          <p
                            key={line}
                            className="font-serif text-sm leading-snug text-[#4d3b32]"
                          >
                            {line}
                          </p>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-2 text-center font-serif text-sm leading-relaxed text-[#4d3b32]">
                        {item.dress}
                      </p>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-8 space-y-8">
            <div className="rounded-3xl border border-[#eadcc4] bg-white/70 px-5 py-6 text-center">
              <h3 className="font-serif text-2xl text-[#6b2d3c]">
                {t('invite.venue-title')}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#5c463c]">
                {t('invite.venue-text')}
              </p>
              <p className="mt-2 text-sm text-[#5c463c]">
                {WEDDING_CONFIG.venue.ceremony.name}
                <br />
                {WEDDING_CONFIG.venue.ceremony.address}
              </p>
              <a
                href={ceremonyMap}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm tracking-wide text-[#8a4a3a] underline decoration-[#e2c48a] underline-offset-4"
              >
                {t('invite.route')}
              </a>
            </div>
            <div className="rounded-3xl border border-[#eadcc4] bg-white/70 px-5 py-6 text-center">
              <h3 className="font-serif text-2xl text-[#6b2d3c]">
                {t('invite.stay-title')}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#5c463c]">
                {t('invite.stay-text')}
              </p>
              <p className="mt-2 text-sm text-[#5c463c]">
                {WEDDING_CONFIG.venue.reception.name}
                <br />
                {WEDDING_CONFIG.venue.reception.address}
              </p>
              <a
                href={stayMap}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm tracking-wide text-[#8a4a3a] underline decoration-[#e2c48a] underline-offset-4"
              >
                {t('invite.route')}
              </a>
            </div>
          </div>
        </section>

        <section className="px-6 pb-14">
          <p className="text-center text-[11px] uppercase tracking-[0.28em] text-[#a68456]">
            {t('invite.rsvp-kicker')}
          </p>
          <h2 className="mt-2 text-center font-serif text-4xl text-[#3d2b22]">
            {t('invite.rsvp-title')}
          </h2>
          {sent ? (
            <p className="mt-8 text-center font-serif text-xl italic text-[#6b2d3c]">
              {t('invite.thanks')}
            </p>
          ) : (
            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <label className="block text-sm text-[#5c463c]">
                {t('invite.name')}
                <input
                  required
                  name="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={`${inputClass} mt-1`}
                />
              </label>
              <label className="block text-sm text-[#5c463c]">
                {t('invite.attending')}
                <select
                  required
                  name="attendance"
                  value={form.attendance}
                  onChange={(e) =>
                    setForm({ ...form, attendance: e.target.value })
                  }
                  className={`${inputClass} mt-1`}
                >
                  <option value="">{t('invite.choose')}</option>
                  <option value="yes">{t('invite.yes')}</option>
                  <option value="no">{t('invite.no')}</option>
                </select>
              </label>
              <label className="block text-sm text-[#5c463c]">
                {t('invite.extra')}
                <input
                  type="number"
                  min={0}
                  name="extraGuests"
                  value={form.extraGuests}
                  onChange={(e) =>
                    setForm({ ...form, extraGuests: e.target.value })
                  }
                  className={`${inputClass} mt-1`}
                />
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="block text-sm text-[#5c463c]">
                  {t('invite.arrival-date')}
                  <input
                    type="date"
                    name="arrivalDate"
                    value={form.arrivalDate}
                    onChange={(e) =>
                      setForm({ ...form, arrivalDate: e.target.value })
                    }
                    className={`${inputClass} mt-1`}
                  />
                </label>
                <label className="block text-sm text-[#5c463c]">
                  {t('invite.arrival-time')}
                  <input
                    type="time"
                    name="arrivalTime"
                    value={form.arrivalTime}
                    onChange={(e) =>
                      setForm({ ...form, arrivalTime: e.target.value })
                    }
                    className={`${inputClass} mt-1`}
                  />
                </label>
                <label className="block text-sm text-[#5c463c]">
                  {t('invite.departure-date')}
                  <input
                    type="date"
                    name="departureDate"
                    value={form.departureDate}
                    onChange={(e) =>
                      setForm({ ...form, departureDate: e.target.value })
                    }
                    className={`${inputClass} mt-1`}
                  />
                </label>
                <label className="block text-sm text-[#5c463c]">
                  {t('invite.departure-time')}
                  <input
                    type="time"
                    name="departureTime"
                    value={form.departureTime}
                    onChange={(e) =>
                      setForm({ ...form, departureTime: e.target.value })
                    }
                    className={`${inputClass} mt-1`}
                  />
                </label>
              </div>
              {error ? (
                <p className="text-sm text-[#8a3030]">{error}</p>
              ) : null}
              <button
                type="submit"
                disabled={sending}
                className="w-full rounded-full bg-[#8a4a3a] py-3 text-sm tracking-[0.14em] text-white uppercase disabled:opacity-60"
              >
                {sending ? t('invite.sending') : t('invite.send')}
              </button>
              <p className="font-serif text-base leading-relaxed text-[#5c463c]">
                {t('invite.rsvp-note')}
              </p>
            </form>
          )}
        </section>

        <section className="px-6 pb-14">
          <div className="rounded-3xl border border-[#eadcc4] bg-[#fffaf3] px-6 py-8 text-center">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#a68456]">
              {t('invite.gifts-kicker')}
            </p>
            <h2 className="mt-2 font-serif text-4xl text-[#6b2d3c]">
              {t('invite.gifts-title')}
            </h2>
            <p className="mt-3 font-serif text-lg leading-relaxed text-[#4d3b32]">
              {t('invite.gifts-text')}
            </p>
          </div>
        </section>

        <section className="pb-14">
          <p className="px-6 text-center text-[11px] uppercase tracking-[0.28em] text-[#a68456]">
            {t('invite.gallery-kicker')}
          </p>
          <h2 className="mt-2 px-6 text-center font-serif text-4xl text-[#3d2b22]">
            {t('invite.gallery-title')}
          </h2>
          <div className="mt-6 flex items-center justify-start gap-3 px-6">
            <button
              type="button"
              aria-label={t('invite.previous')}
              onClick={() => slideGallery(-1)}
              className="h-10 w-10 rounded-full border border-[#e2c48a] text-lg text-[#8a4a3a]"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label={t('invite.next')}
              onClick={() => slideGallery(1)}
              className="h-10 w-10 rounded-full border border-[#e2c48a] text-lg text-[#8a4a3a]"
            >
              ›
            </button>
          </div>
          <div
            ref={galleryRef}
            className="mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2"
          >
            {WEDDING_CONFIG.gallery.map((photo) => (
              <figure key={photo.src} className="w-[78%] shrink-0 snap-center">
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="h-80 w-full rounded-2xl object-cover object-[center_22%]"
                />
                <figcaption className="mt-2 text-center font-serif text-sm text-[#5c463c]">
                  {photo.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="px-6 pb-8">
          <p className="text-center text-[11px] uppercase tracking-[0.28em] text-[#a68456]">
            {t('invite.film-kicker')}
          </p>
          <h2 className="mt-2 text-center font-serif text-4xl text-[#3d2b22]">
            {t('invite.film-title')}
          </h2>
          {film ? (
            <iframe
              title={t('invite.film-title')}
              src={film}
              className="mt-6 aspect-video w-full rounded-3xl"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="mt-6 flex aspect-video items-center justify-center rounded-3xl border border-dashed border-[#c6a56a] bg-white/50 px-6 text-center">
              <p className="font-serif text-lg italic text-[#8a4a3a]">
                {t('invite.film-soon')}
              </p>
            </div>
          )}
        </section>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={toggleMusic}
        data-music=""
        aria-label={t('invite.music')}
        className="fixed right-4 bottom-4 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-[#d4527a] text-lg text-white shadow-lg"
      >
        {playing ? '❚❚' : '♪'}
      </button>
    </div>
  );
}
