import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { LoaderIcon, CheckCircleIcon, UploadIcon } from '../ui/Icons';

const StorySubmission: React.FC = () => {
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
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{t('stories_title')}</h3>
        <p className="text-gray-600 max-w-md mx-auto">{t('stories_success_message')}</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold text-gray-800 mb-2 text-center">{t('stories_title')}</h3>
      <p className="text-center text-gray-600 mb-8">{t('stories_subtitle')}</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="story-name" className="block text-sm font-medium text-gray-700">{t('stories_name_label')}</label>
              <input type="text" name="story-name" id="story-name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm" />
            </div>
             <div>
              <label htmlFor="story-email" className="block text-sm font-medium text-gray-700">{t('stories_email_label')}</label>
              <input type="email" name="story-email" id="story-email" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm" />
            </div>
        </div>

        <div>
          <label htmlFor="story-title" className="block text-sm font-medium text-gray-700">{t('stories_title_label')}</label>
          <input type="text" name="story-title" id="story-title" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm" />
        </div>

        <div>
          <label htmlFor="story-content" className="block text-sm font-medium text-gray-700">{t('stories_story_label')}</label>
          <textarea id="story-content" name="story-content" rows={8} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm" placeholder={t('stories_story_placeholder')}></textarea>
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700">{t('stories_photo_label')}</label>
            <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                <div className="space-y-1 text-center">
                    <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                        <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-medium text-red-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-red-500 focus-within:ring-offset-2 hover:text-red-500">
                            <span>Upload a file</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
            </div>
        </div>

        <div>
          <button type="submit" disabled={status === 'submitting'} className="flex w-full justify-center items-center rounded-md border border-transparent bg-red-600 py-3 px-4 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:bg-red-400 disabled:cursor-wait">
            {status === 'submitting' && <LoaderIcon className="w-5 h-5 mr-2 animate-spin" />}
            {t('stories_submit_button')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StorySubmission;
