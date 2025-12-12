import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import AnnualReports from '../components/transparency/AnnualReports';
import FundingAllocation from '../components/transparency/FundingAllocation';
import AuditCertification from '../components/transparency/AuditCertification';
import DataApi from '../components/transparency/DataApi';
import DonationHistory from '../components/transparency/DonationHistory';

type TransparencySection = 'reports' | 'funding' | 'audits' | 'api' | 'donations';

const TransparencyPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<TransparencySection>('reports');
  const { t } = useLanguage();

  const renderSection = () => {
    switch (activeSection) {
      case 'reports':
        return <AnnualReports />;
      case 'funding':
        return <FundingAllocation />;
      case 'audits':
        return <AuditCertification />;
      case 'api':
        return <DataApi />;
      case 'donations':
        return <DonationHistory />;
      default:
        return <AnnualReports />;
    }
  };

  const NavLink: React.FC<{ section: TransparencySection; label: string }> = ({ section, label }) => (
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
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t('transparency_title')}</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          {t('transparency_subtitle')}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-4 mb-8 sticky top-[88px] z-40">
        <nav className="flex flex-wrap justify-center gap-2 md:gap-4">
          <NavLink section="reports" label={t('transparency_nav_reports')} />
          <NavLink section="funding" label={t('transparency_nav_funding')} />
          <NavLink section="audits" label={t('transparency_nav_audits')} />
          <NavLink section="api" label={t('transparency_nav_api')} />
          <NavLink section="donations" label={t('transparency_nav_donations')} />
        </nav>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 min-h-[500px]">
        {renderSection()}
      </div>
    </div>
  );
};

export default TransparencyPage;