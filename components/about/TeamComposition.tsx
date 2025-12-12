import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { HeartIcon, UsersIcon, GlobeIcon } from '../ui/Icons';

const TeamComposition: React.FC = () => {
  const { t } = useLanguage();

  const compositionData = [
    { name: t('team_medical_title'), percentage: 70, icon: <HeartIcon className="w-8 h-8 text-white" />, color: 'bg-red-500', description: t('team_medical_desc') },
    { name: t('team_logistics_title'), percentage: 20, icon: <UsersIcon className="w-8 h-8 text-white" />, color: 'bg-blue-500', description: t('team_logistics_desc') },
    { name: t('team_admin_title'), percentage: 10, icon: <GlobeIcon className="w-8 h-8 text-white" />, color: 'bg-gray-500', description: t('team_admin_desc') },
  ];

  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-800 mb-2 text-center">{t('about_nav_team')}</h3>
      <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">{t('team_subtitle')}</p>
      
      <div className="w-full bg-gray-200 rounded-full h-8 flex overflow-hidden mb-8 shadow-inner">
        {compositionData.map((item, index) => (
          <div
            key={index}
            style={{ width: `${item.percentage}%` }}
            className={`${item.color} flex items-center justify-center text-white font-bold text-sm transition-all duration-500 ease-out`}
            title={`${item.name}: ${item.percentage}%`}
          >
            <span className="hidden md:inline">{item.name}</span>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {compositionData.map((item, index) => (
          <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <div className={`w-14 h-14 rounded-full ${item.color} flex items-center justify-center mr-4`}>
                {item.icon}
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900">{item.name}</h4>
                <p className="text-2xl font-bold text-gray-700">{item.percentage}%</p>
              </div>
            </div>
            <p className="text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamComposition;
