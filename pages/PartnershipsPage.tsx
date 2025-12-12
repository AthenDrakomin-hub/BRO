import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import CorporateSponsors from '../components/partnerships/CorporateSponsors';
import InstitutionalDonors from '../components/partnerships/InstitutionalDonors';
import AcademicCollaborations from '../components/partnerships/AcademicCollaborations';
import BecomePartnerForm from '../components/partnerships/BecomePartnerForm';

type PartnershipSection = 'sponsors' | 'donors' | 'academic' | 'contact';

const PartnershipsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<PartnershipSection>('sponsors');
  const { t } = useLanguage();

  const renderSection = () => {
    switch (activeSection) {
      case 'sponsors':
        return <CorporateSponsors />;
      case 'donors':
        return <InstitutionalDonors />;
      case 'academic':
        return <AcademicCollaborations />;
      case 'contact':
        return <BecomePartnerForm />;
      default:
        return <CorporateSponsors />;
    }
  };

  const NavLink: React.FC<{ section: PartnershipSection; label: string }> = ({ section, label }) => (
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
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t('partnerships_title')}</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          {t('partnerships_subtitle')}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-4 mb-8 sticky top-[88px] z-40">
        <nav className="flex flex-wrap justify-center gap-2 md:gap-4">
          <NavLink section="sponsors" label={t('partnerships_nav_sponsors')} />
          <NavLink section="donors" label={t('partnerships_nav_donors')} />
          <NavLink section="academic" label={t('partnerships_nav_academic')} />
          <NavLink section="contact" label={t('partnerships_nav_contact')} />
        </nav>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 min-h-[500px]">
        {renderSection()}
      </div>
    </div>
  );
};

export default PartnershipsPage;
