import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { LogoIcon, TwitterIcon, FacebookIcon, YouTubeIcon, PatreonIcon } from './ui/Icons';
import type { Page } from '../App';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  const QuickLink: React.FC<{ page: Page; label: string }> = ({ page, label }) => (
    <li>
      <button
        onClick={() => onNavigate(page)}
        className="hover:text-white transition-colors duration-200"
      >
        {label}
      </button>
    </li>
  );

  return (
    <footer className="bg-gray-800 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Brand */}
          <div className="md:col-span-1">
             <div className="flex items-center space-x-2 mb-4">
                <LogoIcon className="h-8 w-28" />
                <span className="text-xl font-bold text-white">{t('header_title')}</span>
            </div>
            <p className="text-sm text-gray-400">{t('footer_disclaimer')}</p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">{t('footer_quick_links')}</h3>
            <ul className="space-y-2">
              <QuickLink page="our_work" label={t('nav_our_work')} />
              <QuickLink page="about" label={t('nav_about_us')} />
              <QuickLink page="involved" label={t('nav_get_involved')} />
              <QuickLink page="education" label={t('nav_resources')} />
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">{t('footer_contact_us')}</h3>
            <div className="space-y-2 text-sm">
                <p>
                    <span className="font-semibold">{t('footer_address_label')}:</span>
                    <br/>{t('footer_address_value')}
                </p>
                <p>
                    <span className="font-semibold">{t('footer_phone_label')}:</span> {t('footer_phone_value')}
                </p>
                <p>
                    <span className="font-semibold">{t('footer_email_label')}:</span> {t('footer_email_value')}
                </p>
            </div>
          </div>

          {/* Column 4: Social */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">{t('footer_follow_us')}</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                <TwitterIcon className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                <FacebookIcon className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="YouTube">
                <YouTubeIcon className="w-6 h-6" />
              </a>
              <a href="https://patreon.com/borderlessrelief" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FF424D] transition-colors" aria-label="Patreon">
                <PatreonIcon className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-900 py-4">
        <div className="container mx-auto text-center text-sm text-gray-400">
          <p>{t('footer_copyright').replace('{year}', '2025')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;