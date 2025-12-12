import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { MapPinIcon } from '../ui/Icons';

const GlobalPresenceMap: React.FC = () => {
  const { t } = useLanguage();
  const regions = [
    t('region_africa'),
    t('region_americas'),
    t('region_asia'),
    t('region_europe'),
    t('region_middle_east'),
  ];
  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-800 mb-2 text-center">{t('about_nav_map')}</h3>
      <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">{t('map_subtitle')}</p>
      
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="bg-gray-50 p-6 rounded-lg">
           <h4 className="text-xl font-bold text-gray-900 mb-4">{t('map_active_regions')}</h4>
           <ul>
            {regions.map((region, index) => (
              <li key={index} className="flex items-center space-x-3 mb-3">
                <MapPinIcon className="w-5 h-5 text-red-600" />
                <span className="text-gray-700">{region}</span>
              </li>
            ))}
           </ul>
        </div>
        <div className="flex justify-center items-center p-4">
          <img src="https://picsum.photos/seed/world-map-operations/500/300" alt={t('map_alt_text')} className="rounded-lg shadow-lg w-full h-auto object-cover" loading="lazy" />
        </div>
      </div>
    </div>
  );
};

export default GlobalPresenceMap;