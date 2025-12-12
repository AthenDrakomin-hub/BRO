import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { AcademicCapIcon } from '../ui/Icons';

interface Collaboration {
    nameKey: string;
    descriptionKey: string;
}

const collaborations: Collaboration[] = [
    { nameKey: 'academic_hopkins', descriptionKey: 'academic_hopkins_desc' },
    { nameKey: 'academic_lshtm', descriptionKey: 'academic_lshtm_desc' },
    { nameKey: 'academic_harvard', descriptionKey: 'academic_harvard_desc' },
]

const CollaborationCard: React.FC<{ collaboration: Collaboration }> = ({ collaboration }) => {
    const { t } = useLanguage();
    return (
        <div className="bg-gray-50 rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-start space-x-4">
                <AcademicCapIcon className="w-10 h-10 text-red-600 flex-shrink-0 mt-1" />
                <div>
                    <h4 className="text-xl font-bold text-gray-900">{t(collaboration.nameKey)}</h4>
                    <p className="text-gray-600 mt-2">{t(collaboration.descriptionKey)}</p>
                </div>
            </div>
        </div>
    );
}

const AcademicCollaborations: React.FC = () => {
    const { t } = useLanguage();

    return (
        <div>
            <div className="text-center mb-12">
                <h3 className="text-2xl font-bold text-gray-800">{t('academic_title')}</h3>
                <p className="text-gray-600 mt-2 max-w-2xl mx-auto">{t('academic_subtitle')}</p>
            </div>
            <div className="max-w-3xl mx-auto space-y-6">
                {collaborations.map(collab => <CollaborationCard key={collab.nameKey} collaboration={collab} />)}
            </div>
        </div>
    );
};

export default AcademicCollaborations;
