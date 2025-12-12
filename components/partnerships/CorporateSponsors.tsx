import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { BuildingOfficeIcon } from '../ui/Icons';

const LogoPlaceholder: React.FC<{ name: string }> = ({ name }) => (
    <div className="h-24 bg-gray-100 border rounded-lg flex items-center justify-center text-gray-500 font-semibold text-sm p-2 text-center">
        {name}
    </div>
);

const TierCard: React.FC<{ title: string; description: string; color: string }> = ({ title, description, color }) => (
    <div className={`border-t-4 ${color} bg-gray-50 p-6 rounded-lg shadow-sm`}>
        <h4 className="text-xl font-bold text-gray-900">{title}</h4>
        <p className="text-gray-600 mt-2">{description}</p>
    </div>
)

const CorporateSponsors: React.FC = () => {
    const { t } = useLanguage();

    const partners = ["TechCorp", "Global Pharma", "Logistics Inc.", "Finance Solutions", "Innovate LLC", "Green Energy Co."];

    return (
        <div>
            <div className="text-center mb-12">
                <h3 className="text-2xl font-bold text-gray-800">{t('sponsors_title')}</h3>
                <p className="text-gray-600 mt-2 max-w-2xl mx-auto">{t('sponsors_subtitle')}</p>
            </div>

            <div className="mb-12">
                <h4 className="text-xl font-semibold text-gray-700 text-center mb-6">{t('sponsors_logo_wall_title')}</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {partners.map(name => <LogoPlaceholder key={name} name={name} />)}
                </div>
            </div>

             <div>
                <h4 className="text-xl font-semibold text-gray-700 text-center mb-6">{t('sponsors_tiers_title')}</h4>
                <div className="grid md:grid-cols-3 gap-8">
                    <TierCard title={t('sponsors_tier_platinum_title')} description={t('sponsors_tier_platinum_desc')} color="border-gray-800" />
                    <TierCard title={t('sponsors_tier_gold_title')} description={t('sponsors_tier_gold_desc')} color="border-yellow-500" />
                    <TierCard title={t('sponsors_tier_silver_title')} description={t('sponsors_tier_silver_desc')} color="border-gray-400" />
                </div>
            </div>
        </div>
    );
};

export default CorporateSponsors;
