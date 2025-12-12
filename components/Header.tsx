import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { LogoIcon, GlobeIcon, MenuIcon, XIcon, ChevronDownIcon } from './ui/Icons';
import type { Page } from '../App';
import type { Language } from '../contexts/LanguageContext';

// A simple throttle function to limit how often a function can be called.
// This improves performance on scroll events which can fire very rapidly.
const throttle = (func: (...args: any[]) => void, delay: number) => {
  let inThrottle: boolean;
  return function(this: any, ...args: any[]) {
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, delay);
    }
  };
};


const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Optimization: Use full language names and remove flags for better accessibility and neutrality.
  const languages = [
    { code: 'en', label: 'EN', name: 'English' },
    { code: 'fr', label: 'FR', name: 'Français' },
    { code: 'es', label: 'ES', name: 'Español' },
    { code: 'ar', label: 'AR', name: 'العربية' },
    { code: 'zh', label: 'ZH', name: '简体中文' },
    { code: 'zh-TW', label: 'ZH-TW', name: '繁體中文' },
    { code: 'ru', label: 'RU', name: 'Русский' },
    { code: 'pt', label: 'PT', name: 'Português' },
    { code: 'de', label: 'DE', name: 'Deutsch' },
    { code: 'it', label: 'IT', name: 'Italiano' },
  ];


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setIsOpen(false);
  };
  
  const currentLang = languages.find(l => l.code === language) || languages[0];

  return (
    <div className="relative" ref={wrapperRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-gray-100 p-2 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-200 transition-colors"
      >
        <GlobeIcon className="w-5 h-5" />
        <span className="hidden sm:inline">{currentLang.label}</span>
        <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg border z-20">
            {languages.map(lang => (
                 <button 
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code as any)}
                    className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between space-x-3 transition-colors ${language === lang.code ? 'font-semibold text-red-600 bg-red-50' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                    <span>{lang.name}</span>
                    <span className="text-xs text-gray-400">{lang.label}</span>
                </button>
            ))}
        </div>
      )}
    </div>
  );
};

interface HeaderProps {
  onNavigate: (page: Page) => void;
  currentPage: Page;
  onDonateClick: () => void;
}

// Fix: Define explicit types for navigation items to resolve TypeScript errors.
interface NavLinkItem {
  page: Page;
  label: string;
}

interface NavDropdownItem {
  id: string;
  label: string;
  children: NavLinkItem[];
}

type NavItem = NavLinkItem | NavDropdownItem;

const NavButton: React.FC<{
  onClick: () => void;
  isActive: boolean;
  isMobile?: boolean;
  children: React.ReactNode;
}> = ({ onClick, isActive, isMobile = false, children }) => {
    if (isMobile) {
        return (
             <button
                onClick={onClick}
                className={`w-full text-left px-3 py-3 text-base font-medium rounded-md ${
                isActive
                    ? 'bg-red-50 text-red-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
            >
                {children}
            </button>
        )
    }

    return (
        <button
            onClick={onClick}
            className={`px-3 py-2 transition-colors duration-200 border-b-2 text-base font-medium ${
            isActive
                ? 'text-red-600 border-red-600'
                : 'text-gray-600 border-transparent hover:text-red-600'
            }`}
        >
            {children}
        </button>
    );
};


const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage, onDonateClick }) => {
  const { t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY.current && window.scrollY > 100) { 
          setIsVisible(false);
          setIsMobileMenuOpen(false); // Close menu on scroll
        } else {
          setIsVisible(true);
        }
        lastScrollY.current = window.scrollY;
      }
    };
    
    const throttledControlNavbar = throttle(controlNavbar, 100);

    window.addEventListener('scroll', throttledControlNavbar);
    return () => {
      window.removeEventListener('scroll', throttledControlNavbar);
    };
  }, []);

  const handleMobileNav = (page: Page) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  // Fix: Apply the NavItem type to ensure type safety.
  const navItems: NavItem[] = [
    { page: 'our_work', label: t('nav_our_work') },
    {
      id: 'about_us',
      label: t('nav_about_us'),
      children: [
        { page: 'about', label: t('nav_who_we_are') },
        { page: 'transparency', label: t('nav_transparency') },
        { page: 'project_management', label: t('nav_project_management') },
      ],
    },
    {
      id: 'get_involved',
      label: t('nav_get_involved'),
      children: [
        { page: 'involved', label: t('nav_ways_to_give') },
        { page: 'partnerships', label: t('nav_partnerships') },
      ],
    },
    { page: 'education', label: t('nav_resources') },
  ];

  const isDropdownActive = (children: { page: Page }[]) => {
    return children.some(child => child.page === currentPage);
  };

  // Add touch event handlers for mobile devices
  const handleTouchMove = (e: React.TouchEvent) => {
    // Prevent default behavior to avoid unwanted scrolling
    if (isMobileMenuOpen) {
      e.preventDefault();
    }
  };

  return (
    <>
    <header className={`bg-white shadow-md sticky top-0 z-50 transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <button onClick={() => onNavigate('home')} className="flex items-center space-x-2">
          <LogoIcon className="h-8 w-28" />
          <span className="text-lg sm:text-xl font-bold text-gray-800">{t('header_title')}</span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          {navItems.map(item => {
            if ('children' in item) {
              return (
                <div key={item.id} className="relative group">
                  <button className={`px-3 py-2 flex items-center space-x-1.5 text-base font-medium transition-colors duration-200 border-b-2 ${
                      isDropdownActive(item.children)
                        ? 'text-red-600 border-red-600'
                        : 'text-gray-600 border-transparent hover:text-red-600'
                    }`}>
                    <span>{item.label}</span>
                    <ChevronDownIcon className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
                  </button>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-40">
                    <div className="bg-white rounded-md shadow-lg border w-56 py-1">
                      {item.children.map(child => (
                        <button
                          key={child.page}
                          // Fix: Removed unnecessary 'as Page' cast.
                          onClick={() => onNavigate(child.page)}
                          className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${currentPage === child.page ? 'font-semibold text-red-600 bg-red-50' : 'text-gray-700 hover:bg-gray-100'}`}
                        >
                          {child.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <NavButton
                key={item.page}
                // Fix: Removed unnecessary 'as Page' cast.
                onClick={() => onNavigate(item.page)}
                isActive={currentPage === item.page}
              >
                {item.label}
              </NavButton>
            );
          })}
        </nav>
        
        <div className="hidden md:flex items-center space-x-4">
          <LanguageSwitcher />
          <button 
            onClick={onDonateClick}
            className="bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transform hover:scale-105 active:scale-100 active:brightness-95 transition-all duration-200"
          >
            {t('donate_button')}
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="md:hidden flex items-center space-x-2">
          <LanguageSwitcher />
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 -mr-2">
            {isMobileMenuOpen ? <XIcon className="w-7 h-7 text-gray-700" /> : <MenuIcon className="w-7 h-7 text-gray-700" />}
          </button>
        </div>
      </div>
    </header>
    
      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 z-40" 
          onClick={() => setIsMobileMenuOpen(false)}
          onTouchMove={handleTouchMove} // Add touch move handler
        >
            <div className="absolute inset-0 bg-black/50" aria-hidden="true"></div>
            <div 
              className="relative bg-white w-4/5 max-w-xs h-full p-4" 
              onClick={e => e.stopPropagation()}
              onTouchMove={handleTouchMove} // Add touch move handler
            >
                <nav className="flex flex-col space-y-2 pt-4">
                    {navItems.map(item => {
                        if ('children' in item) {
                            const isOpen = openMobileSubmenu === item.id;
                            const isActive = isDropdownActive(item.children);
                             return (
                                <div key={item.id}>
                                    <button
                                        onClick={() => setOpenMobileSubmenu(isOpen ? null : item.id)}
                                        className={`w-full flex justify-between items-center px-3 py-3 text-base font-medium rounded-md ${
                                            isActive && !isOpen ? 'bg-red-50 text-red-700' : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                    >
                                        <span>{item.label}</span>
                                        <ChevronDownIcon className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                                    </button>
                                    {isOpen && (
                                        <div className="pl-5 mt-1 space-y-1 border-l-2 border-gray-200 ml-3">
                                            {item.children.map(child => (
                                                <NavButton
                                                key={child.page}
                                                // Fix: Removed unnecessary 'as Page' cast.
                                                onClick={() => handleMobileNav(child.page)}
                                                isActive={currentPage === child.page}
                                                isMobile={true}
                                                >
                                                {child.label}
                                                </NavButton>
                                            ))}
                                        </div>
                                    )}
                                </div>
                             )
                        }
                        return (
                             <NavButton
                                key={item.page}
                                // Fix: Removed unnecessary 'as Page' cast.
                                onClick={() => handleMobileNav(item.page)}
                                isActive={currentPage === item.page}
                                isMobile={true}
                            >
                                {item.label}
                            </NavButton>
                        )
                    })}
                    <button 
                        onClick={() => {
                            onDonateClick();
                            setIsMobileMenuOpen(false);
                        }}
                        className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-3 px-4 rounded-md shadow-md mt-4">
                        {t('donate_button')}
                    </button>
                </nav>
            </div>
        </div>
      )}
    </>
  );
};

export default Header;