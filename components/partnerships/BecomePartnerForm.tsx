import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { LoaderIcon, CheckCircleIcon, BuildingOfficeIcon, UserCircleIcon, EnvelopeIcon } from '../ui/Icons';

const BecomePartnerForm: React.FC = () => {
  const { t } = useLanguage();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  if (status === 'success') {
    return (
      <div className="text-center p-8 bg-green-50 rounded-lg border-2 border-green-200">
        <CheckCircleIcon className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{t('partner_form_title')}</h3>
        <p className="text-gray-600 max-w-md mx-auto">{t('partner_success_message')}</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold text-gray-800 mb-2 text-center">{t('partner_form_title')}</h3>
      <p className="text-center text-gray-600 mb-8">{t('partner_form_subtitle')}</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="org-name" className="block text-sm font-medium text-gray-700">{t('partner_org_name_label')}</label>
            <div className="mt-1 relative rounded-md shadow-sm">
               <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <BuildingOfficeIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input type="text" name="org-name" id="org-name" required className="block w-full rounded-md border-gray-300 pl-10 focus:border-red-500 focus:ring-red-500 sm:text-sm" />
            </div>
          </div>
          <div>
            <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700">{t('partner_contact_name_label')}</label>
            <div className="mt-1 relative rounded-md shadow-sm">
               <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <UserCircleIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input type="text" name="contact-name" id="contact-name" required className="block w-full rounded-md border-gray-300 pl-10 focus:border-red-500 focus:ring-red-500 sm:text-sm" />
            </div>
          </div>
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">{t('partner_email_label')}</label>
           <div className="mt-1 relative rounded-md shadow-sm">
             <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <EnvelopeIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input type="email" name="email" id="email" required className="block w-full rounded-md border-gray-300 pl-10 focus:border-red-500 focus:ring-red-500 sm:text-sm" placeholder="you@example.com" />
          </div>
        </div>
        
        <div>
          <label htmlFor="partner-type" className="block text-sm font-medium text-gray-700">{t('partner_type_label')}</label>
          <select id="partner-type" name="partner-type" required className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm">
            <option>{t('partner_type_corporate')}</option>
            <option>{t('partner_type_foundation')}</option>
            <option>{t('partner_type_academic')}</option>
            <option>{t('partner_type_other')}</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">{t('partner_message_label')}</label>
          <div className="mt-1">
            <textarea id="message" name="message" rows={4} required className="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm" placeholder={t('partner_message_placeholder')}></textarea>
          </div>
        </div>

        <div>
          <button type="submit" disabled={status === 'submitting'} className="flex w-full justify-center items-center rounded-md border border-transparent bg-red-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:bg-red-400 disabled:cursor-wait">
            {status === 'submitting' && <LoaderIcon className="w-5 h-5 mr-2 animate-spin" />}
            {t('partner_submit_button')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BecomePartnerForm;
