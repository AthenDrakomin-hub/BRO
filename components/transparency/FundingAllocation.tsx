import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { HeartIcon, GlobeIcon, TagIcon } from '../ui/Icons';

const FundingAllocation: React.FC = () => {
  const { t } = useLanguage();

  const fundingData = [
    { name: t('funding_programs'), percentage: 88, color: 'bg-red-500', description: t('funding_programs_desc'), icon: <HeartIcon className="w-6 h-6 text-red-500" /> },
    { name: t('funding_admin'), percentage: 7, color: 'bg-blue-500', description: t('funding_admin_desc'), icon: <GlobeIcon className="w-6 h-6 text-blue-500" /> },
    { name: t('funding_fundraising'), percentage: 5, color: 'bg-gray-500', description: t('funding_fundraising_desc'), icon: <TagIcon className="w-6 h-6 text-gray-500" /> },
  ];

  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-800 mb-2 text-center">{t('funding_title')}</h3>
      <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">{t('funding_subtitle')}</p>
      
      <div className="w-full bg-gray-200 rounded-full h-10 flex overflow-hidden mb-4 shadow-inner">
        {fundingData.map((item, index) => (
          <div
            key={index}
            style={{ width: `${item.percentage}%` }}
            className={`${item.color} flex items-center justify-center text-white font-bold text-lg transition-all duration-500 ease-out`}
            title={`${item.name}: ${item.percentage}%`}
          >
            {item.percentage}%
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {fundingData.map((item, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg flex items-start space-x-4 border">
             <div className="flex-shrink-0 pt-1">
                {item.icon}
             </div>
            <div>
              <h4 className="font-bold text-gray-900">{item.name} - <span className={`${item.color.replace('bg-', 'text-')}`}>{item.percentage}%</span></h4>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FundingAllocation;
