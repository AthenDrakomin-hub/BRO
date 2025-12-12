import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { DocumentTextIcon, DownloadIcon } from '../ui/Icons';

interface Report {
    titleKey: string;
    descriptionKey: string;
}

const reportsData: Report[] = [
    { titleKey: 'report_2023_title', descriptionKey: 'report_2023_desc' },
    { titleKey: 'report_2022_title', descriptionKey: 'report_2022_desc' },
];

const ReportCard: React.FC<{ report: Report }> = ({ report }) => {
    const { t } = useLanguage();
    return (
        <div className="bg-gray-50 rounded-lg shadow-sm p-6 flex flex-col sm:flex-row gap-6 border border-gray-200 items-start sm:items-center">
            <div className="flex-shrink-0 text-red-600">
                <DocumentTextIcon className="w-12 h-12" />
            </div>
            <div className="flex-grow">
                <h4 className="text-xl font-bold text-gray-900">{t(report.titleKey)}</h4>
                <p className="text-gray-600 mt-1">{t(report.descriptionKey)}</p>
            </div>
            <div className="flex-shrink-0 mt-4 sm:mt-0">
                 <button className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-red-600 text-white font-bold py-2 px-4 rounded-md hover:bg-red-700 transition-colors">
                    <DownloadIcon className="w-5 h-5" />
                    <span>{t('download_button')}</span>
                </button>
            </div>
        </div>
    );
};

const AnnualReports: React.FC = () => {
    const { t } = useLanguage();
    return (
        <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2 text-center">{t('reports_title')}</h3>
            <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">{t('reports_subtitle')}</p>
            <div className="space-y-6">
                {reportsData.map((report, index) => (
                    <ReportCard key={index} report={report} />
                ))}
            </div>
        </div>
    );
};

export default AnnualReports;
