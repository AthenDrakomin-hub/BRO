import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import ProgressBar from '../ui/ProgressBar';

const EmergencyAppeal: React.FC<{ onDonateClick: () => void }> = ({ onDonateClick }) => {
  const { t } = useLanguage();
  
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 30); // Set target 30 days from now

  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        setTimeLeft(`${days} ${t('emergency_days_left')}`);
      } else {
        setTimeLeft('Campaign ended');
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [t]);

  const goal = 1000000;
  const raised = 750000;
  const percentage = Math.round((raised / goal) * 100);

  return (
    <section className="bg-red-50 border-y-2 border-red-100 py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-red-800 mb-2">{t('emergency_title')}</h2>
        <p className="text-lg text-gray-700 mb-4 max-w-3xl mx-auto">{t('emergency_subtitle')}</p>
        {timeLeft && <p className="text-2xl font-bold text-red-600 mb-8">{timeLeft}</p>}
        
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-end text-lg font-medium text-gray-700 mb-2">
            <span className="font-bold text-red-600">${raised.toLocaleString()}</span>
            <span className="text-sm">{t('raised_of')} ${goal.toLocaleString()} {t('goal')}</span>
          </div>
          <ProgressBar percentage={percentage} height="h-4" />
        </div>
        
        <button onClick={onDonateClick} className="mt-10 px-10 py-4 bg-red-600 text-white text-xl font-bold rounded-lg hover:bg-red-700 transition-colors transform hover:scale-105 shadow-lg">
          {t('emergency_cta')}
        </button>
      </div>
    </section>
  );
};

export default EmergencyAppeal;
