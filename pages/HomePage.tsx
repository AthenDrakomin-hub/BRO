import React from 'react';
import type { Project } from '../types';
import type { Page } from '../App';
import HeroSection from '../components/home/HeroSection';
import CoreValuesSection from '../components/home/CoreValuesSection';
import LatestProjectsSection from '../components/home/LatestProjectsSection';
import EmergencyAppeal from '../components/home/EmergencyAppeal';
import GetInvolvedSummary from '../components/home/GetInvolvedSummary';
import PartnersSummary from '../components/home/PartnersSummary';

interface HomePageProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onNavigate: (page: Page) => void;
  onDonateClick: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ projects, onSelectProject, onNavigate, onDonateClick }) => {
  return (
    <div className="space-y-16 md:space-y-24">
      <div className="-mx-4">
        <HeroSection onDonateClick={onDonateClick} onNavigate={() => onNavigate('involved')} />
      </div>
      <CoreValuesSection onNavigate={() => onNavigate('about')} />
      <div className="-mx-4">
        <LatestProjectsSection projects={projects.slice(0, 3)} onSelectProject={onSelectProject} onNavigate={() => onNavigate('our_work')} />
      </div>
      <div className="-mx-4">
        <EmergencyAppeal onDonateClick={onDonateClick} />
      </div>
      <GetInvolvedSummary onNavigate={() => onNavigate('involved')} />
       <div className="-mx-4">
        <PartnersSummary onNavigate={() => onNavigate('partnerships')} />
      </div>
    </div>
  );
};

export default HomePage;
