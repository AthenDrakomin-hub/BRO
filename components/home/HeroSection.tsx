import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

interface HeroSectionProps {
  onDonateClick: () => void;
  onNavigate: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onDonateClick, onNavigate }) => {
  const { t } = useLanguage();
  return (
    <section className="relative h-[60vh] min-h-[450px] flex items-center justify-center text-center text-white bg-cover bg-center" style={{ backgroundImage: 'url(https://picsum.photos/seed/humanitarian-aid-worker/1200/800)' }}>
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative container mx-auto px-4 z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight drop-shadow-lg">{t('hero_title')}</h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 drop-shadow-md">{t('hero_subtitle')}</p>
        <div className="flex justify-center items-center flex-wrap gap-4">
          <button onClick={onDonateClick} className="px-8 py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-transform transform hover:scale-105 text-lg shadow-lg">
            {t('hero_cta_donate')}
          </button>
          <button onClick={onNavigate} className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-gray-800 transition-all text-lg shadow-lg">
            {t('hero_cta_volunteer')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;