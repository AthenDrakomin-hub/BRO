import React from 'react';
import DonationForm from './DonationForm';
import { useLanguage } from '../contexts/LanguageContext';
import { XIcon } from './ui/Icons';
import type { DonationType } from '../App';

interface DonationModalProps {
  onClose: () => void;
  initialDonationType?: DonationType;
}

const DonationModal: React.FC<DonationModalProps> = ({ onClose, initialDonationType }) => {
  const { t } = useLanguage();

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-[60] flex justify-center items-center p-4 transition-opacity duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-white rounded-lg shadow-2xl max-w-lg w-full transform transition-all duration-300 scale-95 animate-modal-enter"
        onClick={e => e.stopPropagation()}
        // Add a simple keyframe animation for entry
        style={{ animation: 'modal-enter 0.2s ease-out forwards' }}
      >
        <div className="relative">
          <DonationForm initialDonationType={initialDonationType} />
          <button
            onClick={onClose}
            className="absolute -top-3 -right-3 bg-white rounded-full p-1.5 shadow-lg text-gray-500 hover:text-gray-800 hover:rotate-90 transition-transform duration-300"
            aria-label={t('close_button')}
          >
            <XIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
      <style>{`
        @keyframes modal-enter {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default DonationModal;