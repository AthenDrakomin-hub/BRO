import React from 'react';
import type { Project } from '../types';
import ProjectCard from './ProjectCard';
import { useLanguage } from '../contexts/LanguageContext';

interface ProjectListProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, onSelectProject }) => {
  const { t } = useLanguage();
  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t('project_list_title')}</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
          {t('project_list_subtitle')}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} onSelectProject={onSelectProject} />
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
