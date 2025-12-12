import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const ProjectImpactChart: React.FC = () => {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Sample data - in a real app this would come from props or API
    const projects = [
      { name: 'Emergency Medical Care', beneficiaries: 15000, color: '#DC2626' },
      { name: 'Nutrition Programs', beneficiaries: 12000, color: '#2563EB' },
      { name: 'Water & Sanitation', beneficiaries: 10000, color: '#16A34A' },
      { name: 'Education Initiatives', beneficiaries: 8000, color: '#CA8A04' },
      { name: 'Mental Health Support', beneficiaries: 5000, color: '#9333EA' },
    ];

    // Sort projects by beneficiaries (descending)
    projects.sort((a, b) => b.beneficiaries - a.beneficiaries);

    // Calculate chart dimensions
    const margin = { top: 40, right: 20, bottom: 60, left: 80 };
    const width = canvas.width - margin.left - margin.right;
    const height = canvas.height - margin.top - margin.bottom;

    // Find max value for scaling
    const maxValue = Math.max(...projects.map(p => p.beneficiaries));

    // Draw bars
    const barHeight = 30;
    const barSpacing = 20;
    const startY = margin.top;

    projects.forEach((project, index) => {
      const barWidth = (project.beneficiaries / maxValue) * width;
      const y = startY + index * (barHeight + barSpacing);

      // Draw bar
      ctx.fillStyle = project.color;
      ctx.fillRect(margin.left, y, barWidth, barHeight);

      // Draw project name
      ctx.fillStyle = '#1F2937';
      ctx.font = '14px Arial';
      ctx.fillText(project.name, 10, y + barHeight / 2 + 5);

      // Draw beneficiary count
      ctx.fillStyle = '#4B5563';
      ctx.font = '12px Arial';
      ctx.fillText(project.beneficiaries.toLocaleString(), margin.left + barWidth + 10, y + barHeight / 2 + 5);
    });

    // Draw title
    ctx.fillStyle = '#1F2937';
    ctx.font = 'bold 18px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(t('project_impact_title'), canvas.width / 2, 25);
    ctx.textAlign = 'left';

    // Draw axis labels
    ctx.fillStyle = '#6B7280';
    ctx.font = '12px Arial';
    ctx.fillText(t('beneficiaries'), margin.left, canvas.height - 10);
  }, [t]);

  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-800 mb-2 text-center">{t('project_impact_title')}</h3>
      <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">{t('project_impact_subtitle')}</p>
      
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <canvas 
          ref={canvasRef} 
          className="w-full h-80"
          aria-label={t('project_impact_chart_label')}
          role="img"
        />
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-gray-600 text-sm">
          {t('project_impact_note')}
        </p>
      </div>
    </div>
  );
};

export default ProjectImpactChart;