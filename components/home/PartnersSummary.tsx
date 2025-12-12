import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const PartnersSummary: React.FC<{ onNavigate: () => void }> = ({ onNavigate }) => {
    const { t } = useLanguage();
    const partners = ["TechCorp", "Global Pharma", "Logistics Inc.", "Finance Solutions", "Innovate LLC", "Green Energy Co."];

    return (
        <section className="bg-gray-100 py-16 md:py-24">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">{t('partners_summary_title')}</h2>
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60">
                    {partners.map(name => (
                         <div key={name} className="text-gray-600 font-semibold text-xl">{name}</div>
                    ))}
                </div>
                <button onClick={onNavigate} className="mt-12 px-8 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors transform hover:scale-105">
                    {t('partners_summary_cta')}
                </button>
            </div>
        </section>
    );
};

export default PartnersSummary;
