// src/App.tsx

import React, { useState } from 'react';
import { DormantProject } from './types';
import { DormancyDetector } from './services/DormancyDetector';
import { createMockProjects } from './data/mockProjects';
import { Header } from './components/Header';
import { StatsGrid } from './components/StatsGrid';
import { MLExplainer } from './components/MLExplainer';
import { Controls } from './components/Controls';
import { WelcomeBanner } from './components/WelcomeBanner';
import { ProjectCard } from './components/ProjectCard';
import { EmptyState } from './components/EmptyState';
import './App.css';

function App() {
  const [dormantProjects, setDormantProjects] = useState<DormantProject[]>([]);
  const [daysSinceLogin, setDaysSinceLogin] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dormancyDetector = new DormancyDetector();
  const mockProjects = createMockProjects();

  const handleSimulate = async (days: number) => {
    setIsLoading(true);
    setDaysSinceLogin(days);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const lastLoginDate = new Date();
    lastLoginDate.setDate(lastLoginDate.getDate() - days);

    const currentDate = new Date();

    const detected = dormancyDetector.detectDormantProjects(
      mockProjects,
      lastLoginDate,
      currentDate
    );

    setDormantProjects(detected);
    setIsLoading(false);
  };

  const urgentItems = dormantProjects.reduce(
    (sum, p) => sum + p.context.overdueTodos,
    0
  );

  const mlConfidence =
    dormantProjects.length > 0
      ? Math.round(
          (dormantProjects.reduce((sum, p) => sum + p.urgencyScore, 0) /
            dormantProjects.length) *
            100
        )
      : 0;

  return (
    <div className="app-container">
      <Header />

      <StatsGrid
        daysSinceLogin={daysSinceLogin}
        dormantProjectsCount={dormantProjects.length}
        urgentItems={urgentItems}
        mlConfidence={mlConfidence}
      />

      <MLExplainer />

      <Controls onSimulate={handleSimulate} isLoading={isLoading} />

      {isLoading && (
        <div className="loading">
          <div className="spinner"></div>
          <p style={{ marginTop: '16px', color: 'var(--color-text-secondary)' }}>
            Analyzing dormant contexts...
          </p>
        </div>
      )}

      {!isLoading && dormantProjects.length === 0 && daysSinceLogin > 0 && (
        <EmptyState daysSinceLogin={daysSinceLogin} />
      )}

      {!isLoading && dormantProjects.length > 0 && (
        <>
          <WelcomeBanner
            daysSinceLogin={daysSinceLogin}
            projectCount={dormantProjects.length}
          />
          <div className="project-list">
            {dormantProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
