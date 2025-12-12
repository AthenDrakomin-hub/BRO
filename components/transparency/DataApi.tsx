import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { CodeBracketIcon } from '../ui/Icons';

const DataApi: React.FC = () => {
    const { t } = useLanguage();

    const codeSnippet = `
fetch('https://api.humanitarianaid.dev/v1/projects?year=2023')
  .then(response => response.json())
  .then(data => console.log(data));
    `;

    return (
        <div>
            <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{t('api_title')}</h3>
                <p className="max-w-2xl mx-auto text-gray-600">{t('api_subtitle')}</p>
            </div>

            <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                        <CodeBracketIcon className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
                        <p className="text-gray-700">{t('api_description')}</p>
                    </div>
                     <button className="w-full bg-red-600 text-white font-bold py-3 px-6 rounded-md hover:bg-red-700 transition-colors">
                        {t('api_cta_button')}
                    </button>
                </div>

                <div className="bg-gray-800 rounded-lg p-4 font-mono text-sm text-gray-200 shadow-lg">
                    <pre><code>{codeSnippet.trim()}</code></pre>
                </div>
            </div>
        </div>
    );
};

export default DataApi;
