import React, { useState } from 'react';
import type { Project } from './types';
import { useProjects } from './hooks/useProjects';
import Header from './components/Header';
import Footer from './components/Footer';
import ProjectList from './components/ProjectList';
import ProjectDetail from './components/ProjectDetail';
import DonationModal from './components/DonationModal';
import AboutUsPage from './pages/AboutUsPage';
import GetInvolvedPage from './pages/GetInvolvedPage';
import TransparencyPage from './pages/TransparencyPage';
import ProjectManagementPage from './pages/ProjectManagementPage';
import EducationPage from './pages/EducationPage';
import PartnershipsPage from './pages/PartnershipsPage';
import HomePage from './pages/HomePage';
import { LoaderIcon } from './components/ui/Icons';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

export type Page = 'home' | 'our_work' | 'about' | 'involved' | 'transparency' | 'project_management' | 'education' | 'partnerships';
export type DonationType = 'one-time' | 'monthly';

const AppContent: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [page, setPage] = useState<Page>('home');
  const [donationModalState, setDonationModalState] = useState({ isOpen: false, type: 'monthly' as DonationType });
  const { projects, loading } = useProjects();
  const { t, language } = useLanguage();

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    setPage('our_work');
    window.scrollTo(0, 0);
  };

  const handleBackToList = () => {
    setSelectedProject(null);
    setPage('our_work');
  };

  const navigateTo = (targetPage: Page) => {
    setPage(targetPage);
    setSelectedProject(null); // Reset project selection when changing pages
    window.scrollTo(0, 0);
  };

  const handleOpenDonationModal = (type: DonationType = 'monthly') => {
    setDonationModalState({ isOpen: true, type });
  };

  const handleCloseDonationModal = () => {
    setDonationModalState({ isOpen: false, type: 'monthly' });
  };

  const renderBreadcrumb = () => {
    if (page === 'home') {
        return null;
    }

    const homeCrumb = (
        <span
            key="home"
            className="cursor-pointer hover:text-red-600"
            onClick={() => navigateTo('home')}
        >
            {t('nav_home')}
        </span>
    );

    let path = [homeCrumb];

    if (page === 'our_work') {
        path.push(<span key="sep1" className="mx-2">/</span>);
        path.push(
            <span
                key="work"
                className={`cursor-pointer hover:text-red-600 ${!selectedProject ? 'text-gray-800 font-medium' : ''}`}
                onClick={() => navigateTo('our_work')}
            >
                {t('nav_our_work')}
            </span>
        );
        if (selectedProject) {
            path.push(<span key="sep2" className="mx-2">/</span>);
            const projectTranslation = selectedProject.translations[language] || selectedProject.translations.en;
            path.push(<span key="project" className="text-gray-800 font-medium">{projectTranslation.title}</span>);
        }
    } else { // other pages
        const pageTitle = t(`nav_${page}`);
        path.push(<span key="sep1" className="mx-2">/</span>);
        path.push(<span key="page" className="text-gray-800 font-medium">{pageTitle}</span>);
    }
    
    return (
        <div className="text-sm text-gray-500 mb-6">
            {path}
        </div>
    );
  };

  const renderContent = () => {
    if (page === 'home') {
        return <HomePage 
            projects={projects}
            onSelectProject={handleSelectProject}
            onNavigate={navigateTo}
            onDonateClick={() => handleOpenDonationModal()}
        />;
    }
    if (page === 'about') return <AboutUsPage />;
    if (page === 'involved') return <GetInvolvedPage onOpenDonationModal={handleOpenDonationModal} onNavigate={navigateTo} />;
    if (page === 'transparency') return <TransparencyPage />;
    if (page === 'project_management') return <ProjectManagementPage />;
    if (page === 'education') return <EducationPage />;
    if (page === 'partnerships') return <PartnershipsPage />;

    if (page === 'our_work') {
        if (loading) {
          return (
            <div className="flex justify-center items-center h-64">
              <LoaderIcon className="w-12 h-12 animate-spin text-red-600" />
            </div>
          );
        }
        if (selectedProject) {
          return <ProjectDetail project={selectedProject} onBack={handleBackToList} />;
        }
        return <ProjectList projects={projects} onSelectProject={handleSelectProject} />;
    }
    
    return null;
  };


  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 flex flex-col">
      {donationModalState.isOpen && <DonationModal onClose={handleCloseDonationModal} initialDonationType={donationModalState.type} />}
      <Header 
        onNavigate={navigateTo} 
        currentPage={page} 
        onDonateClick={() => handleOpenDonationModal()}
      />
      <main className={`container mx-auto px-4 flex-grow ${page === 'home' ? 'py-0' : 'py-8'}`}>
        {page !== 'home' && renderBreadcrumb()}
        {renderContent()}
      </main>
      <Footer onNavigate={navigateTo} />
    </div>
  );
};


const App: React.FC = () => (
  <LanguageProvider>
    <AppContent />
  </LanguageProvider>
);


export default App;