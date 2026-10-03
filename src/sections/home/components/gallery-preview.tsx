'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { WEDDING_CONFIG } from '@/constants';

export const GalleryPreview = () => {
  const { t } = useTranslation('home');
  const images = WEDDING_CONFIG.gallery;
  const [active, setActive] = useState<number | null>(null);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  useEffect(() => {
    if (active === null) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActive(null);

      if (event.key === 'ArrowRight') {
        setActive((current) =>
          current === null ? 0 : (current + 1) % images.length
        );
      }

      if (event.key === 'ArrowLeft') {
        setActive((current) =>
          current === null ? 0 : (current - 1 + images.length) % images.length
        );
      }
    };

    window.addEventListener('keydown', onKey);

    return () => window.removeEventListener('keydown', onKey);
  }, [active, images.length]);

  return (
    <div
      ref={ref}
      className="py-20 px-4 bg-gradient-to-br from-gray-50 to-rose-50"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-gray-800 mb-4">
            {t('gallery.journey-title')}
          </h2>
          <div className="w-24 h-px bg-rose-400 mx-auto mb-6" />
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            {t('gallery.journey-subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
          {images.map((image, index) => (
            <motion.button
              key={image.src}
              type="button"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.92 }}
              transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.4) }}
              onClick={() => setActive(index)}
              className="group relative aspect-[3/4] bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer text-left"
            >
              <img
                src={image.src}
                alt={image.caption}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
              <p className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white text-xs sm:text-sm font-medium">
                {image.caption}
              </p>
            </motion.button>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <button
            type="button"
            onClick={() => setActive(0)}
            className="bg-white text-gray-700 px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-rose-300 text-sm sm:text-base cursor-pointer"
          >
            {t('gallery.view-full')} 📸
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="fixed inset-0 z-[80] bg-black/90 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <button
              type="button"
              className="absolute top-4 right-4 text-white text-3xl cursor-pointer"
              onClick={() => setActive(null)}
              aria-label="Close gallery"
            >
              ×
            </button>
            <button
              type="button"
              className="absolute left-3 sm:left-6 text-white text-4xl cursor-pointer"
              onClick={(event) => {
                event.stopPropagation();
                setActive((active - 1 + images.length) % images.length);
              }}
              aria-label="Previous photo"
            >
              ‹
            </button>
            <motion.img
              key={images[active].src}
              src={images[active].src}
              alt={images[active].caption}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="max-h-[82vh] max-w-[88vw] object-contain rounded-lg shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            />
            <button
              type="button"
              className="absolute right-3 sm:right-6 text-white text-4xl cursor-pointer"
              onClick={(event) => {
                event.stopPropagation();
                setActive((active + 1) % images.length);
              }}
              aria-label="Next photo"
            >
              ›
            </button>
            <p className="absolute bottom-6 text-white text-sm sm:text-base text-center px-16">
              {images[active].caption}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
