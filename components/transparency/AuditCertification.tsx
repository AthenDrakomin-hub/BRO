import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { BadgeCheckIcon } from '../ui/Icons';

const AuditCertification: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-800 mb-2 text-center">{t('audits_title')}</h3>
      <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">{t('audits_subtitle')}</p>

      <div className="max-w-xl mx-auto">
        <div className="bg-gray-50 rounded-lg shadow-sm p-6 flex flex-col sm:flex-row gap-6 border border-gray-200 items-start sm:items-center">
          <div className="flex-shrink-0 text-green-600">
            <BadgeCheckIcon className="w-16 h-16" />
          </div>
          <div className="flex-grow">
            <h4 className="text-xl font-bold text-gray-900">{t('audit_2023_title')}</h4>
            <p className="text-gray-500 mt-1">{t('audit_2023_certifier')}</p>
          </div>
          <div className="flex-shrink-0 mt-4 sm:mt-0">
            <button className="w-full sm:w-auto flex items-center justify-center bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
              {t('view_certificate_button')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditCertification;
