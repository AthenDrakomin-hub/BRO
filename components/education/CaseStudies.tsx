import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { NewspaperIcon } from '../ui/Icons';

interface CaseStudy {
    titleKey: string;
    descriptionKey: string;
}

const studies: CaseStudy[] = [
    { titleKey: 'case1_title', descriptionKey: 'case1_desc' },
    { titleKey: 'case2_title', descriptionKey: 'case2_desc' },
];

const CaseStudyCard: React.FC<{ study: CaseStudy }> = ({ study }) => {
    const { t } = useLanguage();
    return (
        <div className="bg-gray-50 rounded-lg shadow-sm p-6 border border-gray-200">
            <h4 className="text-xl font-bold text-gray-900 mb-2">{t(study.titleKey)}</h4>
            <p className="text-gray-600 mb-4">{t(study.descriptionKey)}</p>
            <button className="font-bold text-red-600 hover:text-red-800 transition-colors">
                {t('read_analysis_button')} &rarr;
            </button>
        </div>
    );
};

const CaseStudies: React.FC = () => {
    const { t } = useLanguage();
    return (
        <div>
            <div className="text-center mb-8">
                <NewspaperIcon className="w-12 h-12 text-red-600 mx-auto mb-2" />
                <h3 className="text-2xl font-bold text-gray-800">{t('cases_title')}</h3>
                <p className="text-gray-600 mt-2 max-w-2xl mx-auto">{t('cases_subtitle')}</p>
            </div>
            <div className="space-y-8 max-w-4xl mx-auto">
                {studies.map((study, index) => (
                    <CaseStudyCard key={index} study={study} />
                ))}
            </div>
        </div>
    );
};

export default CaseStudies;