'use client';

import type { WeddingConfigType } from '@/types';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';

interface CoupleIntroductionProps {
  bride: WeddingConfigType['bride'];
  groom: WeddingConfigType['groom'];
  isVisible: boolean;
}

export const CoupleIntroduction = ({
  bride,
  groom,
}: CoupleIntroductionProps) => {
  const { t } = useTranslation('home');

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <div
      ref={ref}
      className="h-full px-4 py-3 bg-gradient-to-b from-white to-rose-50/30 flex items-center"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-4"
        >
          <h2 className="text-2xl sm:text-3xl font-serif text-gray-800 mb-2">
            {t('couple.our-story')}
          </h2>
          <div className="w-24 h-px bg-rose-400 mx-auto"></div>
          <p className="text-xs sm:text-sm text-gray-600 mt-2 max-w-2xl mx-auto">
            {t('couple.story-text')}
          </p>
        </motion.div>

        {/* Couple Cards */}
        <div className="relative grid grid-cols-2 gap-3 sm:gap-8 items-start">
          {/* Bride Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-right"
          >
            <div className="relative inline-block mb-6">
              <div
                role="img"
                aria-label={`${bride.fullName}'s photo`}
                className="relative w-24 h-24 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full shadow-xl border-4 border-white"
                style={{
                  backgroundImage: `url(${bride.photo})`,
                  backgroundSize: '240%',
                  backgroundPosition: bride.objectPosition,
                  backgroundRepeat: 'no-repeat',
                }}
              />
              <div className="absolute -bottom-4 -right-4 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-rose-400 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-xl sm:text-2xl">👸</span>
              </div>
            </div>

            <h3 className="text-lg sm:text-2xl font-serif text-gray-800 mb-1">
              {bride.fullName}
            </h3>
            <p className="text-xs sm:text-base text-rose-600 mb-1 font-medium">
              {t('couple.the-bride')}
            </p>
            <p className="text-[11px] sm:text-sm text-gray-600 leading-snug max-w-md mx-auto lg:mx-0 lg:ml-auto">
              {t('couple.bride-description')}
            </p>

            {/* Decorative Elements */}
            <div className="mt-6 flex justify-center lg:justify-end space-x-2">
              <div className="w-2 h-2 bg-rose-300 rounded-full"></div>
              <div className="w-2 h-2 bg-rose-400 rounded-full"></div>
              <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
            </div>
          </motion.div>

          {/* Heart Divider (Desktop) */}
          <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: inView ? 1 : 0, rotate: inView ? 0 : -180 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl border-4 border-rose-100"
            >
              <span className="text-xl sm:text-2xl md:text-3xl animate-pulse">
                💖
              </span>
            </motion.div>
          </div>

          {/* Heart Divider (Mobile) */}
          <div className="hidden">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: inView ? 1 : 0, rotate: inView ? 0 : -180 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl border-4 border-rose-100"
            >
              <span className="text-lg sm:text-xl md:text-2xl animate-pulse">
                💖
              </span>
            </motion.div>
          </div>

          {/* Groom Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center lg:text-left"
          >
            <div className="relative inline-block mb-6">
              <div
                role="img"
                aria-label={`${groom.fullName}'s photo`}
                className="relative w-24 h-24 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-full shadow-xl border-4 border-white"
                style={{
                  backgroundImage: `url(${groom.photo})`,
                  backgroundSize: '240%',
                  backgroundPosition: groom.objectPosition,
                  backgroundRepeat: 'no-repeat',
                }}
              />
              <div className="absolute -bottom-4 -left-4 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-blue-400 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-xl sm:text-2xl">🤴</span>
              </div>
            </div>

            <h3 className="text-lg sm:text-2xl font-serif text-gray-800 mb-1">
              {groom.fullName}
            </h3>
            <p className="text-xs sm:text-base text-blue-600 mb-1 font-medium">
              {t('couple.the-groom')}
            </p>
            <p className="text-[11px] sm:text-sm text-gray-600 leading-snug max-w-md mx-auto lg:mx-0">
              {t('couple.groom-description')}
            </p>

            {/* Decorative Elements */}
            <div className="mt-6 flex justify-center lg:justify-start space-x-2">
              <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            </div>
          </motion.div>
        </div>

        {/* Love Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-4"
        >
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-3 sm:p-4 max-w-2xl mx-auto shadow-lg border border-white/40">
            <p className="text-sm sm:text-lg font-serif text-gray-700 italic mb-1">
              {t('couple.love-quote')}
            </p>
            <p className="text-gray-500 text-xs sm:text-sm">
              — {t('couple.quote-by')}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
