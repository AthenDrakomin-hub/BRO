import React, { useMemo } from 'react';
import type { Project } from '../../types';
import { ProjectCategory } from '../../types';
import ProjectCard from '../ProjectCard';
import { useLanguage } from '../../contexts/LanguageContext';

interface ProjectCategoriesViewProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

const ProjectCategoriesView: React.FC<ProjectCategoriesViewProps> = ({ projects, onSelectProject }) => {
  const { t } = useLanguage();

  const groupedProjects = useMemo(() => {
    return projects.reduce((acc, project) => {
      const category = project.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(project);
      return acc;
    }, {} as Record<ProjectCategory, Project[]>);
  }, [projects]);

  const categoryOrder = [
    ProjectCategory.ConflictZone,
    ProjectCategory.NaturalDisaster,
    ProjectCategory.DiseaseOutbreak,
    ProjectCategory.MalnutritionCrisis,
  ];

  return (
    <div className="space-y-12">
        <p className="text-center text-gray-600 text-lg">{t('pm_select_project')}</p>
      {categoryOrder.map(category => (
        groupedProjects[category] && (
          <div key={category}>
            <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-red-200 pb-2">{category}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {groupedProjects[category].map(project => (
                <ProjectCard key={project.id} project={project} onSelectProject={onSelectProject} />
              ))}
            </div>
          </div>
        )
      ))}
    </div>
  );
};

export default ProjectCategoriesView;
