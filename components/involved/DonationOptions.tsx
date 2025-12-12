import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { GiftIcon, CalendarIcon, ClipboardListIcon, PatreonIcon } from '../ui/Icons';
import type { Page, DonationType } from '../../App';

interface DonationOptionsProps {
  onOpenDonationModal: (type: DonationType) => void;
  onNavigate: (page: Page) => void;
}

const DonationOptions: React.FC<DonationOptionsProps> = ({ onOpenDonationModal, onNavigate }) => {
  const { t } = useLanguage();

  const options = [
    {
      icon: <GiftIcon className="w-12 h-12 text-red-600" />,
      titleKey: 'donate_one_time_title',
      descriptionKey: 'donate_one_time_desc',
      action: () => onOpenDonationModal('one-time'),
      buttonLabel: 'donate_button_cta',
    },
    {
      icon: <CalendarIcon className="w-12 h-12 text-red-600" />,
      titleKey: 'donate_monthly_title',
      descriptionKey: 'donate_monthly_desc',
      action: () => onOpenDonationModal('monthly'),
      buttonLabel: 'donate_button_cta',
    },
    {
      icon: <ClipboardListIcon className="w-12 h-12 text-red-600" />,
      titleKey: 'donate_project_title',
      descriptionKey: 'donate_project_desc',
      action: () => onNavigate('our_work'),
      buttonLabel: 'donate_button_cta',
    },
    {
      icon: <PatreonIcon className="w-12 h-12 text-[#FF424D]" />,
      titleKey: 'patreon_title',
      descriptionKey: 'patreon_desc',
      action: () => window.open('https://patreon.com/borderlessrelief', '_blank'),
      buttonLabel: 'patreon_button',
    },
  ];

  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">{t('donate_options_title')}</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {options.map((option, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg border flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300 shadow-sm">
                <div className="flex justify-center mb-4">
                    {option.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{t(option.titleKey)}</h4>
                <p className="text-gray-600 flex-grow mb-6">{t(option.descriptionKey)}</p>
                <button 
                    onClick={option.action}
                    className="mt-auto bg-red-600 text-white font-bold py-2 px-6 rounded-md hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
                    {t(option.buttonLabel)}
                </button>
            </div>
        ))}
      </div>
    </div>
  );
};

export default DonationOptions;