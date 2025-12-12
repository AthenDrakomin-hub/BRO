import React, { useState } from 'react';
import type { Project } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { useProjects } from '../hooks/useProjects';
import ProjectCategoriesView from '../components/management/ProjectCategoriesView';
import RealTimeUpdates from '../components/management/RealTimeUpdates';
import NeedsList from '../components/management/NeedsList';
import ProgressBar from '../components/ui/ProgressBar';
import { BackArrowIcon, LoaderIcon } from '../components/ui/Icons';

type ManagementTab = 'updates' | 'needs';

const ProjectManagementPage: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<ManagementTab>('updates');
  const { t, language } = useLanguage();
  const { projects, loading } = useProjects();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoaderIcon className="w-12 h-12 animate-spin text-red-600" />
      </div>
    );
  }

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    window.scrollTo(0, 0);
  };

  const handleBackToOverview = () => {
    setSelectedProject(null);
  };

  if (!selectedProject) {
    return (
      <div>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t('pm_title')}</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            {t('pm_subtitle')}
          </p>
        </div>
        <ProjectCategoriesView projects={projects} onSelectProject={handleSelectProject} />
      </div>
    );
  }

  const projectTranslation = selectedProject.translations[language] || selectedProject.translations.en;
  const percentage = Math.round((selectedProject.raised / selectedProject.goal) * 100);

  const TabButton: React.FC<{ tab: ManagementTab; label: string }> = ({ tab, label }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex-1 py-3 px-4 text-lg font-bold text-center border-b-4 transition-colors ${
        activeTab === tab
          ? 'text-red-600 border-red-600'
          : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="max-w-5xl mx-auto">
      <button
        onClick={handleBackToOverview}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 font-medium mb-6 transition-colors"
      >
        <BackArrowIcon className="w-5 h-5" />
        <span>{t('pm_back_to_overview')}</span>
      </button>

      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-6 md:p-8 bg-gray-50 border-b">
          <p className="text-sm font-semibold text-red-600 uppercase tracking-wide mb-2">{selectedProject.category}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{projectTranslation.title}</h2>
          <div className="mt-4">
             <div className="flex justify-between items-end text-lg font-medium text-gray-700 mb-2">
              <span className="font-bold text-red-600">${selectedProject.raised.toLocaleString()}</span>
              <span className="text-sm">{t('raised_of')} ${selectedProject.goal.toLocaleString()} {t('goal')}</span>
            </div>
            <ProgressBar percentage={percentage} height="h-3" />
          </div>
        </div>

        <div className="flex">
          <TabButton tab="updates" label={t('pm_nav_updates')} />
          <TabButton tab="needs" label={t('pm_nav_needs')} />
        </div>
        
        <div className="p-6 md:p-8">
            {activeTab === 'updates' && <RealTimeUpdates project={selectedProject} />}
            {activeTab === 'needs' && <NeedsList project={selectedProject} />}
        </div>
      </div>
    </div>
  );
};

export default ProjectManagementPage;
