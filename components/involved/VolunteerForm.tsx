import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { LoaderIcon, CheckCircleIcon, UserCircleIcon, EnvelopeIcon } from '../ui/Icons';

const VolunteerForm: React.FC = () => {
  const { t } = useLanguage();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    interest: t('volunteer_interest_medical'),
    motivation: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    console.log("Submitting Volunteer Application:", formData);
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  if (status === 'success') {
    return (
      <div className="text-center p-8 bg-green-50 rounded-lg border-2 border-green-200">
        <CheckCircleIcon className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{t('volunteer_form_title')}</h3>
        <p className="text-gray-600 max-w-md mx-auto">{t('volunteer_success_message')}</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold text-gray-800 mb-2 text-center">{t('volunteer_form_title')}</h3>
      <p className="text-center text-gray-600 mb-8">{t('volunteer_form_subtitle')}</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">{t('volunteer_fullname_label')}</label>
          <div className="mt-1 relative rounded-md shadow-sm">
             <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <UserCircleIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input 
                type="text" 
                name="fullname" 
                id="fullname" 
                required 
                value={formData.fullname}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 pl-10 focus:border-red-500 focus:ring-red-500 sm:text-sm" 
                placeholder="John Doe" 
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">{t('volunteer_email_label')}</label>
           <div className="mt-1 relative rounded-md shadow-sm">
             <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <EnvelopeIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input 
                type="email" 
                name="email" 
                id="email" 
                required 
                value={formData.email}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 pl-10 focus:border-red-500 focus:ring-red-500 sm:text-sm" 
                placeholder="you@example.com" 
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="interest" className="block text-sm font-medium text-gray-700">{t('volunteer_interest_label')}</label>
          <select 
            id="interest" 
            name="interest" 
            required 
            value={formData.interest}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
          >
            <option>{t('volunteer_interest_medical')}</option>
            <option>{t('volunteer_interest_logistics')}</option>
            <option>{t('volunteer_interest_translation')}</option>
            <option>{t('volunteer_interest_fundraising')}</option>
          </select>
        </div>

        <div>
          <label htmlFor="motivation" className="block text-sm font-medium text-gray-700">{t('volunteer_motivation_label')}</label>
          <div className="mt-1">
            <textarea 
                id="motivation" 
                name="motivation" 
                rows={4} 
                required 
                value={formData.motivation}
                onChange={handleChange}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm" 
                placeholder={t('volunteer_motivation_placeholder')}
            ></textarea>
          </div>
        </div>

        <div>
          <button type="submit" disabled={status === 'submitting'} className="flex w-full justify-center items-center rounded-md border border-transparent bg-red-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:bg-red-400 disabled:cursor-wait">
            {status === 'submitting' && <LoaderIcon className="w-5 h-5 mr-2 animate-spin" />}
            {t('volunteer_submit_button')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VolunteerForm;