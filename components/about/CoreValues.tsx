import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ShieldIcon, BalanceIcon, IndependenceIcon } from '../ui/Icons';

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ValueCard: React.FC<ValueCardProps> = ({ icon, title, description }) => (
  <div className="bg-gray-50 p-6 rounded-lg text-center transform hover:scale-105 transition-transform duration-300 shadow-sm">
    <div className="flex justify-center mb-4">
      {icon}
    </div>
    <h4 className="text-xl font-bold text-gray-900 mb-2">{title}</h4>
    <p className="text-gray-600">{description}</p>
  </div>
);

const CoreValues: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">{t('about_nav_values')}</h3>
      <div className="grid md:grid-cols-3 gap-8">
        <ValueCard
          icon={<ShieldIcon className="w-12 h-12 text-red-600" />}
          title={t('values_neutrality_title')}
          description={t('values_neutrality_desc')}
        />
        <ValueCard
          icon={<BalanceIcon className="w-12 h-12 text-red-600" />}
          title={t('values_impartiality_title')}
          description={t('values_impartiality_desc')}
        />
        <ValueCard
          icon={<IndependenceIcon className="w-12 h-12 text-red-600" />}
          title={t('values_independence_title')}
          description={t('values_independence_desc')}
        />
      </div>
    </div>
  );
};

export default CoreValues;
