import React from 'react';
import type { Project, NeededItem } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { ClipboardListIcon, ExclamationCircleIcon } from '../ui/Icons';
import ProgressBar from '../ui/ProgressBar';

interface NeedsListProps {
    project: Project;
}

const priorityStyles = {
    High: {
        iconColor: 'text-red-500',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200'
    },
    Medium: {
        iconColor: 'text-yellow-500',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200'
    },
    Low: {
        iconColor: 'text-green-500',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200'
    }
};

const NeedsList: React.FC<NeedsListProps> = ({ project }) => {
    const { t, language } = useLanguage();

    const sortedNeeds = [...(project.needs || [])].sort((a, b) => {
        const priorityOrder = { High: 3, Medium: 2, Low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
    });

    if (!sortedNeeds.length) {
        return (
            <div className="text-center py-12">
                <ClipboardListIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-700">{t('pm_needs_title')}</h3>
                <p className="text-gray-500 mt-2">{t('pm_no_needs')}</p>
            </div>
        );
    }
    
    return (
        <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">{t('pm_needs_title')}</h3>
            <div className="space-y-4">
                {sortedNeeds.map(item => {
                    const itemTranslation = item.translations[language] || item.translations.en;
                    const percentage = Math.round((item.quantityFulfilled / item.quantityNeeded) * 100);
                    const styles = priorityStyles[item.priority];
                    
                    return (
                        <div key={item.id} className={`p-4 rounded-lg border ${styles.borderColor} ${styles.bgColor}`}>
                           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center mb-1">
                                         <ExclamationCircleIcon className={`w-5 h-5 mr-2 flex-shrink-0 ${styles.iconColor}`} />
                                         <p className="text-sm font-semibold text-gray-500">{item.category} / <span className={styles.iconColor}>{t(`pm_${item.priority.toLowerCase()}_priority`)}</span></p>
                                    </div>
                                    <h4 className="text-lg font-bold text-gray-800 truncate">{itemTranslation.name}</h4>
                                </div>
                                <div className="flex-shrink-0 mt-3 sm:mt-0 sm:ml-6">
                                    <p className="text-sm text-right text-gray-600 font-medium">
                                        {item.quantityFulfilled.toLocaleString()} / {item.quantityNeeded.toLocaleString()} {t('pm_fulfilled')}
                                    </p>
                                </div>
                           </div>
                           <div className="mt-2">
                               <ProgressBar percentage={percentage} height="h-2" />
                           </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default NeedsList;
