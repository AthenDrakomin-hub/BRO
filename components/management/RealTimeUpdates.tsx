import React from 'react';
import type { Project, ProjectUpdate } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { NewspaperIcon } from '../ui/Icons';

interface RealTimeUpdatesProps {
  project: Project;
}

const UpdateItem: React.FC<{ update: ProjectUpdate }> = ({ update }) => {
    const { language } = useLanguage();
    const updateTranslation = update.translations[language] || update.translations.en;
    
    return (
        <div className="ml-8 mb-8 relative">
            <div className="absolute -left-10 mt-1 w-6 h-6 bg-red-500 rounded-full border-4 border-white"></div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500 font-medium mb-1">{new Date(update.date).toLocaleDateString()}</p>
                <h4 className="font-bold text-gray-800 text-lg mb-2">{updateTranslation.title}</h4>
                {update.imageUrl && <img src={update.imageUrl} alt={updateTranslation.title} className="rounded-md my-2 w-full h-auto max-w-sm object-cover" loading="lazy" />}
                <p className="text-gray-600">{updateTranslation.content}</p>
            </div>
        </div>
    );
};

const RealTimeUpdates: React.FC<RealTimeUpdatesProps> = ({ project }) => {
  const { t } = useLanguage();
  const sortedUpdates = [...(project.updates || [])].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (!sortedUpdates.length) {
    return (
      <div className="text-center py-12">
        <NewspaperIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-700">{t('pm_updates_title')}</h3>
        <p className="text-gray-500 mt-2">{t('pm_no_updates')}</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">{t('pm_updates_title')}</h3>
      <div className="relative border-l-2 border-gray-200">
        {sortedUpdates.map(update => (
            <UpdateItem key={update.id} update={update} />
        ))}
      </div>
    </div>
  );
};

export default RealTimeUpdates;