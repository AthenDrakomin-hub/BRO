import React, { useState, useEffect, useRef } from 'react';
import type { Project } from '../types';
import ProgressBar from './ui/ProgressBar';
import { TagIcon } from './ui/Icons';
import { useLanguage } from '../contexts/LanguageContext';

interface ProjectCardProps {
  project: Project;
  onSelectProject: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelectProject }) => {
  const { language, t } = useLanguage();
  const percentage = Math.round((project.raised / project.goal) * 100);
  const projectTranslation = project.translations[language] || project.translations.en;
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Implement lazy loading for images
    if (imgRef.current && imgRef.current.dataset.src) {
      const img = imgRef.current;
      const imageLoader = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const lazyImage = entry.target as HTMLImageElement;
            lazyImage.src = lazyImage.dataset.src!;
            lazyImage.classList.remove('lazy');
            imageLoader.unobserve(lazyImage);
            setIsImageLoaded(true);
          }
        });
      });

      imageLoader.observe(img);

      return () => {
        imageLoader.disconnect();
      };
    }
  }, []);

  const urgencyStyles = {
    High: 'bg-red-600',
    Medium: 'bg-yellow-500',
    Low: 'bg-green-500',
  };

  // Add touch event handlers for mobile devices
  const handleTouchStart = (e: React.TouchEvent) => {
    // Prevent default behavior to avoid scrolling while interacting with cards
    e.preventDefault();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    // Trigger click event on touch end
    onSelectProject(project);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transform hover:-translate-y-2 transition-transform duration-300 ease-in-out cursor-pointer relative" 
      onClick={() => onSelectProject(project)}
      onTouchStart={handleTouchStart} // Add touch start handler
      onTouchEnd={handleTouchEnd} // Add touch end handler
    >
      {project.urgency && (
        <div className={`absolute top-0 right-0 px-3 py-1 text-xs font-bold text-white z-10 rounded-bl-lg ${urgencyStyles[project.urgency]}`}>
          {project.urgency.toUpperCase()}
        </div>
      )}
      {!isImageLoaded && (
        <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
      )}
      <img 
        ref={imgRef}
        data-src={project.imageUrl} 
        className={`w-full h-48 object-cover transition-opacity duration-300 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`} 
        alt={projectTranslation.title} 
        onLoad={() => setIsImageLoaded(true)}
      />
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center space-x-2 mb-2">
            <TagIcon className="w-4 h-4 text-red-600" />
            <p className="text-sm font-semibold text-red-600 uppercase tracking-wide">{project.category}</p>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{projectTranslation.title}</h3>
        <p className="text-gray-600 text-base flex-grow mb-4">{projectTranslation.description}</p>
        <div className="mt-auto">
          <ProgressBar percentage={percentage} />
          <div className="flex justify-between text-sm font-medium text-gray-500 mt-2">
            <span>{t('raised')}: ${project.raised.toLocaleString()}</span>
            <span>{t('goal')}: ${project.goal.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
