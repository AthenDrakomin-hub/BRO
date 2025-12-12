import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import KnowledgeBase from '../components/education/KnowledgeBase';
import TrainingCourses from '../components/education/TrainingCourses';
import CaseStudies from '../components/education/CaseStudies';
import ResearchPapers from '../components/education/ResearchPapers';

type EducationSection = 'knowledge' | 'training' | 'cases' | 'papers';

const EducationPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<EducationSection>('knowledge');
  const { t } = useLanguage();

  const renderSection = () => {
    switch (activeSection) {
      case 'knowledge':
        return <KnowledgeBase />;
      case 'training':
        return <TrainingCourses />;
      case 'cases':
        return <CaseStudies />;
      case 'papers':
        return <ResearchPapers />;
      default:
        return <KnowledgeBase />;
    }
  };

  const NavLink: React.FC<{ section: EducationSection; label: string }> = ({ section, label }) => (
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
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t('education_title')}</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          {t('education_subtitle')}
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-4 mb-8 sticky top-[88px] z-40">
        <nav className="flex flex-wrap justify-center gap-2 md:gap-4">
          <NavLink section="knowledge" label={t('education_nav_knowledge')} />
          <NavLink section="training" label={t('education_nav_training')} />
          <NavLink section="cases" label={t('education_nav_cases')} />
          <NavLink section="papers" label={t('education_nav_papers')} />
        </nav>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 min-h-[500px]">
        {renderSection()}
      </div>
    </div>
  );
};

export default EducationPage;