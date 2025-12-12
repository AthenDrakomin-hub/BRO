import React from 'react';
import type { Project } from '../../types';
import ProjectCard from '../ProjectCard';
import { useLanguage } from '../../contexts/LanguageContext';

interface LatestProjectsSectionProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onNavigate: () => void;
}

const LatestProjectsSection: React.FC<LatestProjectsSectionProps> = ({ projects, onSelectProject, onNavigate }) => {
  const { t } = useLanguage();
  return (
    <section className="bg-gray-100 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t('latest_projects_title')}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} onSelectProject={onSelectProject} />
          ))}
        </div>
        <div className="text-center mt-12">
          <button onClick={onNavigate} className="px-8 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors transform hover:scale-105">
            {t('latest_projects_cta')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default LatestProjectsSection;
