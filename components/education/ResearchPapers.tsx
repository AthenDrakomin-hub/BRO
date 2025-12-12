import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { DocumentTextIcon } from '../ui/Icons';

interface Paper {
    titleKey: string;
    descriptionKey: string;
}

const papers: Paper[] = [
    { titleKey: 'paper1_title', descriptionKey: 'paper1_desc' },
    { titleKey: 'paper2_title', descriptionKey: 'paper2_desc' },
];

const PaperItem: React.FC<{ paper: Paper }> = ({ paper }) => {
    const { t } = useLanguage();
    return (
        <div className="flex items-start space-x-4 p-4 rounded-md hover:bg-gray-50 transition-colors">
            <div className="flex-shrink-0 text-gray-400 mt-1">
                <DocumentTextIcon className="w-6 h-6" />
            </div>
            <div>
                <h4 className="font-bold text-gray-800">{t(paper.titleKey)}</h4>
                <p className="text-sm text-gray-500">{t(paper.descriptionKey)}</p>
                <a href="#" className="text-sm font-semibold text-blue-600 hover:underline mt-1 inline-block">
                    {t('view_publication_button')}
                </a>
            </div>
        </div>
    );
};

const ResearchPapers: React.FC = () => {
    const { t } = useLanguage();
    return (
        <div>
            <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800">{t('papers_title')}</h3>
                <p className="text-gray-600 mt-2 max-w-2xl mx-auto">{t('papers_subtitle')}</p>
            </div>
            <div className="space-y-4 max-w-4xl mx-auto border-t border-b divide-y">
                {papers.map((paper, index) => (
                    <PaperItem key={index} paper={paper} />
                ))}
            </div>
        </div>
    );
};

export default ResearchPapers;
