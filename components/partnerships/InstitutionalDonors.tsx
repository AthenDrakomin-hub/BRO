import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { BuildingOfficeIcon } from '../ui/Icons';

const donors = [
    'donor_gates',
    'donor_global_fund',
    'donor_echo',
    'donor_usaid',
    'donor_wellcome',
];

const DonorCard: React.FC<{ nameKey: string }> = ({ nameKey }) => {
    const { t } = useLanguage();
    return (
        <div className="bg-gray-50 p-4 rounded-lg flex items-center space-x-4 border border-gray-200">
            <BuildingOfficeIcon className="w-8 h-8 text-gray-400 flex-shrink-0" />
            <p className="font-semibold text-gray-700">{t(nameKey)}</p>
        </div>
    );
}

const InstitutionalDonors: React.FC = () => {
    const { t } = useLanguage();

    return (
        <div>
            <div className="text-center mb-12">
                <h3 className="text-2xl font-bold text-gray-800">{t('donors_title')}</h3>
                <p className="text-gray-600 mt-2 max-w-2xl mx-auto">{t('donors_subtitle')}</p>
            </div>
            <div className="max-w-2xl mx-auto space-y-4">
                {donors.map(donorKey => <DonorCard key={donorKey} nameKey={donorKey} />)}
            </div>
        </div>
    );
};

export default InstitutionalDonors;
