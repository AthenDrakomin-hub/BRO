import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { LightBulbIcon, BookOpenIcon } from '../ui/Icons';

interface Guide {
    titleKey: string;
    descriptionKey: string;
}

const guides: Guide[] = [
    { titleKey: 'knowledge1_title', descriptionKey: 'knowledge1_desc' },
    { titleKey: 'knowledge2_title', descriptionKey: 'knowledge2_desc' },
    { titleKey: 'knowledge3_title', descriptionKey: 'knowledge3_desc' },
    { titleKey: 'knowledge4_title', descriptionKey: 'knowledge4_desc' },
];

const GuideCard: React.FC<{ guide: Guide }> = ({ guide }) => {
    const { t } = useLanguage();
    return (
        <div className="bg-gray-50 rounded-lg shadow-sm p-6 flex flex-col border border-gray-200 transform hover:-translate-y-1 transition-transform duration-300">
            <div className="flex-shrink-0 text-red-600 mb-4">
                <BookOpenIcon className="w-10 h-10" />
            </div>
            <div className="flex-grow">
                <h4 className="text-xl font-bold text-gray-900">{t(guide.titleKey)}</h4>
                <p className="text-gray-600 mt-2 flex-grow">{t(guide.descriptionKey)}</p>
            </div>
            <div className="mt-6">
                 <button className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-white text-red-600 font-bold py-2 px-4 rounded-md border-2 border-red-600 hover:bg-red-50 transition-colors">
                    <span>{t('read_more_button')}</span>
                </button>
            </div>
        </div>
    );
};

const KnowledgeBase: React.FC = () => {
    const { t } = useLanguage();
    return (
        <div>
            <div className="text-center mb-8">
                <LightBulbIcon className="w-12 h-12 text-yellow-500 mx-auto mb-2" />
                <h3 className="text-2xl font-bold text-gray-800">{t('knowledge_title')}</h3>
                <p className="text-gray-600 mt-2 max-w-2xl mx-auto">{t('knowledge_subtitle')}</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {guides.map((guide, index) => (
                    <GuideCard key={index} guide={guide} />
                ))}
            </div>
        </div>
    );
};

export default KnowledgeBase;