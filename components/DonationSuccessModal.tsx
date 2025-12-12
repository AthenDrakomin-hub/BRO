import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { CheckCircleIcon } from './ui/Icons';

interface DonationSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  projectTitle: string;
}

const DonationSuccessModal: React.FC<DonationSuccessModalProps> = ({ isOpen, onClose, amount, projectTitle }) => {
  const { t } = useLanguage();
    
  if (!isOpen) return null;

  const isGeneralDonation = projectTitle === t('general_donation_title');

  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
        onClick={onClose}
        aria-modal="true"
        role="dialog"
    >
      <div 
        className="bg-white rounded-lg shadow-2xl p-8 m-4 max-w-md w-full text-center transform transition-all duration-300 ease-out scale-95 hover:scale-100"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-center mb-4">
            <CheckCircleIcon className="w-16 h-16 text-green-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('donation_success_title')}</h2>
        <p className="text-gray-600 mb-6">
          {t('donation_success_message_part1')}{' '}
          <span className="font-bold text-gray-800">${amount.toLocaleString()}</span>
          {!isGeneralDonation && (
            <>
              {' '}{t('donation_success_message_part2')}{' '}
              <span className="font-bold text-gray-800">"{projectTitle}"</span>
            </>
          )}
          {' '}{t('donation_success_message_part3')}
        </p>
        <button
          onClick={onClose}
          className="w-full bg-red-600 text-white font-bold py-3 px-6 rounded-md text-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          {t('close_button')}
        </button>
      </div>
    </div>
  );
};

export default DonationSuccessModal;