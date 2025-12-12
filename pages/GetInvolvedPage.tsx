import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import DonationOptions from '../components/involved/DonationOptions';
import VolunteerForm from '../components/involved/VolunteerForm';
import EventsList from '../components/involved/EventsList';
import StorySubmission from '../components/involved/StorySubmission';
import type { Page, DonationType } from '../App';

type InvolvedSection = 'donate' | 'volunteer' | 'events' | 'stories';

interface GetInvolvedPageProps {
  onOpenDonationModal: (type: DonationType) => void;
  onNavigate: (page: Page) => void;
}

const GetInvolvedPage: React.FC<GetInvolvedPageProps> = ({ onOpenDonationModal, onNavigate }) => {
  const [activeSection, setActiveSection] = useState<InvolvedSection>('donate');
  const { t } = useLanguage();

  const renderSection = () => {
    switch (activeSection) {
      case 'donate':
        return <DonationOptions onOpenDonationModal={onOpenDonationModal} onNavigate={onNavigate} />;
      case 'volunteer':
        return <VolunteerForm />;
      case 'events':
        return <EventsList />;
      case 'stories':
        return <StorySubmission />;
      default:
        return <DonationOptions onOpenDonationModal={onOpenDonationModal} onNavigate={onNavigate} />;
    }
  };

  const NavLink: React.FC<{ section: InvolvedSection; label: string }> = ({ section, label }) => (
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
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t('involved_title')}</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          {t('involved_subtitle')}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-4 mb-8 sticky top-[88px] z-40">
        <nav className="flex flex-wrap justify-center gap-2 md:gap-4">
          <NavLink section="donate" label={t('involved_nav_donate')} />
          <NavLink section="volunteer" label={t('involved_nav_volunteer')} />
          <NavLink section="events" label={t('involved_nav_events')} />
          <NavLink section="stories" label={t('involved_nav_stories')} />
        </nav>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 min-h-[500px]">
        {renderSection()}
      </div>
    </div>
  );
};

export default GetInvolvedPage;