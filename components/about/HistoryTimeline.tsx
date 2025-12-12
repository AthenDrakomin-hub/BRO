import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

interface TimelineEvent {
  year: string;
  titleKey: string;
  descriptionKey: string;
}

const events: TimelineEvent[] = [
  { year: '1971', titleKey: 'history_1971_title', descriptionKey: 'history_1971_desc' },
  { year: '1979', titleKey: 'history_1979_title', descriptionKey: 'history_1979_desc' },
  { year: '1985', titleKey: 'history_1985_title', descriptionKey: 'history_1985_desc' },
  { year: '1999', titleKey: 'history_1999_title', descriptionKey: 'history_1999_desc' },
  { year: '2014', titleKey: 'history_2014_title', descriptionKey: 'history_2014_desc' },
  { year: '2020s', titleKey: 'history_2020s_title', descriptionKey: 'history_2020s_desc' },
  { year: '2024', titleKey: 'history_2024_hk_title', descriptionKey: 'history_2024_hk_desc' },
];

const HistoryTimeline: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">{t('about_nav_history')}</h3>
      <div className="relative border-l-4 border-red-200 ml-4 md:ml-0">
        {events.map((event, index) => (
          <div key={index} className="mb-12 ml-8">
            <div className="absolute -left-4 mt-2 w-8 h-8 bg-red-600 rounded-full border-4 border-white flex items-center justify-center text-white font-bold">
              {index + 1}
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <time className="text-lg font-semibold text-red-700">{event.year}</time>
              <h4 className="text-xl font-bold text-gray-900 mt-1 mb-2">{t(event.titleKey)}</h4>
              <p className="text-gray-600">{t(event.descriptionKey)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryTimeline;