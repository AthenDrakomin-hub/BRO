import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { GiftIcon, UserGroupIcon } from '../ui/Icons';

const GetInvolvedSummary: React.FC<{ onNavigate: () => void }> = ({ onNavigate }) => {
  const { t } = useLanguage();

  return (
    <section className="container mx-auto px-4 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('involved_summary_title')}</h2>
      <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12">{t('involved_summary_desc')}</p>
      <div className="flex justify-center flex-wrap gap-8 md:gap-16">
        <div className="flex flex-col items-center">
            <GiftIcon className="w-12 h-12 text-red-600 mb-4"/>
            <button onClick={onNavigate} className="px-8 py-3 text-lg font-bold text-red-600 border-2 border-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-colors transform hover:scale-105">
                {t('involved_summary_cta_donate')}
            </button>
        </div>
        <div className="flex flex-col items-center">
            <UserGroupIcon className="w-12 h-12 text-red-600 mb-4"/>
            <button onClick={onNavigate} className="px-8 py-3 text-lg font-bold text-red-600 border-2 border-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-colors transform hover:scale-105">
                {t('involved_summary_cta_volunteer')}
            </button>
        </div>
      </div>
    </section>
  );
};

export default GetInvolvedSummary;
