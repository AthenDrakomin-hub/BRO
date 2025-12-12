import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import HistoryTimeline from '../components/about/HistoryTimeline';
import CoreValues from '../components/about/CoreValues';
import TeamComposition from '../components/about/TeamComposition';
import GlobalPresenceMap from '../components/about/GlobalPresenceMap';

type AboutSection = 'history' | 'values' | 'team' | 'map';

const AboutUsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AboutSection>('history');
  const { t } = useLanguage();

  const renderSection = () => {
    switch (activeSection) {
      case 'history':
        return <HistoryTimeline />;
      case 'values':
        return <CoreValues />;
      case 'team':
        return <TeamComposition />;
      case 'map':
        return <GlobalPresenceMap />;
      default:
        return <HistoryTimeline />;
    }
  };

  const NavLink: React.FC<{ section: AboutSection; label: string }> = ({ section, label }) => (
    <button
      onClick={() => setActiveSection(section)}
      className={`px-4 py-2 text-sm md:text-base font-semibold rounded-md transition-all duration-200 ${
        activeSection === section
          ? 'bg-red-600 text-white shadow-md'
          : 'text-gray-600 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t('about_title')}</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          {t('about_subtitle')}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-4 mb-8 sticky top-[88px] z-40">
        <nav className="flex flex-wrap justify-center gap-2 md:gap-4">
          <NavLink section="history" label={t('about_nav_history')} />
          <NavLink section="values" label={t('about_nav_values')} />
          <NavLink section="team" label={t('about_nav_team')} />
          <NavLink section="map" label={t('about_nav_map')} />
        </nav>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 min-h-[500px]">
        {renderSection()}
      </div>
    </div>
  );
};

export default AboutUsPage;
