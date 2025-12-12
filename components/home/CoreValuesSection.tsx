import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ShieldIcon, BalanceIcon, IndependenceIcon } from '../ui/Icons';

const CoreValuesSection: React.FC<{ onNavigate: () => void }> = ({ onNavigate }) => {
  const { t } = useLanguage();
  const values = [
    { icon: <ShieldIcon className="w-10 h-10 text-red-600" />, titleKey: 'values_neutrality_title', descriptionKey: 'values_neutrality_desc' },
    { icon: <BalanceIcon className="w-10 h-10 text-red-600" />, titleKey: 'values_impartiality_title', descriptionKey: 'values_impartiality_desc' },
    { icon: <IndependenceIcon className="w-10 h-10 text-red-600" />, titleKey: 'values_independence_title', descriptionKey: 'values_independence_desc' }
  ];

  return (
    <section className="container mx-auto px-4 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">{t('values_home_title')}</h2>
      <div className="grid md:grid-cols-3 gap-10 mb-12">
        {values.map(value => (
          <div key={value.titleKey} className="flex flex-col items-center">
            {value.icon}
            <h3 className="text-xl font-bold mt-4 mb-2">{t(value.titleKey)}</h3>
            <p className="text-gray-600 leading-relaxed">{t(value.descriptionKey)}</p>
          </div>
        ))}
      </div>
      <button onClick={onNavigate} className="px-8 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors transform hover:scale-105">
        {t('values_home_cta')}
      </button>
    </section>
  );
};

export default CoreValuesSection;
